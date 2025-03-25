import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productService";

export const getProducts = createAsyncThunk('product/get-products', async (thunkApi) => {
    try {
        return await productService.getProducts();
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
});
export const createProduct = createAsyncThunk('product/add-products', async (data,thunkApi) => {
    try {
        return await productService.createProduct(data);
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
});
const initialState={
    products:[],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}
export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => { 
        builder.addCase(getProducts.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.products = action.payload;
            state.isSuccess = true;
            state.isError = false;
        })
        builder.addCase(getProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        builder.addCase(createProduct.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(createProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.products.push(action.payload);
        })
        builder.addCase(createProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
    }
});

export default productSlice.reducer;