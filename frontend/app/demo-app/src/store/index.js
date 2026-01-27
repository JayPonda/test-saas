import { configureStore, createSlice } from '@reduxjs/toolkit';

const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    sessionId: localStorage.getItem('sessionId') || null, // Initialize from localStorage
  },
  reducers: {
    setSessionId: (state, action) => {
      state.sessionId = action.payload;
      localStorage.setItem('sessionId', action.payload); // Keep localStorage in sync for persistence
    },
    clearSessionId: (state) => {
      state.sessionId = null;
      localStorage.removeItem('sessionId'); // Clear from localStorage as well
    },
  },
});

export const { setSessionId, clearSessionId } = sessionSlice.actions;

export const store = configureStore({
  reducer: {
    session: sessionSlice.reducer,
  },
});
