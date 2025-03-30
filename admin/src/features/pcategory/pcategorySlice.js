import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import pCategoryService from "./pcategoryService";

export const getCategories = createAsyncThunk('productCategory/get-categories', async (thunkApi) => {
    try {
        return await pCategoryService.getProductCategories();
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
});
export const createProdCategory = createAsyncThunk('productCategory/add-productCategory', async (data, thunkApi) => {
    try {
        return await pCategoryService.createProdCategory(data);
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
});
const initialState = {
    pCategories: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}
export const pCategorySlice = createSlice({
    name: 'pCategories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCategories.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getCategories.fulfilled, (state, action) => {
            state.isLoading = false;
            state.pCategories = action.payload;
            state.isSuccess = true;
            state.isError = false;
        })
        builder.addCase(getCategories.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        builder.addCase(createProdCategory.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(createProdCategory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.pCategories.push(action.payload);
        })
        builder.addCase(createProdCategory.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
    }
});

export default pCategorySlice.reducer;