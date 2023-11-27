import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Logo from "../assets/logo-dpw.svg";
import {
  GetProjectsEndPoint,
  PowerBiUrl
} from "../constants/constants";
import {
  setIsBackRiverWasteWaterTreatmentSelected,
  setProjects,
  setSelectedAssetLocation,
  setSelectedProject,
  setSelectedProjectLocation,
} from "../redux/slices/projectDetailsSlice";
import {
  setIsSideNavigationBarCollapsed,
  setIsViewDetailsBarCollapsed,
} from "../redux/slices/sideBarSlice";
import { GetData } from "../services/GetService";
import LocationData from '../Data/Location.json'
import UserData from '../Data/UserData.json'

const Sidebar = () => {
  //#region useState
  const [users, setusers] = useState(UserData);
  const [location, setlocation] = useState(LocationData);
  const [owner, setowner] = useState('Guest');
  //#endregion useState

  const { userName } = useSelector((state) => state.userDetails);
  const { isSideNavigationBarCollapsed, isViewDetailsBarCollapsed } =
    useSelector((state) => state.sideBarSlice);
  const [dropdownOpen, setDropdownOpen] = useState(true);
  const sideBarBody = document.querySelector("body");
  const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.projectDetailsSlice);
  const UserName = userName.split(",");
  let ShortFormName = `${UserName[1]}, ${UserName[0]}`;


  const collapseSideBar = () => {
    dispatch(setIsSideNavigationBarCollapsed(!isSideNavigationBarCollapsed));
    sideBarBody.classList.toggle("collapsed");
  };

  const toggleProjectDropDown = (event) => {
    event.stopPropagation();
    setDropdownOpen(!dropdownOpen);
  };

  const ProjectData = async () => {
    // await GetData(GetProjectsEndPoint).then((response) => {
    //   dispatch(setProjects(response));
    //   return response;
    // });    
    dispatch(setProjects(location));
  };

  const handleSelectProject = (project) => {
    dispatch(setIsViewDetailsBarCollapsed(true))    
    dispatch(setSelectedProject(project))
    if (project.locationLatitude && project.locationLongitude) {
      // dispatch(setSelectedAssetLocation([]))
      dispatch(setSelectedProjectLocation([project.locationLatitude, project.locationLongitude]))
    }
  };

  const SetOwner = () => {    
    var name = users.filter((el) => {
      return location.some((f) => {
        return f.ownerId === el.id;
      });
    });
    setowner(name[0].userName);
    
  }

  useEffect(() => {
    dispatch(setIsSideNavigationBarCollapsed(false));
    ProjectData();
    SetOwner()
  }, []);


  useEffect(() => {
    if (!isViewDetailsBarCollapsed && !isSideNavigationBarCollapsed) {
      !isSideNavigationBarCollapsed &&
        sideBarBody.classList.toggle("collapsed");
      dispatch(setIsSideNavigationBarCollapsed(true));
    }
  }, [isViewDetailsBarCollapsed]);
  /* for mobile toggle*/
  const [isAsideVisible, setIsAsideVisible] = useState(false);

  const toggleAside = () => {
    setIsAsideVisible(!isAsideVisible);
    /* for mobile toggle*/
  };
  return (
    <>
      <div className="fl w100 mobHeader">
        <button onClick={collapseSideBar} className="collapse-button menuIcon" id="collapseButton">
          <span className="fl"></span>
          <span className="sr-only">Menu</span>
        </button>
      </div>
      <aside className={`fl sidebar ${isAsideVisible ? "show" : ""}`}>
        <h1 className="fl nav-text" style={{ alignSelf: 'center', color: 'ghostwhite' }}>Welcome {owner}</h1>
        <Link to="/" className="fl w100 logo">
        </Link>
        <br />
        <br />
        <br />
        <ul className="fl w100 navigation">
          <li className="fl w100">
            <Link to="/home" className="fl w100 d-flex">
              <span className="fl icon icon-home"></span>
              <span className="fl nav-text"> Home</span>
            </Link>
          </li>
          <li className={`fl w100 dropdown ${dropdownOpen ? "open" : ""}`}>
            <ul onClick={toggleProjectDropDown} className="fl w100 d-flex">
              <li class="fl w100 d-flex projects">
                <span className="fl icon icon-projects"></span>
                <span className="fl nav-text">My Farm</span>
                <span className="fl icon icon-down-white icon-right"></span>
              </li>
            </ul>
            <ul className="fl w100">
              {location && location.length ? (
                location.map((project, index) => (
                  <li className="fl w100" key={index} onClick={() => handleSelectProject(project)}>
                    <Link to="/project" className="fl w100 d-flex">
                      <span className="fl icon icon-backriver-plant"></span>
                      <span
                        className="fl nav-text"
                      >
                        {project.locationName}
                      </span>
                    </Link>
                  </li>
                ))
              ) : (
                <li className="fl w100">
                  <span className="fl nav-text">No Projects Available</span>
                </li>
              )}
            </ul>
          </li>
          <li className="fl w100">
            <Link to="#" className="fl w100 d-flex">
              <span className="fl icon icon-user-mgmt"></span>
              <span className="fl nav-text">Analyze</span>
            </Link>
          </li>
          <li className="fl w100">
            <Link to="#" className="fl w100 d-flex">
              <span className="fl icon icon-user-mgmt"></span>
              <span className="fl nav-text">Personlaize</span>
            </Link>
          </li>
          <li className="fl w100">
            <Link to="#" className="fl w100 d-flex">
              <span className="fl icon icon-user-mgmt"></span>
              <span className="fl nav-text">About</span>
            </Link>
          </li>
          <li className="fl w100">
            <Link to="#" className="fl w100 d-flex">
              <span className="fl icon icon-user-mgmt"></span>
              <span className="fl nav-text">Contact Us</span>
            </Link>
          </li>
        </ul>
        <button onClick={collapseSideBar} className="collapse-button icon icon-down"
          id="collapseButton"
        >
          <span className="sr-only">expand/collapse</span>
        </button>
      </aside>
    </>
  );
};

export default Sidebar;