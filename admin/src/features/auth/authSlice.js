import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const getUserFromLocalStorage = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
const initialState = {
    user: getUserFromLocalStorage,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
    orders: [],
    order:''
};

export const login = createAsyncThunk('auth/admin-login', async (user, thunkApi) => {
    try {
        return await authService.login(user)
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
});
export const getOrders = createAsyncThunk('order/get-orders', async (thunkApi) => {
    try {
        return await authService.getOrders();
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
});
export const getOrderByUserId = createAsyncThunk('order/getorderbyuser', async (id,thunkApi) => {
    try {
        return await authService.getOrderByUserId(id);
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
});

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            localStorage.removeItem('user');
            window.location.href ="/"
            
        }
    },
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
        builder.addCase(getOrders.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getOrders.fulfilled, (state, action) => {
            state.isLoading = false;
            state.orders = action.payload;
            state.isSuccess = true;
            state.isError = false;
        })
        builder.addCase(getOrders.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        builder.addCase(getOrderByUserId.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getOrderByUserId.fulfilled, (state, action) => {
            state.isLoading = false;
            state.order = action.payload[0].products;
            state.isSuccess = true;
            state.isError = false;
        })
        builder.addCase(getOrderByUserId.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
    }
})

export const { logout } = authSlice.actions;

export default authSlice.reducer;