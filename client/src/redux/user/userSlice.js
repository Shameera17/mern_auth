import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  //   token: null,
  currentUser: null,
  //   isAuthenticated: false,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSucess: (state, action) => {
      state.currentUser = action.payload.data;
      state.loading = false;
      state.error = null; // if previous action/req had errors
    },
    signInFailure: (state, action) => {
      console.log(action.payload);
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { signInStart, signInSucess, signInFailure } = userSlice.actions;
export default userSlice.reducer;
