import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedProject, setSelectedAssetLocation, setSelectedProjectLocation, setIsBackRiverWasteWaterTreatmentSelected } from "../redux/slices/projectDetailsSlice";
import {setIsViewDetailsBarCollapsed} from '../redux/slices/sideBarSlice';

const ProjectDetailsPopup = ({ project }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const projectPage = () => {
    dispatch(setIsViewDetailsBarCollapsed(true))
    if(project.id === 1){
      dispatch(setIsBackRiverWasteWaterTreatmentSelected(true))
    }else{
      dispatch(setIsBackRiverWasteWaterTreatmentSelected(false))
    }
    dispatch(setSelectedProject(project));
    if(project.latitude && project.longitude){
      dispatch(setSelectedAssetLocation([]))
      dispatch(setSelectedProjectLocation([project.latitude, project.longitude]))
    }
    navigate("/project");
  };
  
  return (
    <>
      <div className="modal-holder">
        <div className="fl w100 modal-header">
          <h2 className="fl modal-header--text">{project.locationName}</h2>
        </div>
        <div className="fl w100 modal-body">
          <p className="fl w100 descp">
            {project.description}
          </p>          
        </div>
        <div className="fl w100 modal-footer">
          <button className="fl btn-secondry btn-details" onClick={projectPage}>
            View Sitemap
          </button>
        </div>
      </div>
    </>
  );
};
export default ProjectDetailsPopup;
