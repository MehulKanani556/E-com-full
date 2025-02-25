import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const getUserFromLocalStorage = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
const initialState = {
    user: getUserFromLocalStorage,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};
export const login = createAsyncThunk('auth/admin-login', async (user, thunkApi) => {
    try {
        return await authService.login(user)
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
});

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        })
        builder.addCase(login.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.user = null;
            state.message = "Rejected";
        });
    }
})

export default authSlice.reducer;