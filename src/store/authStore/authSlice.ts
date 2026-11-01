import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuth: boolean;
  isLoading: boolean;
  isUpdateToken: boolean;
}

const initialState: AuthState = {
  isAuth: false,
  isLoading: false,
  isUpdateToken: true,
};

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    auth: (state: AuthState, action: PayloadAction<boolean>): void => {
      state.isAuth = action.payload;
    },
    loading: (state: AuthState, action: PayloadAction<boolean>): void => {
      state.isLoading = action.payload;
    },
    setIsUpdateToken: (state: AuthState, action: PayloadAction<boolean>): void => {
      state.isUpdateToken = action.payload;
    },
  },
});

export const { auth, loading, setIsUpdateToken } = authSlice.actions;
export const authReducer = authSlice.reducer;
