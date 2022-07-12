import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apis from "../apis";

export const getUsersAsync = createAsyncThunk("user/getUsersAsync", async () => {
    const { status, result } = await apis.user.getUsers();

    if (status === 1) {
        return result;
    }
});

export const addUserAsync = createAsyncThunk("user/addUserAsync", async (payload) => {
    const { status, result } = await apis.user.addUser(payload);
    if (status === 1) {
        return result;
    }
});

export const updateUserAsync = createAsyncThunk("user/updateUserAsync", async (payload) => {
    const { status, result } = await apis.user.updateUser(payload);
    if (status === 1) {
        return result;
    }
});

export const userSlice = createSlice({
    name: "user",
    initialState: [],
    reducers: {},
    extraReducers: {
        [getUsersAsync.fulfilled]: (state, action) => {
            return action.payload;
        },
        [addUserAsync.fulfilled]: (state, action) => {
            state.push(action.payload);
        },
        [updateUserAsync.fulfilled]: (state, action) => {
            const index = state.findIndex((user) => user.id === action.payload.id);
            state[index] = action.payload;
        }
    },
});

export default userSlice.reducer;
