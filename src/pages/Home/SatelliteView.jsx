import "leaflet/dist/leaflet.css";
import React from "react";
import { MapContainer, Polygon, Popup, TileLayer, ZoomControl } from "react-leaflet";
import ProjectDetailsPopup from "./../../components/ProjectDetailsPopup";

const SatelliteView = () => {
  var polyUtil = require("polyline-encoded");
  const shadedAreaOptions = { color: "orange" };

  return (
    <MapContainer
      center={[39.26, -76.51]}
      zoom={13}
      maxZoom={18}
      minZoom={3}
      scrollWheelZoom={true}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="Esri &mdash">Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS Community</a> contributors'
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png"
      />

      {/* {projects.map((project, index) => {
        return (
          <Polygon
            pathOptions={shadedAreaOptions}
            positions={polyUtil.decode(project.geographicalArea)}
            key={index}
          >
            <Popup position="right bottom">
              <ProjectDetailsPopup project={project} />
            </Popup>
          </Polygon>
        );
      })} */}
      <ZoomControl position="bottomright"/>
    </MapContainer>
  );
};

export default SatelliteView;
