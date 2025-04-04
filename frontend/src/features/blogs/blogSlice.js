import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import blogService from "./blogService";
export const getBlogs = createAsyncThunk('blog/get-blogs', async (thunkApi) => {
    try {
        return await blogService.getBlogs();
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
});

export const getBlog = createAsyncThunk('blog/get-blog', async (id,thunkApi) => {
    try {
        return await blogService.getBlog(id);
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
});

const initialState={
    blogs:[],
    blog:'',
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}
export const blogSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {},
    extraReducers: (builder) => { 
        builder.addCase(getBlogs.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getBlogs.fulfilled, (state, action) => {
            state.isLoading = false;
            state.blogs = action.payload;
            state.isSuccess = true;
            state.isError = false;
        })
        builder.addCase(getBlogs.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        builder.addCase(getBlog.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getBlog.fulfilled, (state, action) => {
            state.isLoading = false;
            state.blog = action.payload;
            state.isSuccess = true;
            state.isError = false;
        })
        builder.addCase(getBlog.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
       
    }
});

export default blogSlice.reducer;