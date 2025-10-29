import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import SceneLayer from "@arcgis/core/layers/SceneLayer";
import LabelClass from "@arcgis/core/layers/support/LabelClass";
import UniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import {
  SimpleMarkerSymbol,
  MeshSymbol3D,
  FillSymbol3DLayer,
  LabelSymbol3D,
  TextSymbol3DLayer,
  SimpleLineSymbol,
} from "@arcgis/core/symbols";
import SolidEdges3D from "@arcgis/core/symbols/edges/SolidEdges3D";
import { labelSymbol3DLine } from "./Label";
import GroupLayer from "@arcgis/core/layers/GroupLayer";

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
var prowRenderer = new SimpleRenderer({
  symbol: new SimpleLineSymbol({
    color: "#ff0000",
    width: "2px",
  }),
});

export const rowLayer = new FeatureLayer({
  url: "https://gis.railway-sector.com/server/rest/services/N2_Alignment/FeatureServer/1",
  title: "ROW",
  definitionExpression: "Extension = 'N2'",
  popupEnabled: false,
  renderer: prowRenderer,
});
rowLayer.listMode = "hide";

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

const statusConstruction = [
  {
    category: "To be Constructed",
    value: 1,
  },
  {
    category: "Under Construction",
    value: 2,
  },
  {
    category: "Delayed",
    value: 3,
  },
  {
    category: "Completed",
    value: 4,
  },
];

function renderDepotLayer() {
  const renderer = new UniqueValueRenderer({
    field: "Status",
  });

  for (var i = 0; i < colorDepot.length; i++) {
    if (i === 2) {
      continue;
    }
    renderer.addUniqueValueInfo({
      value: i + 1,
      label: statusConstruction.find((emp: any) => emp.value === i + 1)
        ?.category,
      symbol: new MeshSymbol3D({
        symbolLayers: [
          new FillSymbol3DLayer({
            material: {
              color: colorDepot[i],
              colorMixMode: "replace",
            },
            edges: new SolidEdges3D({
              color: [225, 225, 225, 0.3],
            }),
          }),
        ],
      }),
    });
  }
  depotLayer.renderer = renderer;
}

export const depotLayer = new SceneLayer({
  portalItem: {
    id: "bcc1444b895443e6bc1ad613f1b4c8fa",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  elevationInfo: {
    mode: "absolute-height", //absolute-height, relative-to-ground
  },
  title: "Depot Buildings",
  labelsVisible: false,
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

renderDepotLayer();

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

const buildingSpotLayer = new FeatureLayer({
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
  layers: [buildingSpotLayer, depotLayer],
});
