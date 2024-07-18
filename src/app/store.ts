import { configureStore } from '@reduxjs/toolkit';
import dragDropReducer from '@/features/dragDrop/dragDropSlice';
import multipleChoiceReducer from '@/features/multipleChoice/multipleChoiceSlice';

export const store = configureStore({
  reducer: {
    dragDrop: dragDropReducer,
    multipleChoice: multipleChoiceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
