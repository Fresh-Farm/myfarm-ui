import { createSlice } from '@reduxjs/toolkit';

export const userDetails = createSlice({
    name: 'UserDetails',
    initialState: {
        userEmail: '',
        userName: '',
        userLoginSource: '',
        userRole: 'View',
    },
    reducers: {
        setUserEmail: (state, action) => {
            state.userEmail = action.payload;
        },
        setUserName: (state, action) => {
            state.userName = action.payload;
        },
        setUserLoginSource: (state, action) => {
            state.userLoginSource = action.payload;
        },
        setUserRole: (state, action) => {
            state.userRole = action.payload;
        }
    },
});

export const { setUserEmail, setUserName, setUserLoginSource, setUserRole } = userDetails.actions;

export default userDetails.reducer;
