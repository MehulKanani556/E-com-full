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
export const getProduct = createAsyncThunk('product/get-product', async (id, thunkApi) => {
    try {
        return await productService.getProduct(id);
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
});
export const updateProduct = createAsyncThunk('product/update-product', async (data, thunkApi) => {
    try {
        return await productService.updateProduct(data.id, data);
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
});
export const deleteProduct = createAsyncThunk('product/delete-product', async (id, thunkApi) => {
    try {

        return await productService.deleteProduct(id);
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
});
const initialState={
    products:[],
    product:'',
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
        builder.addCase(getProduct.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.product = action.payload;
            state.isSuccess = true;
            state.isError = false;
        })
        builder.addCase(getProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        builder.addCase(updateProduct.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(updateProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            const index = state.products.findIndex(product => product._id === action.payload._id);
            if (index !== -1) {
                state.products[index] = action.payload;
            }
        })
        builder.addCase(updateProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        builder.addCase(deleteProduct.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.products = state.products.filter(product => product._id !== action.payload._id);
        })
        builder.addCase(deleteProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
    }
});

export default productSlice.reducer;