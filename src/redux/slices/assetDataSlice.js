import { createSlice } from '@reduxjs/toolkit';
export const assetDataSlice = createSlice({
    name: 'AssetDetails',
    initialState: {
        specificAssetDetails: [],
    },
    reducers: {
        setAssetId: (state, action) => {
            state.specificAssetDetails = action.payload;
        },
    },
});
export const {setAssetId} = assetDataSlice.actions;
  
export default assetDataSlice.reducer;