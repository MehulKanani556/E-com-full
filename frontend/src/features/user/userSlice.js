import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./userService";
import { toast } from "react-toastify";



export const registerUser = createAsyncThunk('auth/user-register', async (user, thunkApi) => {
    try {
        return await authService.register(user);
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
});
export const login = createAsyncThunk('auth/user-login', async (user, thunkApi) => {
    try {
        return await authService.login(user)
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
});
export const addToCart = createAsyncThunk('auth/add-to-cart', async (data, thunkApi) => {
    try {
        return await authService.addToCart(data)
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
});
export const getUserWishList = createAsyncThunk('auth/user-wishlist', async (thunkApi) => {
    try {
        return await authService.getUserWishList()
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
});
export const getCart = createAsyncThunk('auth/user-cart', async (thunkApi) => {
    try {
        return await authService.getCart()
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
});
export const removeProdCart = createAsyncThunk('auth/delete-product-cart', async (id,thunkApi) => {
    try {
        return await authService.removeProdCart(id);
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
});
export const updateProdCart = createAsyncThunk('auth/update-product-cart', async (data,thunkApi) => {
    try {
        return await authService.updateProdCart(data);
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
});
export const createOrder = createAsyncThunk('auth/create-order', async (data,thunkApi) => {
    try {
        return await authService.createOrder(data);
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
});
const getCustomerFromLocalStorage = localStorage.getItem('customer') ? JSON.parse(localStorage.getItem('customer')) : null;

const initialState = {
    user: getCustomerFromLocalStorage,
    cart:[],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
            state.isError = false;
            if(state.isSuccess){
                toast.info("User Created Successfully")
            }
        })
        builder.addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.user = null;
            state.message = "Rejected";
            if(state.isError){
                toast.error(action.error);
            }
        });
        builder.addCase(login.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.user = action.payload;
            if(state.isSuccess){
                localStorage.setItem("token", action.payload.token)
                toast.info("User Login Successfully");
                
            }
        })
        builder.addCase(login.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.user = null;
            console.log(action)
            state.message = "Rejected";
            if(state.isError){
                toast.error(action.error.message);
            }
        });
        builder.addCase(getUserWishList.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getUserWishList.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.userWishList = action.payload;
            
        })
        builder.addCase(getUserWishList.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.user = null;           
            state.message = "Rejected";
           
        });
        builder.addCase(addToCart.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(addToCart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.cartProduct = action.payload;
            if(state.isSuccess){
                toast.info("Product Add To Cart")
            }
        })
        builder.addCase(addToCart.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.user = null;           
            state.message = "Rejected";
           
        });
        builder.addCase(getCart.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getCart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.cart = action.payload;
            // if(state.isSuccess){
            //     toast.info("Product Add To Cart")
            // }
        })
        builder.addCase(getCart.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.user = null;           
            state.message = "Rejected";
           
        });
        builder.addCase(removeProdCart.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(removeProdCart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.deletedCartProduct = action.payload;
            if(state.isSuccess){
                toast.info("Product Delete From Cart Successfully")
            }
        })
        builder.addCase(removeProdCart.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.user = null;           
            state.message = "Rejected";
            if(state.isError){
                toast.error("Something went wrong !")
            }
        });
        builder.addCase(updateProdCart.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(updateProdCart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.updateCartProduct = action.payload;
            // if(state.isSuccess){
            //     toast.info("Product Update From Cart Successfully")
            // }
        })
        builder.addCase(updateProdCart.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.user = null;           
            state.message = "Rejected";
            // if(state.isError){
            //     toast.error("Something went wrong !")
            // }
        });
        builder.addCase(createOrder.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(createOrder.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.order = action.payload;
             if(state.isSuccess){
                 toast.success(" Ordered Successfully")
             }
        })
        builder.addCase(createOrder.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.user = null;           
            state.message = "Rejected";
             if(state.isError){
                 toast.error("Something went wrong !")
             }
        });
        
    }
    
})

export default authSlice.reducer;