import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login } from '../data/authentication';
// import { APIErrorResponse } from '../lib/axios';

export interface UserState {
  token: string | null;
  role: string | null;
  userId: number | null;
}

interface LoginCredentials {
  email: string;
  password: string;
}

const initialState: UserState = {
  token: null,
  role: null,
  userId: null,
};

export const loginThunk = createAsyncThunk<UserState, LoginCredentials>(
  'user/login',
  async ({ email, password }) => {
    return await login(email, password);
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginThunk.fulfilled, (state, action: PayloadAction<UserState>) => {
      const { token, role, userId } = action.payload;
      state.token = token;
      state.role = role;
      state.userId = userId;
    });
  },
});

export const userActions = userSlice.actions;

export default userSlice;
