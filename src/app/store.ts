import { configureStore } from '@reduxjs/toolkit';
import dragDropReducer from '@/features/dragDrop/dragDropSlice';

export const store = configureStore({
  reducer: {
    dragDrop: dragDropReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
