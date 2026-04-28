// Redux store configuration
import { configureStore } from "@reduxjs/toolkit";
import patientsReducer from "./slices/patientsSlice";

// Global store for entire app
export const store = configureStore({
  reducer: {
    patients: patientsReducer, // patients state
  },
});
