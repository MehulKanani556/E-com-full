import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import enquiryService from "./enquiryService";
export const getEnquirys = createAsyncThunk('enquiry/get-enquirys', async (thunkApi) => {
    try {
        return await enquiryService.getEnquirys();
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
});
export const getEnquiry = createAsyncThunk('enquiry/get-enquiry', async (id,thunkApi) => {
    try {
        return await enquiryService.getEnquiry(id);
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
});
export const updateEnquiry = createAsyncThunk('enquiry/update-enquiry', async (data,thunkApi) => {
    try {
        return await enquiryService.updateEnquiry(data.id, data);
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
});
export const deleteEnquiry= createAsyncThunk('enquiry/delete-enquiry', async (id,thunkApi) => {
    try {      
        return await enquiryService.deleteEnquiry(id);
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
});
const initialState={
    enquirys:[],
    enquiry:'',
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
        builder.addCase(getEnquiry.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getEnquiry.fulfilled, (state, action) => {
            state.isLoading = false;
            state.enquiry = action.payload; // Assuming you want to store categories
            state.isSuccess = true;
            state.isError = false;
        })
        builder.addCase(getEnquiry.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
       
        builder.addCase(updateEnquiry.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(updateEnquiry.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            // Update the color in the state
            const index = state.enquirys.findIndex(enquiry => enquiry._id === action.payload._id);
            if (index !== -1) {
                state.enquirys[index] = action.payload;
            }
        })
        builder.addCase(updateEnquiry.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        // New case for deleteenquiry
        builder.addCase(deleteEnquiry.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(deleteEnquiry.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            // Remove the enquiry from the state
            state.enquirys = state.enquirys.filter(enquiry => enquiry._id !== action.payload._id);
        })
        builder.addCase(deleteEnquiry.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
    }
});

export default enquirySlice.reducer;