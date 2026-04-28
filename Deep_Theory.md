#  Day 29 - Frontend Task 
## Deep Theory: Modern State Management in React

---

# 1.  Redux Toolkit Store Architecture

Redux Toolkit (RTK) is the official and modern way to use Redux. It simplifies Redux by reducing boilerplate and enforcing best practices.

##   Store -

The **store** is a central place that holds the entire application state.

It follows a **unidirectional data flow**:

UI → Action → Reducer → Store → UI


---

##  Folder Structure -


src/
├── app/
│ └── store.js
├── features/
│ ├── user/
│ │ ├── userSlice.js
│ ├── cart/
│ │ ├── cartSlice.js
├── components/


---

##  Store Setup

```js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import cartReducer from "../features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});



2.  Slices & Reducers

Redux Toolkit introduces slices, which combine:

initial state
reducers (logic)
actions (auto-generated)

This removes the need for separate action files.

🔷  Reducer -

A reducer is a pure function that:

takes current state + action
returns new state
(state, action) → newState

🔷 Slice Example -
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    email: "",
    isLoggedIn: false,
  },
  reducers: {
    login: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.name = "";
      state.email = "";
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;

 Why Slices are Powerful -
1)Reduces boilerplate code
2)Automatically generates actions
3)Uses Immer library → allows writing mutable logic safely
4)Keeps feature-based modular structure


3.  Async Thunks for API Fetching

In real applications, we need to handle API calls (async operations). Redux Toolkit provides:

 createAsyncThunk

🔷  Async Thunk -

It is used to:

call APIs
handle loading state
handle success/failure states

🔷 Example: Fetch Users API
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    return response.json();
  }
);

🔷 Slice with Async Handling
const userSlice = createSlice({
  name: "users",
  initialState: {
    data: [],
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});


 Key Benefits
1)Handles API lifecycle automatically:
       pending
       success
       failure
2)Keeps UI state synchronized with API state
3)Reduces manual loading/error handling
4)Clean separation of async logic


4.  Zustand Lightweight Store

Zustand is a modern alternative to Redux for simpler state management.

It is:

1)lightweight
2)fast
3)minimal boilerplate
4)no provider needed


🔷 Store Creation
import { create } from "zustand";

const useStore = create((set) => ({
  count: 0,

  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));

export default useStore;

🔷 Usage in Component
const count = useStore((state) => state.count);
const increment = useStore((state) => state.increment);

 Why Zustand :
1)No boilerplate (no reducers/actions)
2)No provider wrapping needed
3)Very easy learning curve
4)Great for small to medium apps
5)Fast performance


 Redux vs Zustand
Feature	              Redux Toolkit	        Zustand
Complexity	            Medium	             Low
Boilerplate       	High (before RTK)	       Very low
Setup time	             More	               Very fast
Best use case	         Large apps	          Small/medium apps



5.  React Query (TanStack Query) – Server State

React Query is used for server state management, not UI state.

It handles:

1)API fetching
2)caching
3)background updates
4)synchronization

🔷 Why React Query -

Without React Query:

manual API calls
manual loading states
manual caching logic

With React Query:

automatic caching
auto refetch
smart background updates

🔷 Example
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchUsers = async () => {
  const res = await axios.get("https://jsonplaceholder.typicode.com/users");
  return res.data;
};

function Users() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  return (
    <div>
      {data.map((user) => (
        <p key={user.id}>{user.name}</p>
      ))}
    </div>
  );
}

 Key Features
1)Automatic caching
2)Background refetching
3)Deduping requests
4)Built-in loading/error states
5)Pagination & infinite queries support

  React Query      vs        Redux

Feature    	                   Redux	             React Query
State type	                 UI state	            Server state
Caching                      	Manual	            Automatic
API handling	               Thunk needed	        Built-in
Complexity                  	Higher	             Lower
