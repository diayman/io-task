import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  query: string;
  isSearchOpen: boolean;
  results: {
    team: any[];
    services: any[];
  };
  isLoading: boolean;
}

const initialState: SearchState = {
  query: "",
  isSearchOpen: false,
  results: {
    team: [],
    services: [],
  },
  isLoading: false,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    toggleSearch: (state) => {
      state.isSearchOpen = !state.isSearchOpen;
    },
    openSearch: (state) => {
      state.isSearchOpen = true;
    },
    closeSearch: (state) => {
      state.isSearchOpen = false;
    },
    setSearchResults: (
      state,
      action: PayloadAction<{ team: any[]; services: any[] }>
    ) => {
      state.results = action.payload;
    },
    setSearchLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    clearSearch: (state) => {
      state.query = "";
      state.results = { team: [], services: [] };
    },
  },
});

export const {
  setSearchQuery,
  toggleSearch,
  openSearch,
  closeSearch,
  setSearchResults,
  setSearchLoading,
  clearSearch,
} = searchSlice.actions;

export default searchSlice.reducer;
