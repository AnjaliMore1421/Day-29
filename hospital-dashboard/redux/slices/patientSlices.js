// Redux Toolkit slice for Patients module
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// -----------------------------
// ASYNC API CALL (Thunk)
// -----------------------------
export const fetchPatients = createAsyncThunk(
  "patients/fetchPatients",
  async () => {
    // API call to fetch users (acting as patients)
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );

    return response.data; // returned data goes to reducer
  }
);

// -----------------------------
// SLICE
// -----------------------------
const patientsSlice = createSlice({
  name: "patients",

  // initial state of patients module
  initialState: {
    list: [],      // patients data
    loading: false // loading state
  },

  reducers: {},

  // handles async lifecycle actions
  extraReducers: (builder) => {
    builder
      // when API call starts
      .addCase(fetchPatients.pending, (state) => {
        state.loading = true;
      })

      // when API succeeds
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })

      // when API fails
      .addCase(fetchPatients.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default patientsSlice.reducer;
