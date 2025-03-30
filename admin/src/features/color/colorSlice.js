import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import colorService from "./colorService";
export const getColors = createAsyncThunk('color/get-colors', async (thunkApi) => {
    try {
        return await colorService.getColors();
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
});
export const createColor = createAsyncThunk('color/add-color', async (data,thunkApi) => {
    try {
        return await colorService.createColor(data);
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
});
const initialState={
    colors:[],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}
export const colorSlice = createSlice({
    name: 'colors',
    initialState,
    reducers: {},
    extraReducers: (builder) => { 
        builder.addCase(getColors.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getColors.fulfilled, (state, action) => {
            state.isLoading = false;
            state.colors = action.payload;
            state.isSuccess = true;
            state.isError = false;
        })
        builder.addCase(getColors.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        builder.addCase(createColor.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(createColor.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.colors.push(action.payload);
        })
        builder.addCase(createColor.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
    }
});

export default colorSlice.reducer;