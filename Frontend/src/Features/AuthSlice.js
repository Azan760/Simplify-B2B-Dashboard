import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async login function
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post("http://localhost:8000/api/login", userData, {
                withCredentials: true,
            });
            const data = response.data;

            if (!data.success) {
                throw new Error(data.message || "Login failed");
            }

            return {
                token: data.data.accessToken,
                user: data.data.loginUserData,
            };
        } catch (error) {
            return rejectWithValue(error.response || error.message);
        }
    }
);

// Get initial state from localStorage
const initialState = {
    user: JSON.parse(localStorage.getItem("userData")) || null,
    token: localStorage.getItem("userToken") || null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem("userToken");
            localStorage.removeItem("userData"); // Clear user data
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                console.log("Login Successful:", action.payload);

                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;

                // Persist in localStorage
                localStorage.setItem("userToken", action.payload.token);
                localStorage.setItem("userData", JSON.stringify(action.payload.user));
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
