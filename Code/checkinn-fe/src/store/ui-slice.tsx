import { createSlice } from '@reduxjs/toolkit';

interface UIState {
  modalIsVisible: boolean;
  loading: boolean;
  alert: boolean;
  toast: boolean;
}

const initialState: UIState = {
  modalIsVisible: false,
  loading: false,
  alert: false,
  toast: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState: initialState,
  reducers: {
    toggleModal(state) {
      state.modalIsVisible = !state.modalIsVisible;
    },
    toggleLoading(state) {
      state.loading = !state.loading;
    },
    toggleAlert(state) {
      state.alert = !state.alert;
    },
    toggleToast(state) {
      state.toast = !state.toast;
    },
  },
});

export const { toggleLoading, toggleModal, toggleAlert, toggleToast } = uiSlice.actions;

export default uiSlice;
