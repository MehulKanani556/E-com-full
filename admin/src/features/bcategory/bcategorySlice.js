import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bCategoryService from "./bcategoryService";

export const getCategories = createAsyncThunk('blogCategory/get-categories', async (thunkApi) => {
    try {
        return await bCategoryService.getBlogCategories();
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
});
const initialState={
    bCategories:[],
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
    }
});

export default bCategorySlice.reducer;