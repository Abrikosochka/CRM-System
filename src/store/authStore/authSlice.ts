import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface initialState {
  isAuth: boolean;
  isLoading: boolean;
  isUpdateToken: boolean;
}

const initialState: initialState = {
  isAuth: false,
  isLoading: false,
  isUpdateToken: true,
}

const authSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    auth: (state: initialState, action: PayloadAction<boolean>): void => {
      state.isAuth = action.payload;
    },
    loading: (state: initialState, action: PayloadAction<boolean>): void => {
      state.isLoading = action.payload;
    },
    loadingGetToken: (state: initialState, action: PayloadAction<boolean>): void => {
      state.isUpdateToken = action.payload;
    }
  }
})

export const { auth, loading, loadingGetToken } = authSlice.actions;
export const authReducer = authSlice.reducer;
