import { createSlice } from "@reduxjs/toolkit";

interface UIState {
  modalIsVisible: boolean;
}

const initialState: UIState = {
  modalIsVisible: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    toggleModal(state) {
      state.modalIsVisible = !state.modalIsVisible;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
