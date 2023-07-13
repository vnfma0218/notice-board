import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserState = {
  isLoggedIn: boolean;
};

const initialState = {
  isLoggedIn: false,
} as UserState;

export const user = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    reset: () => initialState,
    setLoggedIn: (state) => {
      state.isLoggedIn = true;
    },
  },
});

export const { setLoggedIn } = user.actions;
export default user.reducer;
