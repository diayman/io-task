import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormState {
  subscription: {
    email: string;
    isSubmitting: boolean;
    isSubmitted: boolean;
    error: string | null;
    success: string | null;
  };
}

const initialState: FormState = {
  subscription: {
    email: "",
    isSubmitting: false,
    isSubmitted: false,
    error: null,
    success: null,
  },
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setSubscriptionEmail: (state, action: PayloadAction<string>) => {
      state.subscription.email = action.payload;
    },
    setSubscriptionSubmitting: (state, action: PayloadAction<boolean>) => {
      state.subscription.isSubmitting = action.payload;
    },
    setSubscriptionSubmitted: (state, action: PayloadAction<boolean>) => {
      state.subscription.isSubmitted = action.payload;
    },
    setSubscriptionError: (state, action: PayloadAction<string | null>) => {
      state.subscription.error = action.payload;
    },
    setSubscriptionSuccess: (state, action: PayloadAction<string | null>) => {
      state.subscription.success = action.payload;
    },
    resetSubscriptionForm: (state) => {
      state.subscription = {
        email: "",
        isSubmitting: false,
        isSubmitted: false,
        error: null,
        success: null,
      };
    },
  },
});

export const {
  setSubscriptionEmail,
  setSubscriptionSubmitting,
  setSubscriptionSubmitted,
  setSubscriptionError,
  setSubscriptionSuccess,
  resetSubscriptionForm,
} = formSlice.actions;

export default formSlice.reducer;
