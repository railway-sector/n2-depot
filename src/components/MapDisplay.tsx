import "../index.css";
import "@arcgis/map-components/dist/components/arcgis-scene";
import "@arcgis/map-components/components/arcgis-scene";
import "@arcgis/map-components/components/arcgis-zoom";
import "@arcgis/map-components/components/arcgis-legend";
import "@arcgis/map-components/components/arcgis-basemap-gallery";
import "@arcgis/map-components/components/arcgis-layer-list";
import "@arcgis/map-components/components/arcgis-expand";
import "@arcgis/map-components/components/arcgis-compass";
import { prowLayer, depotGroupLayer } from "../layers";
import "@esri/calcite-components/components/calcite-popover";
import "@esri/calcite-components/components/calcite-card";
import "@esri/calcite-components/components/calcite-button";
import "@esri/calcite-components/components/calcite-segmented-control";
import "@esri/calcite-components/components/calcite-segmented-control-item";
import "@esri/calcite-components/components/calcite-button";
import { useState } from "react";

function MapDisplay() {
  const arcgisScene = document.querySelector("arcgis-scene");
  const [_mapView, setMapView] = useState<any>();

  arcgisScene?.viewOnReady(() => {
    arcgisScene?.map?.add(prowLayer);
    arcgisScene?.map?.add(depotGroupLayer);

    arcgisScene.view.environment.atmosphereEnabled = false;
    arcgisScene.view.environment.starsEnabled = false;
    arcgisScene.hideAttribution = true;
    if (arcgisScene?.map?.ground) {
      arcgisScene.map.ground.navigationConstraint = { type: "none" };
      arcgisScene.map.ground.opacity = 0.7;
    }
  });

  return (
    <arcgis-scene
      // item-id="5ba14f5a7db34710897da0ce2d46d55f"
      basemap="dark-gray-vector"
      ground="world-elevation"
      viewingMode="local"
      zoom={13}
      center="120.5793, 15.18"
      onarcgisViewReadyChange={(event: any) => {
        setMapView(event.target.id);
      }}
    >
      <arcgis-zoom slot="top-right"></arcgis-zoom>
      <arcgis-compass slot="top-right"></arcgis-compass>
    </arcgis-scene>
  );
}

export default MapDisplay;
