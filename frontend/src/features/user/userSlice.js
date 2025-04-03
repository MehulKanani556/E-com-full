import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./userService";



export const registerUser = createAsyncThunk('auth/user-register', async (user, thunkApi) => {
    try {
        return await authService.register(user);
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
});
export const login = createAsyncThunk('auth/user-login', async (user, thunkApi) => {
    try {
        return await authService.login(user)
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
});

const initialState = {
    user: '',
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        })
        builder.addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.user = null;
            state.message = "Rejected";
        });
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