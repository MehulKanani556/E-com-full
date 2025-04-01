import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import couponService from "./couponService";
export const getCoupons = createAsyncThunk('coupon/get-coupons', async (thunkApi) => {
    try {
        return await couponService.getCoupons();
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
});
export const createCoupon = createAsyncThunk('coupon/add-coupon', async (data, thunkApi) => {
    try {
        return await couponService.createCoupon(data);
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
});
export const getCoupon = createAsyncThunk('coupon/get-coupon', async (id, thunkApi) => {
    try {
        return await couponService.getCoupon(id);
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
});
export const updateCoupon = createAsyncThunk('coupon/update-coupon', async (data, thunkApi) => {
    try {
        return await couponService.updateCoupon(data.id, data);
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
});
export const deleteCoupon = createAsyncThunk('coupon/delete-coupon', async (id, thunkApi) => {
    try {

        return await couponService.deleteCoupon(id);
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
});

const initialState = {
    coupons: [],
    coupon: '',
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
        builder.addCase(getCoupon.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getCoupon.fulfilled, (state, action) => {
            state.isLoading = false;
            state.coupon = action.payload;
            state.isSuccess = true;
            state.isError = false;
        })
        builder.addCase(getCoupon.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        builder.addCase(updateCoupon.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(updateCoupon.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            const index = state.coupons.findIndex(coupon => coupon._id === action.payload._id);
            if (index !== -1) {
                state.coupons[index] = action.payload;
            }
        })
        builder.addCase(updateCoupon.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        builder.addCase(deleteCoupon.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(deleteCoupon.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.coupons = state.coupons.filter(coupon => coupon._id !== action.payload._id);
        })
        builder.addCase(deleteCoupon.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
    }
});

export default couponSlice.reducer;