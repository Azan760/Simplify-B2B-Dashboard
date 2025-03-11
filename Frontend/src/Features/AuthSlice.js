import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async login function
export const loginUser = createAsyncThunk("auth/loginUser", async (userData, { rejectWithValue }) => {
    try {

        const response = await axios.post("http://localhost:8000/api/login", userData,{
            withCredentials : true,
        });
        console.log(response );
        const data = response.data;

        if (!data.success) {
            throw new Error(data.message || "Login failed");
        }

        return {
            token: data.data.accessToken,  
            user: data.data.loginUserData, 
        };
    } catch (error) {

        return rejectWithValue(error.response?.data?.message || error.message);
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState: { user: null, token: null, loading: false, error: null },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem("userToken");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                localStorage.setItem("userToken", action.payload.token); // Store token
                state.token = action.payload.token;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
