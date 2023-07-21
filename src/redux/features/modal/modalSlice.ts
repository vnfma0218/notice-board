import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ModalState = {
  hasConfirm?: boolean;
  title: string;
  message: string;
  confirmCallback?: () => void;
};

const initialState = {
  title: '',
  message: '',
  confirmCallback: () => {},
  hasConfirm: false,
} as ModalState;

export const modal = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal: (state, action: PayloadAction<ModalState>) => {
      state.title = action.payload.title;
      state.message = action.payload.message;
      state.confirmCallback = action.payload.confirmCallback;
      state.hasConfirm = action.payload.hasConfirm;
      window.message_modal.show();
    },
  },
});

export const { showModal } = modal.actions;
export default modal.reducer;
