import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import brandService from "./brandService";
export const getBrands = createAsyncThunk('brand/get-brands', async (thunkApi) => {
    try {
        return await brandService.getBrands();
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
});
export const getBrand = createAsyncThunk('brand/get-brand', async (id,thunkApi) => {
    try {
        return await brandService.getBrand(id);
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
});
export const createBrands = createAsyncThunk('brand/add-brands', async (data,thunkApi) => {
    try {
        return await brandService.createBrands(data);
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
});
export const updateBrands = createAsyncThunk('brand/update-brand', async (data,thunkApi) => {
    try {
        return await brandService.updateBrand(data.id, data);
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
});
export const deleteBrand = createAsyncThunk('brand/delete-brand', async (id,thunkApi) => {
    try {
      
        return await brandService.deleteBrand(id);
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
});



const initialState={
    brands:[],
    brand:'',
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}
export const brandSlice = createSlice({
    name: 'brands',
    initialState,
    reducers: {},
    extraReducers: (builder) => { 
        builder.addCase(getBrands.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getBrands.fulfilled, (state, action) => {
            state.isLoading = false;
            state.brands = action.payload;
            state.isSuccess = true;
            state.isError = false;
        })
        builder.addCase(getBrands.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        builder.addCase(getBrand.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getBrand.fulfilled, (state, action) => {
            state.isLoading = false;
            state.brand = action.payload;
            state.isSuccess = true;
            state.isError = false;
        })
        builder.addCase(getBrand.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        builder.addCase(createBrands.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(createBrands.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.brands.push(action.payload);
        })
        builder.addCase(createBrands.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        builder.addCase(updateBrands.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(updateBrands.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            const index = state.brands.findIndex(brand => brand.id === action.payload.id);
            if (index !== -1) {
                state.brands[index] = action.payload; // Update the brand in the array
            }
        })
        builder.addCase(updateBrands.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        builder.addCase(deleteBrand.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(deleteBrand.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.brands = state.brands.filter(brand => brand._id !== action.payload._id); // Remove the deleted brand
        })
        builder.addCase(deleteBrand.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
    }
});

export default brandSlice.reducer;