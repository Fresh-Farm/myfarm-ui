import React from 'react';
import SatelliteView from './SatelliteView';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setSelectedProject, setSelectedAssetDetails } from '../../redux/slices/projectDetailsSlice';

const Home = () => {
  const { isSideNavigationBarCollapsed } = useSelector((state) => state.sideBarSlice);
  const { projects } = useSelector((state) => state.projectDetailsSlice);
  const dispatch = useDispatch();

  const SetelliteMapView = () => {
    return <SatelliteView />;

  };

  useEffect(() => {
    SetelliteMapView();
  }, [isSideNavigationBarCollapsed]);

  useEffect(() => {
    dispatch(setSelectedProject({}))
    dispatch(setSelectedAssetDetails([]))
  }, []);

  return (
    <>
      <div>
        <div className="fl content-wrapper">
          <SetelliteMapView />
        </div>
      </div>
    </>
  );
};

export default Home;