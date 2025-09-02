import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LanguageState {
  currentLanguage: "en" | "ar";
  isRTL: boolean;
}

const initialState: LanguageState = {
  currentLanguage: "en",
  isRTL: false,
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<"en" | "ar">) => {
      state.currentLanguage = action.payload;
      state.isRTL = action.payload === "ar";
    },
    toggleLanguage: (state) => {
      const newLang = state.currentLanguage === "en" ? "ar" : "en";
      state.currentLanguage = newLang;
      state.isRTL = newLang === "ar";
    },
  },
});

export const { setLanguage, toggleLanguage } = languageSlice.actions;
export default languageSlice.reducer;
