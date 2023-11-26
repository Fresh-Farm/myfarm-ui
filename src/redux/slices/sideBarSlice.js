import { createSlice } from '@reduxjs/toolkit';

export const sideBarSlice = createSlice({
    name: 'SideBarSlice',
    initialState: {
        isSideNavigationBarCollapsed: false,
        isViewDetailsBarCollapsed: true
    },
    reducers: {
        setIsSideNavigationBarCollapsed: (state, action) => {
            state.isSideNavigationBarCollapsed = action.payload;
        },
        setIsViewDetailsBarCollapsed: (state, action) => {
            state.isViewDetailsBarCollapsed = action.payload;
        }
    },
});

export const { setIsSideNavigationBarCollapsed, setIsViewDetailsBarCollapsed } = sideBarSlice.actions;

export default sideBarSlice.reducer;
