import { configureStore } from "@reduxjs/toolkit";
import languageSlice from "./slices/languageSlice";
import searchSlice from "./slices/searchSlice";
import formSlice from "./slices/formSlice";

export const store = configureStore({
  reducer: {
    language: languageSlice,
    search: searchSlice,
    form: formSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
