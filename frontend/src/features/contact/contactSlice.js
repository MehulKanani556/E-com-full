import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import contactService from "./contactService";
import { toast } from "react-toastify";

export const createContact = createAsyncThunk('enquiry/create-contact', async (data, thunkApi) => {
    try {
        return await contactService.createContact(data);
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
});

const initialState = {
    contact: '',
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}
export const contactSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {     
        builder.addCase(createContact.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(createContact.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.contact = action.payload;
            if(state.isSuccess){
                toast.success("Contact Form Submitted successfully")
            }
        })
        builder.addCase(createContact.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            if(state.isError){
                toast.warning("Something Went Wrong")
            }
        })
    }
});

export default contactSlice.reducer;