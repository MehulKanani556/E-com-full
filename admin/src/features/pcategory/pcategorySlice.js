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
export const getCategory = createAsyncThunk('productCategory/getproductCategory', async (id, thunkApi) => {
    try {
        return await pCategoryService.getCategory(id);
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
});
export const updateCategory = createAsyncThunk('productCategory/updateproductCategory', async (data, thunkApi) => {
    try {
        
        
        return await pCategoryService.updateCategory(data.id, data);
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
});
export const deleteCategory = createAsyncThunk('productCategory/deleteproductCategory', async (id, thunkApi) => {
    try {

        return await pCategoryService.deleteCategory(id);
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
});
const initialState = {
    pCategories: [],
    pCategory:'',
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
        builder.addCase(getCategory.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getCategory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.pCategory = action.payload;
            state.isSuccess = true;
            state.isError = false;
        })
        builder.addCase(getCategory.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        builder.addCase(updateCategory.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(updateCategory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            const index = state.pCategories.findIndex(category => category._id === action.payload._id);
            if (index !== -1) {
                state.pCategories[index] = action.payload;
            }
        })
        builder.addCase(updateCategory.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        builder.addCase(deleteCategory.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(deleteCategory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.pCategories = state.pCategories.filter(category => category._id !== action.payload._id);
        })
        builder.addCase(deleteCategory.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
    }
});

export default pCategorySlice.reducer;