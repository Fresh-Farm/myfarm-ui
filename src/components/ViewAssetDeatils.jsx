import React from "react";
import { Link } from "react-router-dom";
// import ReactSpeedometer from "react-d3-speedometer";
import { useDispatch } from "react-redux";
import { setIsViewDetailsBarCollapsed } from "../redux/slices/sideBarSlice";
import { setSelectedAssetLocation } from '../redux/slices/projectDetailsSlice';

const ViewAssetDeatils = ({ assetDetails, isEditDisabled }) => {
  const dispatch = useDispatch();
  const assetDetailsInfo =
    assetDetails && assetDetails.length ? assetDetails[0] : null;

  const handleCloseViewDetailsBar = () => {
    dispatch(setIsViewDetailsBarCollapsed(true))
    dispatch(setSelectedAssetLocation([]))
  }

  return (
    <div className="fr view-sitemap">
      <div className="fl w100 modal-header">
        <h2 className="fl">Details</h2>
        <div className="fr d-flex icon-grp">
          {assetDetailsInfo && !isEditDisabled && (
            <Link className="fl edit icon icon-edit" to="/project/edit">
              <span className="sr-only">Edit</span>
            </Link>
          )}
          <button
            className="fl close icon icon-close"
            onClick={handleCloseViewDetailsBar}
          >
            <span className="sr-only">Close</span>
          </button>
        </div>
      </div>
      {assetDetailsInfo ? (
        <div>
          <div className="fl w100 sub-modal-header">
            <div className="fl">
              <h3 className="fl w100 assetId">
                {assetDetailsInfo.name ? assetDetailsInfo.name : "NA"}
              </h3>

            </div>
          </div>

          <ul className="fl w100 modal-details scroll-custom ">
            <li className="fl w100">
              <div className="fl w100 info-head">
                <span className="fl icon icon-target"></span>
                <div className="fl w100 info">
                  <h4 className="fl w100">Area</h4>
                  <p className="fl w100">
                    {assetDetailsInfo ? assetDetailsInfo.area : "No Data"}
                  </p>
                </div>
              </div>
            </li>
            <li className="fl w100">
              <div className="fl w100 info-head">
                <span className="fl icon icon-target"></span>
                <div className="fl w100 info">
                  <h4 className="fl w100">Yield</h4>
                  <p className="fl w100">
                    {assetDetailsInfo
                      ? assetDetailsInfo.yield
                      : "No Data"}
                  </p>
                </div>
              </div>
            </li>            
            <li className="fl w100">
              <div className="fl w100 info-head">
                <span className="fl icon icon-target"></span>
                <div className="fl w100 info">
                  <h4 className="fl w100">Description/Details</h4>
                  <p className="fl w100">
                    {assetDetailsInfo
                      ? assetDetailsInfo.description
                      : "No Data"}
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      ) : (
        "No Data"
      )}
    </div>
  );
};

export default ViewAssetDeatils;
