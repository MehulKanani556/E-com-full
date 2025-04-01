import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import blogService from "./blogService";
export const getBlogs = createAsyncThunk('blog/get-blogs', async (thunkApi) => {
    try {
        return await blogService.getBlogs();
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
});
export const createBlog = createAsyncThunk('blog/add-blog', async (data,thunkApi) => {
    try {
        console.log("data: " , data)
        return await blogService.createBlog(data);
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
export const updateBlog = createAsyncThunk('blog/update-blog', async (data,thunkApi) => {
    try {
        return await blogService.updateBlog(data.id, data);
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
});
export const deleteBlog= createAsyncThunk('blog/delete-blog', async (id,thunkApi) => {
    try {
      
        return await blogService.deleteBlog(id);
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
        builder.addCase(createBlog.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(createBlog.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.blogs.push(action.payload);
        })
        builder.addCase(createBlog.rejected, (state, action) => {
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
        builder.addCase(updateBlog.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(updateBlog.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            const index = state.blogs.findIndex(blog => blog._id === action.payload._id);
            if (index !== -1) {
                state.blogs[index] = action.payload;
            }
        })
        builder.addCase(updateBlog.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        builder.addCase(deleteBlog.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(deleteBlog.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.blogs = state.blogs.filter(blog => blog._id !== action.payload._id);
        })
        builder.addCase(deleteBlog.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
    }
});

export default blogSlice.reducer;