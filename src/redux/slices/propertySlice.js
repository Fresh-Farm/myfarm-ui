import { createSlice } from '@reduxjs/toolkit';
export const propertySlice = createSlice({
    name: 'Properties',
    initialState: {
        properties: [],
    },
    reducers: {
        setPropertyId: (state, action) => {
            state.properties = action.payload;
        },
    },
});
export const { setPropertyId} = propertySlice.actions;
export default propertySlice.reducer;