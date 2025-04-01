import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bCategoryService from "./bcategoryService";

export const getCategories = createAsyncThunk('blogCategory/get-categories', async (thunkApi) => {
    try {
        return await bCategoryService.getBlogCategories();
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
});
export const createBlogCategory = createAsyncThunk('blogCategory/add-blogCategory', async (data,thunkApi) => {
    try {
        return await bCategoryService.createBlogCategory(data);
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
});
export const getBlogCategory = createAsyncThunk('blogCategory/get-category', async (id,thunkApi) => {
    try {
        return await bCategoryService.getBlogCategory(id);
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
});
export const updateBlogCategory = createAsyncThunk('blogCategory/update-category', async (data,thunkApi) => {
    try {
        return await bCategoryService.updateBlogCategory(data.id, data);
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
});
export const deleteBlogCategory= createAsyncThunk('blogCategory/delete-category', async (id,thunkApi) => {
    try {
      
        return await bCategoryService.deleteBlogCategory(id);
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
});

const initialState={
    bCategories:[],
    bCategory:'',
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}
export const bCategorySlice = createSlice({
    name: 'bCategories',
    initialState,
    reducers: {},
    extraReducers: (builder) => { 
        builder.addCase(getCategories.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getCategories.fulfilled, (state, action) => {
            state.isLoading = false;
            state.bCategories = action.payload;
            state.isSuccess = true;
            state.isError = false;
        })
        builder.addCase(getCategories.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        builder.addCase(createBlogCategory.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(createBlogCategory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.bCategories.push(action.payload);
        })
        builder.addCase(createBlogCategory.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        builder.addCase(getBlogCategory.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getBlogCategory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.bCategory = action.payload;
            state.isSuccess = true;
            state.isError = false;
        })
        builder.addCase(getBlogCategory.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        builder.addCase(updateBlogCategory.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(updateBlogCategory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            const index = state.bCategories.findIndex(ele => ele.id === action.payload._id);
            if (index !== -1) {
                state.bCategories[index] = action.payload; 
            }
        })
        builder.addCase(updateBlogCategory.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        builder.addCase(deleteBlogCategory.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(deleteBlogCategory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.bCategories = state.bCategories.filter(ele => ele._id !== action.payload._id); 
        })
        builder.addCase(deleteBlogCategory.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
      
    }
});

export default bCategorySlice.reducer;