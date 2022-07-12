import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apis from "../apis";
import axiosClient from "../apis/api";

const initialState = JSON.parse(sessionStorage.getItem("auth")) || {
    isAdmin: false,
    user: {},
    token: "",
    isAuthenticated: false,
};

export const loginAsync = createAsyncThunk("login", async (payload) => {
    const res = await apis.auth.login(payload.email, payload.password);
    axiosClient.defaults.headers.common.Authorization = `Bear ${res.token}`;

    if (res.isAdmin) {
        sessionStorage.setItem("auth", JSON.stringify({ ...res, isAuthenticated: true}));
    } else {
        sessionStorage.setItem("auth", JSON.stringify({ ...res, isAuthenticated: false}));
    }

    return res;
});

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        logout(state, action) {
            sessionStorage.removeItem("auth");
            return {
                isAdmin: false,
                user: {},
                token: "",
                isAuthenticated: false,
            };
        },
    },
    extraReducers: {
        [loginAsync.fulfilled]: (state, action) => {
            if (action.payload?.isAdmin) {
                return { ...action.payload, isAuthenticated: true };
            }
            return { ...action.payload, isAuthenticated: false };
        },
    },
});

export const { logout } = authSlice.actions;


export default authSlice.reducer;
