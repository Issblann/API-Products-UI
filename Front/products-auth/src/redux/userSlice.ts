import { createSlice } from '@reduxjs/toolkit';
import { User } from '../types/user';

export interface UserState {
  currentUser: User | null;
  loading: boolean;
  error: boolean;
}

const initialState: UserState = {
  currentUser: null,
  loading: false,
  error: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    sinInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
    },
    signInError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { sinInStart, signInSuccess, signInError } = userSlice.actions;

export default userSlice.reducer;
