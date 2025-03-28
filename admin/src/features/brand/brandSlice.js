import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import brandService from "./brandService";
export const getBrands = createAsyncThunk('brand/get-brands', async (thunkApi) => {
    try {
        return await brandService.getBrands();
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
});
const initialState={
    brands:[],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}
export const brandSlice = createSlice({
    name: 'brands',
    initialState,
    reducers: {},
    extraReducers: (builder) => { 
        builder.addCase(getBrands.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getBrands.fulfilled, (state, action) => {
            state.isLoading = false;
            state.brands = action.payload;
            state.isSuccess = true;
            state.isError = false;
        })
        builder.addCase(getBrands.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
    }
});

export default brandSlice.reducer;