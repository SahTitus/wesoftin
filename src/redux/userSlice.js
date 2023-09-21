import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'users',
    initialState: {
        profiles: [],
        isLoading: false,
        error: null
    },
    reducers: {
        fetchUsersStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        fetchUsersSuccess: (state, action) => {
            state.profiles = action.payload;
            state.isLoading = false;
        },
        fetchUsersFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
});

export const { fetchUsersStart, fetchUsersSuccess, fetchUsersFailure } = userSlice.actions;
export default userSlice.reducer;
