/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const loggedUserSlice = createSlice({
  name: 'loggedUser',
  initialState: {
    loggedUser: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.loggedUser = action.payload;
    },
  },
});

export const { setUser } = loggedUserSlice.actions;

export default loggedUserSlice.reducer;
