import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedProject, setSelectedAssetLocation, setSelectedProjectLocation, setIsBackRiverWasteWaterTreatmentSelected } from "../redux/slices/projectDetailsSlice";
import { setIsViewDetailsBarCollapsed } from '../redux/slices/sideBarSlice';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import image1 from './../assets/AtkinsRealisLogog.svg';
import image2 from './../assets/baltimorePage.png';

const ProjectDetailsPopup = ({ project }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const projectPage = () => {
    dispatch(setIsViewDetailsBarCollapsed(true))
    if (project.id === 1) {
      dispatch(setIsBackRiverWasteWaterTreatmentSelected(true))
    } else {
      dispatch(setIsBackRiverWasteWaterTreatmentSelected(false))
    }
    dispatch(setSelectedProject(project));
    if (project.latitude && project.longitude) {
      dispatch(setSelectedAssetLocation([]))
      dispatch(setSelectedProjectLocation([project.latitude, project.longitude]))
    }
    navigate("/project");
  };

  var items = [
    {
      name: "Random Name #1",
      description: "Probably the most random thing you have ever seen!",
      image: image1
    },
    {
      name: "Random Name #2",
      description: "Hello World!",
      image: image2
    }
  ]
  function Item(props) {
    return (
      <Paper>
        <h2>{props.item.name}</h2>
        <p>{props.item.description}</p>

        <Button className="CheckButton">
          Check it out!
        </Button>
      </Paper>
    )
  }

  return (
    <>
      <div className="modal-holder">
        <div className="fl w100 modal-header">
          <h2 className="fl modal-header--text">{project.name}</h2>
        </div>
        <div className="fl w100 modal-body">
          <p className="fl w100 descp">
            {/* {project.description} */}
            {/* <img src={image} alt='DPW Logo' /> */}
            <Carousel
              next={(next, active) => console.log(`we left ${active}, and are now at ${next}`)}
              prev={(prev, active) => console.log(`we left ${active}, and are now at ${prev}`)}>
              {
                items.map((item, i) =>
                  <>
                    {/* <Item key={i} item={item} /> */}
                    <img src={item.image} alt='DPW Logo' />
                  </>
                )
              }
            </Carousel>
          </p>

          {/* Commenting the code till further clarity. */}
          {/* <div className="fl w100 sub-details">
                        <h3 className="fl w100 sub-head">Details</h3>

                        <ul className="fl w100">
                            <li className="fl w100">
                                <span className="fl attribute">Attribute a :</span>
                                <span className="fl attribute-value">454.89</span>
                            </li>
                            <li className="fl w100">
                                <span className="fl attribute">Attribute b :</span>
                                <span className="fl attribute-value">Random value</span>
                            </li>
                            <li className="fl w100">
                                <span className="fl attribute">Attribute c :</span>
                                <span className="fl attribute-value">Attribute test</span>
                            </li>
                        </ul>
                    </div> */}
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
