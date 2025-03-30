import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import couponService from "./couponService";
export const getCoupons = createAsyncThunk('coupon/get-coupons', async (thunkApi) => {
    try {
        return await couponService.getCoupons();
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
});
export const createCoupon = createAsyncThunk('coupon/add-coupon', async (data,thunkApi) => {
    try {
        return await couponService.createCoupon(data);
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
});
const initialState={
    coupons:[],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}
export const couponSlice = createSlice({
    name: 'coupons',
    initialState,
    reducers: {},
    extraReducers: (builder) => { 
        builder.addCase(getCoupons.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getCoupons.fulfilled, (state, action) => {
            state.isLoading = false;
            state.coupons = action.payload;
            state.isSuccess = true;
            state.isError = false;
        })
        builder.addCase(getCoupons.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        builder.addCase(createCoupon.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(createCoupon.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.coupons.push(action.payload);
        })
        builder.addCase(createCoupon.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
    }
});

export default couponSlice.reducer;