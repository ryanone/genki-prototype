import { combineReducers, configureStore } from '@reduxjs/toolkit';
import dragDropReducer from '@/features/dragDrop/dragDropSlice';
import multipleChoiceReducer from '@/features/multipleChoice/multipleChoiceSlice';

const rootReducer = combineReducers({
  dragDrop: dragDropReducer,
  multipleChoice: multipleChoiceReducer,
});

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
