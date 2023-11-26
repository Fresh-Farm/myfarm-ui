import { createSlice } from '@reduxjs/toolkit';

export const projectDetailsSlice = createSlice({
    name: 'ProjectDetailsSlice',
    initialState: {
        projects: [],
        selectedProject: {},
        specificAssetDetails: [],
        allAssets: [],
        selectedAssetLocation: [],
        selectedProjectLocation: [],
        isBackRiverWasteWaterTreatmentSelected: false
    },
    reducers: {
        setProjects: (state, action) => {
            state.projects = action.payload;
        },
        setSelectedProject: (state, action) => {
            state.selectedProject = action.payload;
        },
        setSelectedAssetDetails: (state, action) => {
            state.specificAssetDetails = action.payload;
        },
        setAllAssets: (state, action) => {
            state.allAssets = action.payload;
        },
        setSelectedAssetLocation: (state, action) => {
            state.selectedAssetLocation = action.payload;
        },
        setSelectedProjectLocation: (state, action) => {
            state.selectedProjectLocation = action.payload;
        },
        setIsBackRiverWasteWaterTreatmentSelected: (state, action) => {
            state.isBackRiverWasteWaterTreatmentSelected = action.payload;
        }
    },
});

export const { setProjects, setSelectedAssetDetails, setSelectedProject, setAllAssets, setSelectedAssetLocation, setSelectedProjectLocation, setIsBackRiverWasteWaterTreatmentSelected } = projectDetailsSlice.actions;

export default projectDetailsSlice.reducer;
