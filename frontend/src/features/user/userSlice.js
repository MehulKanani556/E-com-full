import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./userService";
import { toast } from "react-toastify";



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
export const getUserWishList = createAsyncThunk('auth/user-wishlist', async (thunkApi) => {
    try {
        return await authService.getUserWishList()
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
});
const getCustomerFromLocalStorage = localStorage.getItem('customer') ? JSON.parse(localStorage.getItem('customer')) : null;

const initialState = {
    user: getCustomerFromLocalStorage,
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
            state.isError = false;
            if(state.isSuccess){
                toast.info("User Created Successfully")
            }
        })
        builder.addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.user = null;
            state.message = "Rejected";
            if(state.isError){
                toast.error(action.error);
            }
        });
        builder.addCase(login.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.user = action.payload;
            if(state.isSuccess){
                localStorage.setItem("token", action.payload.token)
                toast.info("User Login Successfully")
            }
        })
        builder.addCase(login.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.user = null;
            console.log(action)
            state.message = "Rejected";
            if(state.isError){
                toast.error(action.error.message);
            }
        });
        builder.addCase(getUserWishList.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getUserWishList.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.userWishList = action.payload;
            
        })
        builder.addCase(getUserWishList.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.user = null;           
            state.message = "Rejected";
           
        });
        
    }
    
})

export default authSlice.reducer;