import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login } from '../data/authentication';
import { toggleModal } from './ui-slice';

export interface UserState {
  token: string | null | undefined;
  role: string | null | undefined;
  userId: number | null | undefined;
}

interface LoginCredentials {
  email: string;
  password: string;
}

const initialState: UserState = getInitialState();

function getInitialState() {
  const storedUser = localStorage.getItem('USER');

  let initialState = {
    token: null,
    role: null,
    userId: null,
  };

  if (storedUser) initialState = JSON.parse(storedUser);

  return initialState;
}

export const loginThunk = createAsyncThunk<UserState, LoginCredentials>(
  'user/login',
  async ({ email, password }, { dispatch }) => {
    const user = await login(email, password, { dispatch });

    user?.token && dispatch(toggleModal('loginModal'));
    user && localStorage.setItem('USER', JSON.stringify(user));

    return user;
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    loggedInUser(state, action: PayloadAction<UserState | undefined>) {
      const payload = action.payload;
      state.token = payload?.token;
      state.role = payload?.role;
      state.userId = payload?.userId;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.fulfilled, (state, action: PayloadAction<UserState | undefined>) => {
      const payload = action.payload;
      state.token = payload?.token;
      state.role = payload?.role;
      state.userId = payload?.userId;
    });
  },
});

export const { loggedInUser } = userSlice.actions;

export default userSlice;
