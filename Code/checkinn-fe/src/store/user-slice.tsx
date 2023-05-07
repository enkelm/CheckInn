import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  authToken: string | null;
  userRole: string | null;
  userId: number | null;
}

const initialState: UserState = {
  authToken: null,
  userRole: null,
  userId: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
});

export const userActions = userSlice.actions;

export default userSlice;
