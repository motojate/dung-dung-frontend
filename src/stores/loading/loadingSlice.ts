import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ILodingState {
  isLoading: boolean;
}

const initialState: ILodingState = {
  isLoading: false,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setLoading } = loadingSlice.actions;
export default loadingSlice;
