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
export const getColor = createAsyncThunk('color/get-color', async (id,thunkApi) => {
    try {
        return await colorService.getColor(id);
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
});
export const updateColor = createAsyncThunk('color/update-color', async (data,thunkApi) => {
    try {
        return await colorService.updateColor(data.id, data);
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
});
export const deleteColor= createAsyncThunk('color/delete-color', async (id,thunkApi) => {
    try {
      
        return await colorService.deleteColor(id);
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
});
const initialState={
    colors:[],
    color:'',
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
        builder.addCase(getColor.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getColor.fulfilled, (state, action) => {
            state.isLoading = false;
            state.color = action.payload; // Assuming you want to store categories
            state.isSuccess = true;
            state.isError = false;
        })
        builder.addCase(getColor.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
       
        builder.addCase(updateColor.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(updateColor.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            // Update the color in the state
            const index = state.colors.findIndex(color => color._id === action.payload._id);
            if (index !== -1) {
                state.colors[index] = action.payload;
            }
        })
        builder.addCase(updateColor.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        // New case for deleteColor
        builder.addCase(deleteColor.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(deleteColor.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            // Remove the color from the state
            state.colors = state.colors.filter(color => color._id !== action.payload._id);
        })
        builder.addCase(deleteColor.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
    }
});

export default colorSlice.reducer;