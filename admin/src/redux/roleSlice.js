import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apis from "../apis";

export const getRolesAsync = createAsyncThunk("role/getRolesAsync", async () => {
    const { status, result } = await apis.role.getRoles();
    if (status === 1) {
        return result;
    }
});


export const roleSlice = createSlice({
    name: "role",
    initialState: [],
    reducers: {},
    extraReducers: {
        [getRolesAsync.fulfilled]: (state, action) => {
            return action.payload;
        }
    },
});

export default roleSlice.reducer;
