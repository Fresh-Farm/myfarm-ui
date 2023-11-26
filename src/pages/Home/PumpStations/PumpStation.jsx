import "leaflet/dist/leaflet.css";
import React from "react";
import { MapContainer, TileLayer } from 'react-leaflet';
import Sidebar from '../../../components/Sidebar';
// import zipUrl from "./Shape_Files.zip";
// import ShapeFile from './ShapeFile'

function PumpStation() {
    return (
        <>

            <Sidebar />
            <div className="fl content-wrapper">
                <MapContainer
                    center={[39.26, -76.51]}
                    zoom={13}
                    maxZoom={18}
                    minZoom={3}
                    scrollWheelZoom={true}
                    zoomControl={false}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {/* <GeoJSON key={Math.random()} data={data1} /> */}
                </MapContainer>
            </div>
        </>
    );
}

export default PumpStation;
