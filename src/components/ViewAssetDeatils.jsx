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
          {assetDetailsInfo &&!isEditDisabled && (
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
            <h3 className="fl assetId-initial">
              {assetDetailsInfo.zone ? assetDetailsInfo.zone : "NA"}
            </h3>
            <div className="fl">
              <h3 className="fl w100 assetId">
                {assetDetailsInfo.asset ? assetDetailsInfo.asset : "NA"}
              </h3>
              <span className="fl w100 count">
                Total: {assetDetailsInfo ? assetDetailsInfo.totalCount : "0"}
              </span>
            </div>
          </div>
          <div className="fl w100 working-status">
            <div className="fl status-title">
              <span className="fl icon icon-setting"></span>
              <p className="fl">Working Status</p>
            </div>
            <ul className="fl risk-legend">
              <li className="fl green">
                {assetDetailsInfo ? assetDetailsInfo.activeCount : "No Data"}
              </li>
              <li className="fl red">
                {assetDetailsInfo ? assetDetailsInfo.inactiveCount : "No Data"}
              </li>
            </ul>
          </div>

          <ul className="fl w100 modal-details scroll-custom ">
            <li className="fl w100">
              <div className="fl w100 info-head">
                <span className="fl icon icon-target"></span>
                <div className="fl w100 info">
                  <h4 className="fl w100">Purpose</h4>
                  <p className="fl w100">
                    {assetDetailsInfo ? assetDetailsInfo.purpose : "No Data"}
                  </p>
                </div>
              </div>
            </li>
            <li className="fl w100">
              <div className="fl w100 info-head">
                <span className="fl icon icon-target"></span>
                <div className="fl w100 info">
                  <h4 className="fl w100">Process Impacts-Failure</h4>
                  <p className="fl w100">
                    {assetDetailsInfo
                      ? assetDetailsInfo.processImpactsFailure
                      : "No Data"}
                  </p>
                </div>
              </div>
            </li>
            <li className="fl w100">
              <div className="fl w100 info-head">
                <span className="fl icon icon-target"></span>
                <div className="fl w100 info">
                  <h4 className="fl w100">Permit Compliance Risk</h4>
                  <p className="fl w100">
                    {assetDetailsInfo
                      ? assetDetailsInfo.permitComplianceRisk
                      : "No Data"}
                  </p>
                </div>
              </div>
              <span className="fl w100 mb-2"></span>
              <div className="fl w100 speed-wrapper">
                <strong>Effulent Quality</strong>
                
                {/* <ReactSpeedometer
                  minValue={0}
                  maxValue={10000}
                  segments={2}
                  needleHeightRatio={0.7}
                  value={
                    assetDetailsInfo ? assetDetailsInfo.effluentQuality : 0
                  }
                  customSegmentLabels={[
                    {
                      text: "Low",
                      position: "INSIDE",
                      color: "#555",
                    },
                    {
                      text: "High",
                      position: "INSIDE",
                      color: "#555",
                    },
                  ]}
                  ringWidth={37}
                  needleTransitionDuration={8333}
                  needleTransition="easeElastic"
                  needleColor={"#90f2ff"}
                  textColor={"#d8dee9"}
                /> */}
                <strong>Sludge Quality</strong>
                {/* <img src={meter} alt={meter} /> */}
                {/* <ReactSpeedometer
                  minValue={0}
                  maxValue={10000}
                  segments={2}
                  needleHeightRatio={0.7}
                  value={assetDetailsInfo ? assetDetailsInfo.sludgeQuality : 0}
                  customSegmentLabels={[
                    {
                      text: "Low",
                      position: "INSIDE",
                      color: "#555",
                    },
                    {
                      text: "High",
                      position: "INSIDE",
                      color: "#555",
                    },
                  ]}
                  ringWidth={47}
                  needleTransitionDuration={8333}
                  needleTransition="easeElastic"
                  needleColor={"#90f2ff"}
                  textColor={"#d8dee9"}
                /> */}
              </div>
            </li>
            <li className="fl w100">
              <div className="fl w100 info-head">
                <span className="fl icon icon-target"></span>
                <div className="fl w100 info">
                  <h4 className="fl w100">Current Conditions</h4>
                  <p className="fl w100">
                    {assetDetailsInfo
                      ? assetDetailsInfo.currentConditions
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
