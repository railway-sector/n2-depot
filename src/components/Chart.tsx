import { useEffect, useRef, useState, use } from "react";
import { chartstack, depotLayer, queryc } from "../layers";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import { thousands_separators, zoomToLayer } from "../Query";
import { ArcgisScene } from "@arcgis/map-components/dist/components/arcgis-scene";
import { MyContext } from "../contexts/MyContext";
import {
  building_category_field,
  buildingCategoryTypes,
  buildingName_field,
  chart_colors,
  status_field,
  statusArray,
} from "../uniqueValues";
import { queryDefinitionExpression } from "../QueryExpression";
import { chartRenderer } from "../ChartRenderer";
import { useQuery } from "@tanstack/react-query";
import type { ChartResponse } from "../interfaceKeys";
import { legendSetter, rootSetter } from "../chartSetter";

// Draw chart
const Chart = () => {
  const arcgisScene = document.querySelector("arcgis-scene") as ArcgisScene;
  const [chartPanelwidth, setChartPanelwidth] = useState<any>();
  const { buildings } = use(MyContext);
  const legendRef = useRef<unknown | any | undefined>({});
  const chartRef = useRef<unknown | any | undefined>({});
  const chartID = "depot-bar";

  const { data } = useQuery<ChartResponse | any>({
    queryKey: [buildings, depotLayer, status_field],
    queryFn: async () => {
      queryc.qValues = [buildings];
      queryc.qFields = [buildingName_field];
      queryDefinitionExpression({
        queryExpression: queryc.queryExpression(),
        featureLayer: [depotLayer],
      });

      chartstack.qChart = queryc.queryExpression();
      chartstack.layers = [depotLayer];
      chartstack.categoryTypes = buildingCategoryTypes;
      chartstack.categoryTypeField = building_category_field;
      chartstack.statusState = [1, 2, 3, 4];
      chartstack.statusField = status_field;
      const chartData = await chartstack.chartDataStackColumns();

      zoomToLayer(depotLayer, arcgisScene?.view);

      return {
        chartData: chartData[0] || [],
        perc_comp: chartData[2] || 0,
        totaln: chartData[1] || 0,
      };
    },
    // staleTime: Infinity,
  });
  const chartData = data?.chartData || [];
  const perc_comp = data?.perc_comp || 0;
  const totaln = data?.totaln || 0;

  // Define parameters
  const marginTop = 0;
  const marginLeft = 0;
  const marginRight = 0;
  const marginBottom = 0;
  const paddingTop = 10;
  const paddingLeft = 5;
  const paddingRight = 5;
  const paddingBottom = 0;
  const chartBorderLineColor = "#00c5ff";
  const chartBorderLineWidth = 0.4;
  const chartIconPositionX = -21;
  const chartPaddingRightIconLabel = 10;

  // ************************************
  //  Responsive Chart parameters
  // ***********************************
  const new_fontSize = chartPanelwidth / 20;
  const new_valueSize = new_fontSize * 1.55;
  const new_chartIconSize = chartPanelwidth * 0.07;
  const new_axisFontSize = chartPanelwidth * 0.036;
  const new_imageSize = chartPanelwidth * 0.035;
  // const new_resetfiler_buttonSize = chartPanelwidth * 0.05;

  // Utility Chart
  useEffect(() => {
    const root = rootSetter({ chartID: chartID });

    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        layout: root.verticalLayout,
        marginTop: marginTop,
        marginLeft: marginLeft,
        marginRight: marginRight,
        marginBottom: marginBottom,
        paddingTop: paddingTop,
        paddingLeft: paddingLeft,
        paddingRight: paddingRight,
        paddingBottom: paddingBottom,
        scale: 1,
        height: am5.percent(100),
      }),
    );
    chartRef.current = chart;

    const legend = legendSetter({
      chart: chart,
      root: root,
      centerX: 50,
      centerY: 50,
      x: 60,
      y: 97,
      marginTop: 20,
      scale: 0.8,
      layout: root.horizontalLayout,
    });
    legendRef.current = legend;

    chartRenderer({
      root: root,
      chart: chart,
      layers: [depotLayer],
      data: chartData,
      qChart: queryc,
      chartCategoryTypes: buildingCategoryTypes,
      chartCategoryFieldScene: building_category_field,
      statusTypename: ["Completed", "To be Constructed", "Under Construction"], //["Completed", "To be Constructed", "Under Construction"],
      statusStatename: ["comp", "incomp", "ongoing"], //["comp", "incomp", "ongoing"],
      statusArray: statusArray,
      statusField: status_field,
      seriesStatusColor: chart_colors,
      strokeColor: chartBorderLineColor,
      strokeWidth: chartBorderLineWidth,
      arcgisScene: arcgisScene,
      new_chartIconSize: new_chartIconSize,
      new_axisFontSize: new_axisFontSize,
      chartIconPositionX: chartIconPositionX,
      chartPaddingRightIconLabel: chartPaddingRightIconLabel,
      legend: legend,
      updateChartPanelwidth: setChartPanelwidth,
    });

    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  });

  const primaryLabelColor = "#9ca3af";
  const valueLabelColor = "#d1d5db";

  return (
    <>
      <div
        slot="panel-end"
        style={{
          borderStyle: "solid",
          borderRightWidth: 5,
          borderLeftWidth: 5,
          borderBottomWidth: 5,
          // borderTopWidth: 5,
          borderColor: "#555555",
        }}
      >
        <div
          style={{
            width: "23vw",
            display: "flex",
            marginTop: "3px",
            marginLeft: "15px",
            marginRight: "15px",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <img
            src="https://EijiGorilla.github.io/Symbols/Station_Structures_icon.svg"
            alt="Station Structure Logo"
            height={`${new_imageSize}%`}
            width={`${new_imageSize}%`}
            style={{ paddingTop: "20px", paddingLeft: "10px" }}
          />
          <dl style={{ alignItems: "center" }}>
            <dt
              style={{
                color: primaryLabelColor,
                fontSize: `${new_fontSize}px`,
                marginRight: "20px",
              }}
            >
              TOTAL PROGRESS
            </dt>
            <dd
              style={{
                color: valueLabelColor,
                fontSize: `${new_valueSize}px`,
                fontWeight: "bold",
                fontFamily: "calibri",
                lineHeight: "1.2",
                margin: "auto",
              }}
            >
              {perc_comp} %
            </dd>
            <div
              style={{
                color: valueLabelColor,
                fontSize: `${new_valueSize * 0.6}px`,
                fontFamily: "calibri",
                lineHeight: "1.2",
              }}
            >
              ({thousands_separators(totaln)})
            </div>
          </dl>
        </div>

        <div
          id={chartID}
          style={{
            height: "70vh",
            backgroundColor: "rgb(0,0,0,0)",
            color: "white",
            marginRight: "10px",
            marginTop: "7%",
          }}
        ></div>
        <div
          id="filterButton"
          style={{
            width: "50%",
            marginLeft: "30%",
            paddingTop: "10%",
          }}
        ></div>
      </div>
    </>
  );
};

export default Chart;
