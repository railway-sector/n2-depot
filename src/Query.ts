import { dateTable, depotLayer } from "./layers";
import StatisticDefinition from "@arcgis/core/rest/support/StatisticDefinition";
import { defaultName } from "./dropdownData";

// Updat date
export async function dateUpdate() {
  const monthList = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const query = dateTable.createQuery();
  query.where = "project = 'N2'" + " AND " + "category = 'Depot Buildings'";

  return dateTable.queryFeatures(query).then((response: any) => {
    const stats = response.features;
    const dates = stats.map((result: any) => {
      const date = new Date(result.attributes.date);
      const year = date.getFullYear();
      const month = monthList[date.getMonth()];
      const day = date.getDate();
      const final = year < 1990 ? "" : `${month} ${day}, ${year}`;
      return final;
    });
    return dates;
  });
}

// Generate chart data
const depotType = [
  "St.Foundation",
  "St.Column",
  "St.Framing",
  "Roofs",
  "Floors",
  "Walls",
  "Columns",
  "Others",
];

export async function generateChartData(depotname: any) {
  var total_stfoundation_incomp = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 1 and Status = 1) THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_stfoundation_incomp",
    statisticType: "sum",
  });

  var total_stfoundation_comp = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 1 and Status = 4) THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_stfoundation_comp",
    statisticType: "sum",
  });

  var total_stcolumn_incomp = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 2 and Status = 1) THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_stcolumn_incomp",
    statisticType: "sum",
  });

  var total_stcolumn_comp = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 2 and Status = 4) THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_stcolumn_comp",
    statisticType: "sum",
  });

  var total_stframing_incomp = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 3 and Status = 1) THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_stframing_incomp",
    statisticType: "sum",
  });

  var total_stframing_comp = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 3 and Status = 4) THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_stframing_comp",
    statisticType: "sum",
  });

  var total_roofs_incomp = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 4 and Status = 1) THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_roofs_incomp",
    statisticType: "sum",
  });

  var total_roofs_comp = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 4 and Status = 4) THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_roofs_comp",
    statisticType: "sum",
  });

  var total_floors_incomp = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 5 and Status = 1) THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_floors_incomp",
    statisticType: "sum",
  });

  var total_floors_comp = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 5 and Status = 4) THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_floors_comp",
    statisticType: "sum",
  });

  var total_walls_incomp = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 6 and Status = 1) THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_walls_incomp",
    statisticType: "sum",
  });

  var total_walls_comp = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 6 and Status = 4) THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_walls_comp",
    statisticType: "sum",
  });

  var total_columns_incomp = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 7 and Status = 1) THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_columns_incomp",
    statisticType: "sum",
  });

  var total_columns_comp = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 7 and Status = 4) THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_columns_comp",
    statisticType: "sum",
  });

  var total_others_incomp = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 8 and Status = 1) THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_others_incomp",
    statisticType: "sum",
  });

  var total_others_comp = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 8 and Status = 4) THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_others_comp",
    statisticType: "sum",
  });

  // Query
  var query = depotLayer.createQuery();
  query.outStatistics = [
    total_stfoundation_incomp,
    total_stfoundation_comp,
    total_stcolumn_incomp,
    total_stcolumn_comp,
    total_stframing_incomp,
    total_stframing_comp,
    total_roofs_incomp,
    total_roofs_comp,
    total_floors_incomp,
    total_floors_comp,
    total_walls_incomp,
    total_walls_comp,
    total_columns_incomp,
    total_columns_comp,
    total_others_incomp,
    total_others_comp,
  ];

  // Query
  const defaultExpression = "Name = '" + defaultName + "'";
  const expression = "Name = '" + depotname + "'";
  if (!depotname) {
    depotLayer.definitionExpression = defaultExpression;
    query.where = defaultExpression;
  } else {
    query.where = expression;
    depotLayer.definitionExpression = expression;
  }

  return depotLayer.queryFeatures(query).then((response: any) => {
    var stats = response.features[0].attributes;
    const stfoundation_incomp = stats.total_stfoundation_incomp;
    const stfoundation_comp = stats.total_stfoundation_comp;
    const stcolumn_incomp = stats.total_stcolumn_incomp;
    const stcolumn_comp = stats.total_stcolumn_comp;
    const stframing_incomp = stats.total_stframing_incomp;
    const stframing_comp = stats.total_stframing_comp;
    const roofs_incomp = stats.total_roofs_incomp;
    const roofs_comp = stats.total_roofs_comp;
    const floors_incomp = stats.total_floors_incomp;
    const floors_comp = stats.total_floors_comp;
    const walls_incomp = stats.total_walls_incomp;
    const walls_comp = stats.total_walls_comp;
    const columns_incomp = stats.total_columns_incomp;
    const columns_comp = stats.total_columns_comp;
    const others_incomp = stats.total_others_incomp;
    const others_comp = stats.total_others_comp;

    const data = [
      {
        category: depotType[0],
        comp: stfoundation_comp,
        incomp: stfoundation_incomp,
      },
      {
        category: depotType[1],
        comp: stcolumn_comp,
        incomp: stcolumn_incomp,
      },
      {
        category: depotType[2],
        comp: stframing_comp,
        incomp: stframing_incomp,
      },
      {
        category: depotType[3],
        comp: roofs_comp,
        incomp: roofs_incomp,
      },
      {
        category: depotType[4],
        comp: floors_comp,
        incomp: floors_incomp,
      },
      {
        category: depotType[5],
        comp: walls_comp,
        incomp: walls_incomp,
      },
      {
        category: depotType[6],
        comp: columns_comp,
        incomp: columns_incomp,
      },
      {
        category: depotType[7],
        comp: others_comp,
        incomp: others_incomp,
      },
    ];
    return data;
  });
}

export async function generateTotalProgress(depotname: any) {
  var total_depot_number = new StatisticDefinition({
    onStatisticField: "Name",
    outStatisticFieldName: "total_depot_number",
    statisticType: "count",
  });

  var total_depot_comp = new StatisticDefinition({
    onStatisticField: "CASE WHEN Status = 4 THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_depot_comp",
    statisticType: "sum",
  });

  var query = depotLayer.createQuery();
  const defaultExpression = "Name = '" + defaultName + "'";
  const expression = "Name = '" + depotname + "'";

  if (!depotname) {
    query.where = defaultExpression;
  } else {
    query.where = expression;
  }
  query.outStatistics = [total_depot_number, total_depot_comp];

  return depotLayer.queryFeatures(query).then((response: any) => {
    var stats = response.features[0].attributes;
    const comp = stats.total_depot_comp;
    const total = stats.total_depot_number;
    const progress = ((comp / total) * 100).toFixed(1);

    return [total, comp, progress];
  });
}

// Thousand separators function
export function thousands_separators(num: any) {
  if (num) {
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
  }
}

export function zoomToLayer(layer: any, view: any) {
  return layer.queryExtent().then((response: any) => {
    view
      ?.goTo(response.extent, {
        //response.extent
        speedFactor: 2,
      })
      .catch((error: any) => {
        if (error.name !== "AbortError") {
          console.error(error);
        }
      });
  });
}
