import { useEffect, useRef, useState, use } from "react";
import { depotLayer, queryc } from "../layers";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
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
import { chartDataStackColumns } from "../ChartDataGenerator";
import { chartRenderer } from "../ChartRenderer";

// Dispose function
function maybeDisposeRoot(divId: any) {
  am5.array.each(am5.registry.rootElements, function (root) {
    if (root.dom.id === divId) {
      root.dispose();
    }
  });
}

// Draw chart
const Chart = () => {
  const arcgisScene = document.querySelector("arcgis-scene") as ArcgisScene;
  const { buildings, updateChartPanelwidth, chartPanelwidth } = use(MyContext);
  const legendRef = useRef<unknown | any | undefined>({});
  const chartRef = useRef<unknown | any | undefined>({});
  const [chartData, setChartData] = useState([]);
  const [progress, setProgress] = useState<number>(0);
  const [totalNumber, setTotalNumber] = useState<number>(0);

  const chartID = "depot-bar";
  useEffect(() => {
    queryc.qValues = [buildings];
    queryc.qFields = [buildingName_field];
    queryDefinitionExpression({
      queryExpression: queryc.queryExpression(),
      featureLayer: [depotLayer],
    });
    chartDataStackColumns({
      qChart: queryc.queryExpression(),
      chartCategoryTypes: buildingCategoryTypes,
      chartCategoryField: building_category_field,
      chartCategoryValueType: "number",
      layers: [depotLayer],
      statusState: [1, 2, 3, 4],
      statusField: status_field,
    }).then((result: any) => {
      setChartData(result[0]);
      setProgress(result[2]);
      setTotalNumber(result[1]);
    });
    zoomToLayer(depotLayer, arcgisScene?.view);
  }, [buildings]);

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
    maybeDisposeRoot(chartID);

    const root = am5.Root.new(chartID);
    root.container.children.clear();
    root._logo?.dispose();

    // Set themesf
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
      am5themes_Animated.new(root),
      am5themes_Responsive.new(root),
    ]);

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

    const legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        centerY: am5.percent(50),
        x: am5.percent(60),
        y: am5.percent(97),
        marginTop: 20,
        scale: 0.8,
        layout: root.horizontalLayout,
      }),
    );
    legendRef.current = legend;

    chartRenderer({
      root: root,
      chart: chart,
      layer: depotLayer,
      data: chartData,
      q1Value: buildings,
      q1Field: buildingName_field,
      chartCategoryTypes: buildingCategoryTypes,
      chartCategoryField: building_category_field,
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
      updateChartPanelwidth: updateChartPanelwidth,
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
              {progress} %
            </dd>
            <div
              style={{
                color: valueLabelColor,
                fontSize: `${new_valueSize * 0.6}px`,
                fontFamily: "calibri",
                lineHeight: "1.2",
              }}
            >
              ({thousands_separators(totalNumber)})
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
