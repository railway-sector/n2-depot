import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import SceneLayer from "@arcgis/core/layers/SceneLayer";
import LabelClass from "@arcgis/core/layers/support/LabelClass";
import UniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";
import MeshSymbol3D from "@arcgis/core/symbols/MeshSymbol3D.js";
import FillSymbol3DLayer from "@arcgis/core/symbols/FillSymbol3DLayer.js";
import LabelSymbol3D from "@arcgis/core/symbols/LabelSymbol3D";
import TextSymbol3DLayer from "@arcgis/core/symbols/TextSymbol3DLayer";
import SolidEdges3D from "@arcgis/core/symbols/edges/SolidEdges3D";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol.js";
import { labelSymbol3DLine } from "./Label";
import GroupLayer from "@arcgis/core/layers/GroupLayer";
import QueryExpressionLayers from "query-layers-expression";

export const queryc = new QueryExpressionLayers(
  undefined,
  undefined,
  undefined,
  undefined,
  "string",
  0,
  undefined,
  undefined,
  undefined,
);

export const queryc2 = new QueryExpressionLayers(
  undefined,
  undefined,
  undefined,
  undefined,
  "string",
  0,
  undefined,
  undefined,
  undefined,
);

/* Standalone table for Dates */
export const dateTable = new FeatureLayer({
  portalItem: {
    id: "b2a118b088a44fa0a7a84acbe0844cb2",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
});

// * PROW *//
const prowRenderer = new SimpleRenderer({
  symbol: new SimpleLineSymbol({
    color: "#ff0000",
    width: "2px",
  }),
});

export const prowLayer = new FeatureLayer({
  url: "https://gis.railway-sector.com/server/rest/services/N2_Alignment/FeatureServer/1",
  title: "ROW",
  definitionExpression: "Extension = 'N2'",
  popupEnabled: false,
  renderer: prowRenderer,
});
prowLayer.listMode = "hide";

// * Station Layer * //
const stationLayerTextSymbol = labelSymbol3DLine({
  materialColor: "#d4ff33",
  fontSize: 15,
  fontFamily: "Ubuntu Mono",
  fontWeight: "normal",
  haloColor: "black",
  haloSize: 0.5,
  vOffsetScreenLength: 100,
  vOffsetMaxWorldLength: 700,
  vOffsetMinWorldLength: 80,
});

var labelClass = new LabelClass({
  symbol: stationLayerTextSymbol,
  labelPlacement: "above-center",
  labelExpressionInfo: {
    expression: 'DefaultValue($feature.Station, "no data")',
    //value: "{TEXTSTRING}"
  },
});

export const stationLayer = new FeatureLayer({
  portalItem: {
    id: "876de8483da9485aac5df737cbef2143",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 2,
  title: "Station",
  labelingInfo: [labelClass],
  elevationInfo: {
    mode: "relative-to-ground",
  },
});
stationLayer.listMode = "hide";

// * Depot * //
const colorDepot = [
  [225, 225, 225, 0.1], // To be Constructed (white)
  [130, 130, 130, 0.5], // Under Construction
  [255, 0, 0, 0.8], // Delayed
  [0, 112, 255, 0.8], // Completed
];

const depotUniqueValueInfos = [
  {
    value: 1,
    label: "To be Constructed",
    symbol: new MeshSymbol3D({
      symbolLayers: [
        new FillSymbol3DLayer({
          material: {
            color: colorDepot[0],
            colorMixMode: "replace",
          },
          edges: new SolidEdges3D({
            color: [225, 225, 225, 0.3],
          }),
        }),
      ],
    }),
  },
  {
    value: 2,
    label: "Under Construction",
    symbol: new MeshSymbol3D({
      symbolLayers: [
        new FillSymbol3DLayer({
          material: {
            color: colorDepot[1],
            colorMixMode: "replace",
          },
          edges: new SolidEdges3D({
            color: [225, 225, 225, 0.3],
          }),
        }),
      ],
    }),
  },
  {
    value: 4,
    label: "Completed",
    symbol: new MeshSymbol3D({
      symbolLayers: [
        new FillSymbol3DLayer({
          material: {
            color: colorDepot[3],
            colorMixMode: "replace",
          },
          edges: new SolidEdges3D({
            color: [225, 225, 225, 0.3],
          }),
        }),
      ],
    }),
  },
];

const renderer = new UniqueValueRenderer({
  field: "Status",
  uniqueValueInfos: depotUniqueValueInfos,
});

export const depotLayer = new SceneLayer({
  portalItem: {
    id: "87b4803b60184e4ab9ee1025b05d3c93",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  elevationInfo: {
    mode: "absolute-height", //absolute-height, relative-to-ground
  },
  title: "Depot Buildings",
  // labelsVisible: false,
  renderer: renderer,
  popupTemplate: {
    title: "<h5>{Name}</h5>",
    lastEditInfoEnabled: false,
    returnGeometry: true,
    content: [
      {
        type: "fields",
        fieldInfos: [
          {
            fieldName: "Category",
          },
          {
            fieldName: "BldgLevel_Desc",
            label: "Building Level",
          },
        ],
      },
    ],
  },
});

/* building spot layer */
const buildingSpotSymbol = new SimpleRenderer({
  symbol: new SimpleMarkerSymbol({
    size: 2,
    color: "white",
    outline: {
      // autocasts as new SimpleLineSymbol()
      width: 0.5,
      color: [0, 0, 0, 0],
    },
  }),
});

const buildingSpotLabelClass = new LabelClass({
  symbol: new LabelSymbol3D({
    symbolLayers: [
      new TextSymbol3DLayer({
        material: {
          color: "orange",
        },
        size: 12,
        halo: {
          size: 1,
          color: "black",
        },
        font: {
          family: "Ubuntu Mono",
        },
      }),
    ],
    verticalOffset: {
      screenLength: 50,
      maxWorldLength: 300,
      minWorldLength: 40,
    },
    callout: {
      type: "line", // autocasts as new LineCallout3D()
      color: "white",
      size: 0.5,
      border: {
        color: "grey",
      },
    },
  }),
  labelPlacement: "above-center",
  labelExpressionInfo: {
    expression: "$feature.Name",
    //value: "{TEXTSTRING}"
  },
});

export const buildingSpotLayer = new FeatureLayer({
  portalItem: {
    id: "3f064f9e069b4485a6b59068e5687c30",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  elevationInfo: {
    mode: "relative-to-ground",
  },
  title: "Building Spot",
  renderer: buildingSpotSymbol,
  labelingInfo: [buildingSpotLabelClass],
  popupEnabled: false,
});

export const depotGroupLayer = new GroupLayer({
  title: "Depot Buildings",
  visible: true,
  visibilityMode: "independent",
  layers: [depotLayer, buildingSpotLayer],
});
