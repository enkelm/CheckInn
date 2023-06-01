import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ModalTypes } from '../components/UI/Modal/Modal';

interface UIState {
  modalIsVisible: ModalStates;
  loading: boolean;
  alert: boolean;
  toast: boolean;
}

interface ModalStates {
  loginModal: boolean;
  signupModal: boolean;
  createListingModal: boolean;
}

const initialState: UIState = {
  modalIsVisible: { loginModal: false, signupModal: false, createListingModal: false },
  loading: false,
  alert: false,
  toast: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState: initialState,
  reducers: {
    toggleModal(state, action: PayloadAction<ModalTypes>) {
      action.type += `/${action.payload}`;
      state.modalIsVisible[action.payload] = !state.modalIsVisible[action.payload];
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
