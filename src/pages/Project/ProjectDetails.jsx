import React, { useEffect, useState, useRef } from "react";
import "leaflet/dist/leaflet.css";
import {
  Circle,
  LayerGroup,
  MapContainer,
  Polygon,
  SVGOverlay,
  TileLayer,
  ZoomControl
} from "react-leaflet";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { PostData } from "../../../src/services/PostService";
import { ReactComponent as BackRiverProcessFlow } from "../../assets/Flow_Back_River.svg";
import { ReactComponent as PatapscoProcessFlow } from "../../assets/Flow_Patapsco.svg";
import Collapse from '../../assets/coll.svg';
import Expand from '../../assets/expand.svg';
import Legends from '../../assets/legends.svg';
import SeparateBar from "../../assets/sperate-bar.svg";
import Loader from '../../components/Loader';
import ViewAssetDeatils from "../../components/ViewAssetDeatils";
import { Admin, Assets, Contribute, GetAssetDetailsEndPoint, MapAssetCodeData } from '../../constants/constants';
import { constants } from '../../constants/index';
import { setSelectedAssetDetails, setSelectedAssetLocation } from '../../redux/slices/projectDetailsSlice';
import { setIsViewDetailsBarCollapsed } from '../../redux/slices/sideBarSlice';
import { GetServices, PostServices } from '../../services/index';

