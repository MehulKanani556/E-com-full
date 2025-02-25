import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customerService from "./customerService";

export const getUsers = createAsyncThunk('customer/get-customers', async (thunkApi) => {
    try {
        return await customerService.getUsers();
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
});
const initialState={
    customers:[],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}
export const customerSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => { 
        builder.addCase(getUsers.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.customers = action.payload;
            state.isSuccess = true;
            state.isError = false;
        })
        builder.addCase(getUsers.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
    }
});

export default customerSlice.reducer;