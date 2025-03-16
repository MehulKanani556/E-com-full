import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import enquiryService from "./enquiryService";
export const getEnquirys = createAsyncThunk('enquiry/get-enquirys', async (thunkApi) => {
    try {
        return await enquiryService.getEnquirys();
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
});
const initialState={
    enquirys:[],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}
export const enquirySlice = createSlice({
    name: 'enquirys',
    initialState,
    reducers: {},
    extraReducers: (builder) => { 
        builder.addCase(getEnquirys.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getEnquirys.fulfilled, (state, action) => {
            state.isLoading = false;
            state.enquirys = action.payload;
            state.isSuccess = true;
            state.isError = false;
        })
        builder.addCase(getEnquirys.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
    }
});

export default enquirySlice.reducer;