const ProjectDetails = () => {
  const { isSideNavigationBarCollapsed, isViewDetailsBarCollapsed } = useSelector((state) => state.sideBarSlice);
  const [isSiteMapFullScreen, setIsSiteMapFullScreen] = useState(false);
  const [isProcessFlowFullScreen, setIsProcessFlowFullScreen] = useState(false);
  const [sitePlanHeight, setSitePlanHeight] = useState(49.5);
  const [processFlowHeight, setProcessFlowHeight] = useState(49.5);
  const [sliderHeight, setSliderHeight] = useState(49);
  const [isLegendClicked, setIsLegendClicked] = useState(false);
  const { selectedProject, specificAssetDetails, selectedAssetLocation, selectedProjectLocation, isBackRiverWasteWaterTreatmentSelected } = useSelector(state => state.projectDetailsSlice);
  const dispatch = useDispatch();
  const [iconWidth, setIconWidth] = useState('');
  const [isDragStarted, setIsDragStarted] = useState(false);
  const navigate = useNavigate();
  const { userRole } = useSelector((state) => state.userDetails);
  const [isEditDisabled, setIsEditDisabled] = useState(true)
  var polyUtil = require("polyline-encoded");

  const GetAssetDetails = async (selectedAsset) => {
    let payload = { "guid": selectedAsset.id, "projectId": selectedProject.id }
    await PostData(GetAssetDetailsEndPoint, payload).then((response) => {
      if (response && response.length) {
        // keeping this untill we test asset zoomIn and ZoomOut is working fine
        // if(response[0].latitude && response[0].longitude){
        //   dispatch(setSelectedAssetLocation([response[0].latitude, response[0].longitude]))
        // }
        dispatch(setSelectedAssetDetails(response))
        dispatch(setIsViewDetailsBarCollapsed(false))
      } else {
        dispatch(setSelectedAssetDetails([]))
        dispatch(setIsViewDetailsBarCollapsed(false))
      }
    })
  };

  const handleFullScreen = (plan) => {
    if (plan === "site") {
      setIsSiteMapFullScreen((prev) => !prev);
      setIsProcessFlowFullScreen(false);
      setIsLegendClicked(false)
    } else if (plan === "process") {
      setIsSiteMapFullScreen(false);
      setIsProcessFlowFullScreen((prev) => !prev);
    }
  };

  const [assetDataLocations, setAssetDataLocations] = useState([]);
  const [assetPolygonLocations, setassetPolygonLocations] = useState([]);
  const GetAssetLocations = async () => {
    if (selectedProject && selectedProject.id != '')
      var assetData = await GetServices.GetData('Asset/GetAssetInstance?projectId=' + `${selectedProject.id}`);
    setAssetDataLocations(assetData.filter(x => x.shapeType == 'Circle'));//To be moved to constants file
    setassetPolygonLocations(assetData.filter(x => x.shapeType == 'Polygon'));//To be moved to constants file
  }

  useEffect(() => {
    GetAssetLocations();
  }, [selectedProject])

  const SitePlanMapView = () => {
    return (
      <MapContainer
        style={{ height: "100%", width: "100%", position: "absolute" }}
        center={(selectedAssetLocation && selectedAssetLocation.length) ? selectedAssetLocation : (selectedProjectLocation && selectedProjectLocation.length) ? selectedProjectLocation : [50, 50]}
        zoom={(selectedAssetLocation && selectedAssetLocation.length) ? 22 : 16}
        maxZoom={18}
        scrollWheelZoom={true}
        zoomControl={false}
      >
        <div className='zoom' style={{ backgroundColor: 'blue' }}>
          <TileLayer
            attribution='&copy; <a href="Esri &mdash">Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS Community</a> contributors'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png"
          />
        </div>
        {/* {isBackRiverWasteWaterTreatmentSelected && <LayerGroup>//To Check for this condition */}
        <LayerGroup>

          {/* {MapCircleAssetData.map((assetMap, index) => ( To be removed after testing
            <Circle
              key={index}
              center={assetMap.center}
              pathOptions={assetMap.pathOptions}
              radius={assetMap.radius}
              eventHandlers={{
                click: () => GetAssetDetails(assetMap),
              }}
            />
          ))} */}
          {assetDataLocations.map((assetMap, index) => (
            <Circle
              key={index}              
              center={assetMap.geographicalArea != '' ? polyUtil.decode(assetMap.geographicalArea)[0] : [0, 0]}
              pathOptions={{ color: assetMap.color, fillColor: assetMap.color }}
              radius={assetMap.radius}
              eventHandlers={{
                click: () => GetAssetDetails(assetMap),
              }}
            />
          ))}

          {MapAssetCodeData.map((assetData, index) => (
            // <Marker position={assetData.bounds[0]} icon={L.divIcon({html: `<b><h3>${assetData.code}</h3></b>`})} />
            <SVGOverlay attributes={{ stroke: "black" }} bounds={assetData.bounds} key={index} >
              <rect x="0" y="0" width="100%" height="100%" fill="black" />
              <text x="50%" y="50%" stroke="white">{assetData.code}</text>
            </SVGOverlay>
          ))}

          {/* To be removed after testing */}
          {/* {MapPolylineAssetData.map((polylineData, index) => (
            <Polygon
              key={index}
              positions={polylineData.positions}
              pathOptions={polylineData.pathOptions}
              eventHandlers={{
                click: () => polylineData.id && GetAssetDetails(polylineData),
              }}
            />
          ))} */}
          {assetPolygonLocations.map((polylineData, index) => (
            <Polygon
              key={index}
              positions={polyUtil.decode(polylineData.geographicalArea)}
              pathOptions={{ color: polylineData.color, fillColor: polylineData.color }}
              eventHandlers={{
                click: () => polylineData.id && GetAssetDetails(polylineData),
              }}
            />
          ))}
        </LayerGroup>
        <ZoomControl position="bottomright" />
      </MapContainer>

    );
  };

  const handleDrag = (e) => {
    if ((e.clientY / window.innerHeight) * 100 >= sliderHeight) {
      //Down ward
      setSitePlanHeight((prev) => prev + 0.25);
      setProcessFlowHeight((prev) => prev - 0.25);
      setSliderHeight((prev) => {
        if (prev >= 90) {
          setIsSiteMapFullScreen(true);
          setIsProcessFlowFullScreen(false);
        }
        return prev + 0.25;
      });
    } else if ((e.clientY / window.innerHeight) * 100 < sliderHeight) {
      //Up Ward
      setSitePlanHeight((prev) => prev - 0.25);
      setProcessFlowHeight((prev) => prev + 0.25);
      setSliderHeight((prev) => {
        if (prev <= 10) {
          setIsSiteMapFullScreen(false);
          setIsProcessFlowFullScreen(true);
        }
        return prev - 0.25;
      });
    }
  };

  const getUniqueAssets = (assets) => {
    let uniqueAssetscodes = []
    let uniqueAssets = []
    Object.keys(assets).forEach((eachAsset, index) => {
      if (!uniqueAssetscodes.includes(assets[eachAsset].code)) {
        uniqueAssetscodes.push(assets[eachAsset].code)
        uniqueAssets.push(assets[eachAsset])
      }
    })
    return uniqueAssets;
  }

  const loadProcessViewMap = async () => {
    let payload = {
      projectId: selectedProject.id
    };
    await PostServices.PostData(constants.GetAllAssetsEndPoint, payload).then((response) => {
      if (response && response.length) {
        response.forEach((asset) => {
          return document.getElementById((asset.id).toUpperCase()).addEventListener("click", () => GetAssetDetails(asset));
        });
      }
    });
  }

  useEffect(() => {
    if (Object.keys(selectedProject).length === 0) {
      navigate('/home')
      return
    }
    if ((userRole === Admin) || (userRole === Contribute)) {
      setIsEditDisabled(false)
    }
  }, [])

  useEffect(() => {
    if (Object.keys(selectedProject).length) {
      //To Check for this condition
      // (isProcessFlowFullScreen || !isSiteMapFullScreen) && isBackRiverWasteWaterTreatmentSelected && loadProcessViewMap()
      (isProcessFlowFullScreen || !isSiteMapFullScreen) && loadProcessViewMap()

      SitePlanMapView();
    }
  }, [selectedProject, isProcessFlowFullScreen, isSiteMapFullScreen, isSideNavigationBarCollapsed]);

  useEffect(() => {
    if (Object.keys(selectedProject).length) {
      if ((selectedAssetLocation && selectedAssetLocation.length) || (selectedProjectLocation && selectedProjectLocation.length)) {
        SitePlanMapView();
      }
    }
  }, [selectedAssetLocation, selectedProjectLocation])

  useEffect(() => {
    if (!isViewDetailsBarCollapsed && isSideNavigationBarCollapsed) {
      setIconWidth('decreseWidthViewDetails')
    } else if (!isViewDetailsBarCollapsed && !isSideNavigationBarCollapsed) {
      setIconWidth('decreseWidthSidebar')
    } else {
      setIconWidth('')
    }
  }, [isSideNavigationBarCollapsed, isViewDetailsBarCollapsed, iconWidth])

  useEffect(() => {
    if (specificAssetDetails && specificAssetDetails.length) {
      if (specificAssetDetails[0].latitude && specificAssetDetails[0].longitude) {
        dispatch(setSelectedAssetLocation([specificAssetDetails[0].latitude, specificAssetDetails[0].longitude]))
      }
    }
  }, [specificAssetDetails])

  // Pan Zoom SVG

  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - startPos.x;
    const dy = e.clientY - startPos.y;
    setTranslate({ x: translate.x + dx, y: translate.y + dy });
    setStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e) => {
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setScale(scale * delta);
  };

  return (
    <div>
      <div className="fl content-wrapper">
        {!isViewDetailsBarCollapsed &&
          specificAssetDetails &&
          specificAssetDetails.length && (
            <ViewAssetDeatils assetDetails={specificAssetDetails} isEditDisabled={isEditDisabled} />
          )}
        <div className={`fl w100 flowSiteplan-container ${iconWidth}`}>
          {!isProcessFlowFullScreen && (
            <div
            className={`fl w100 flowSiteplan-top ${isSiteMapFullScreen ? 'flowSiteplanFullScreen': '' }`}
              style={{
                height: isSiteMapFullScreen ? "100vh" : `${sitePlanHeight}vh`,
              }}
            >
              <div
                className="fl w100 flowSiteplan-header"
                style={{ zIndex: "401" }}
              >
                <h2 className="fl flowSiteplan-header--title">
                  {`${selectedProject.name} Siteplan`}
                </h2>
                <div className="fr d-flex maps-ctrl">
                  {!isSiteMapFullScreen && isBackRiverWasteWaterTreatmentSelected && (
                    <button
                      className="fl btn "
                      onClick={() => setIsLegendClicked((prev) => !prev)}
                    >
                      <img src={Legends} alt="Legend Button" />
                      <span className="sr-only">Legend</span>
                    </button>
                  )}
                  <button
                    className="fl btn expand-ctrl"
                    onClick={() => handleFullScreen("site")}
                  >
                       {isSiteMapFullScreen ? (
                      <span>{`${selectedProject.name} Process Flow Diagram`}</span>
                    ) : (
                      ""
                    )}
                    <img
                      src={isSiteMapFullScreen ? Collapse : Expand}
                      alt="Site Map Full Screen Button"
                    />
                    <span className="sr-only">Site Map Full Screen</span>
                  </button>
                </div>
                {isLegendClicked && (
                  //Legend scrool will be displayed here
                  <ul
                    style={{ "background-color": "white", width: "20%" }}
                    className="legend-details scroll-custom"
                  >
                    {getUniqueAssets(Assets).map((asset, index) => (
                      <li key={asset.code}>
                        <span className="fl legend-name">{asset.code}</span>{" "}
                        {asset.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {isDragStarted ? <Loader /> : <SitePlanMapView />}
              {isSiteMapFullScreen && isBackRiverWasteWaterTreatmentSelected && (
                <ul className="fl w100 legend-details full-screen scroll-custom">
                  {getUniqueAssets(Assets).map((asset, index) => (
                    <li key={asset.code}>
                      <span className="fl legend-name">{asset.code}</span>{" "}
                      {asset.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
          {!isSiteMapFullScreen && (
            <div
              className="fl w100 flowSiteplan-bottom"
              style={{
                height: isProcessFlowFullScreen
                  ? "100vh"
                  : `${processFlowHeight}vh`,
                  zIndex: isProcessFlowFullScreen ? "9999": `999`,
              }}
            >
              <div className="fl w100 flowSiteplan-header">
                <h2 className="fl flowSiteplan-header--title">
                  {`${selectedProject.name} Process Flow Diagram`}
                </h2>
                <div className="fr d-flex maps-ctrl">
                  <button
                    className="fl btn expand-ctrl"
                    onClick={() => handleFullScreen("process")}
                  >
                        {isProcessFlowFullScreen ? (
                      <span>{`${selectedProject.name} Siteplan`}</span>
                    ) : (
                      ""
                    )}
                    <img
                      src={isProcessFlowFullScreen ? Collapse : Expand}
                      alt="expand-ctrl"
                    />
                  </button>
                </div>
              </div>
              <div className="fl w100"
              ref={containerRef}
              style={{
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                cursor: isDragging ? 'grabbing' : 'grab',
              }}
              onWheel={handleWheel}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              
              >
              {isBackRiverWasteWaterTreatmentSelected ? (
                <BackRiverProcessFlow  style={{
                  transform: `scale(${scale}) translate(${translate.x}px, ${translate.y}px)`,
                }}/>
              ) : <PatapscoProcessFlow style={{
                transform: `scale(${scale}) translate(${translate.x}px, ${translate.y}px)`,
              }}/>}
              </div>
            </div>
          )}
          {!isSiteMapFullScreen && !isProcessFlowFullScreen && (
            <img
              src={SeparateBar}
              alt="sperate-bar"
              className="fl w100 sperate-bar"
              onDragStart={() => setIsDragStarted(true)}
              onDrag={(e) => handleDrag(e)}
              onDragEnd={(e) => setIsDragStarted(false)}
              style={{ top: `${sliderHeight}%`}}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default ProjectDetails;