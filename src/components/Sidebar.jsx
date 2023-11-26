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

const Sidebar = () => {
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
    await GetData(GetProjectsEndPoint).then((response) => {
      dispatch(setProjects(response));
      return response;
    });
  };

  const handleSelectProject = (project) => {
    dispatch(setIsViewDetailsBarCollapsed(true))
    if (project.id === 1) {
      dispatch(setIsBackRiverWasteWaterTreatmentSelected(true))
    } else {
      dispatch(setIsBackRiverWasteWaterTreatmentSelected(false))
    }
    dispatch(setSelectedProject(project))
    if (project.latitude && project.longitude) {
      dispatch(setSelectedAssetLocation([]))
      dispatch(setSelectedProjectLocation([project.latitude, project.longitude]))
    }
  };

  useEffect(() => {
    dispatch(setIsSideNavigationBarCollapsed(false));
    ProjectData();
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
        <button
          onClick={collapseSideBar}
          className="collapse-button menuIcon"
          id="collapseButton"
        >
          <span className="fl"></span>
          <span className="sr-only">Menu</span>
        </button>
      </div>
      <aside className={`fl sidebar ${isAsideVisible ? "show" : ""}`}>
        <Link to="/" className="fl w100 logo">
          <img src={Logo} alt="UK Procurement Logo" />
          <h1 className="sr-only">City of Baltimore</h1>
        </Link>
        <br />
        <br />
        <br />
        {/* <button className="fl w100 btn-primary" disabled={true}>
            <span className="btn-txt">Create New Project</span>
          </button> */}
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
                <span className="fl nav-text">Projects</span>
                <span className="fl icon icon-down-white icon-right"></span>
              </li>
            </ul>
            <ul className="fl w100">
              {projects && projects.length ? (
                projects.map((project, index) => (
                  <li className="fl w100" key={index} onClick={() => handleSelectProject(project)}>
                    <Link to="/project" className="fl w100 d-flex">
                      <span className="fl icon icon-backriver-plant"></span>
                      <span
                        className="fl nav-text"
                      >
                        {project.name}
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
              <span className="fl nav-text">User Management</span>
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