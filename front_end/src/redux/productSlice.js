import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apis from "../apis";

export const getProductsAsync = createAsyncThunk("Product/getProductsAsync", async () => {
    const { status, result } = await apis.product.getProducts();

    if (status === 1) {
        return result;
    }
});

export const addProductAsync = createAsyncThunk("Product/addProductAsync", async (payload) => {
    const { status, result } = await apis.product.addProduct(payload);
    
    if (status === 1) {
        return result;
    }
});

export const updateProductAsync = createAsyncThunk("Product/updateProductAsync", async (payload, id) => {
    
    const { status, result } = await apis.product.updateProduct(payload, id);

    if (status === 1) {
        return result;
    }
});

export const productSlice = createSlice({
    name: "product",
    initialState: [],
    reducers: {},
    extraReducers: {
        [getProductsAsync.fulfilled]: (state, action) => {
            return action.payload;
        },
        [addProductAsync.fulfilled]: (state, action) => {
            state.push(action.payload);
        },
        [updateProductAsync.fulfilled]: (state, action) => {
            const index = state.findIndex((product) => product.id === action.payload.id);
            state[index] = action.payload;
        }
    },
});

export default productSlice.reducer;
