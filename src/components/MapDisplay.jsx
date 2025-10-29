import { useEffect, useState } from "react";
import "../index.css";
import "../App.css";
import "@arcgis/map-components/dist/components/arcgis-scene";
import "@arcgis/map-components/components/arcgis-scene";
import "@arcgis/map-components/components/arcgis-zoom";
import "@arcgis/map-components/components/arcgis-legend";
import "@arcgis/map-components/components/arcgis-compass";
import "@arcgis/map-components/components/arcgis-basemap-gallery";
import "@arcgis/map-components/components/arcgis-layer-list";
import { depotGroupLayer, rowLayer } from "../layers";

function MapDisplay() {
  const [sceneView, setSceneView] = useState();
  const arcgisScene = document.querySelector("arcgis-scene");
  // zoomToLayer(prowLayer, arcgisScene);

  useEffect(() => {
    if (sceneView) {
      arcgisScene.map.add(rowLayer);
      arcgisScene.map.add(depotGroupLayer);
      arcgisScene.map.ground.navigationConstraint = "none";
      arcgisScene.view.environment.atmosphereEnabled = false;
      arcgisScene.view.environment.starsEnabled = false;
      arcgisScene.view.ui.components = [];
    }
  });

  return (
    <arcgis-scene
      // item-id="5ba14f5a7db34710897da0ce2d46d55f"
      basemap="dark-gray-vector"
      ground="world-elevation"
      viewingMode="local"
      zoom="13"
      center="120.5793, 15.18"
      onarcgisViewReadyChange={(event) => {
        setSceneView(event.target);
      }}
    >
      <arcgis-zoom slot="top-right"></arcgis-zoom>
      <arcgis-compass slot="top-right"></arcgis-compass>
    </arcgis-scene>
  );
}

export default MapDisplay;
