import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import uploadService from "./uploadService";

export const uploadImg = createAsyncThunk('upload/images', async (data,thunkApi) => {
    try {
        const formData = new FormData();
        for (let i = 0; i < data.length; i++) {
            formData.append('images', data[i]);
        }
        return await uploadService.uploadImg(formData);
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
});
export const deleteImg = createAsyncThunk('delete/images', async (id,thunkApi) => {
    try {
       
        return await uploadService.deleteImg(id);
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
});
const initialState={
    images:[],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}
export const uploadSlice = createSlice({
    name: 'images',
    initialState,
    reducers: {},
    extraReducers: (builder) => { 
        builder.addCase(uploadImg.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(uploadImg.fulfilled, (state, action) => {
            state.isLoading = false;
            state.images = action.payload;
            state.isSuccess = true;
            state.isError = false;
        })
        builder.addCase(uploadImg.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        builder.addCase(deleteImg.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(deleteImg.fulfilled, (state, action) => {
            state.isLoading = false;
            state.images = [];
            state.isSuccess = true;
            state.isError = false;
        })
        builder.addCase(deleteImg.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
    }
});

export default uploadSlice.reducer;