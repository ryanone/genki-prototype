import { combineReducers, configureStore } from '@reduxjs/toolkit';
import dragDropReducer from '@/features/dragDrop/dragDropSlice';
import fillChartReducer from '@/features/fillChart/fillChartSlice';
import multipleChoiceReducer from '@/features/multipleChoice/multipleChoiceSlice';
import shortAnswerReducer from '@/features/shortAnswer/shortAnswerSlice';
import writingPracticeReducer from '@/features/writingPractice/writingPracticeSlice';

const rootReducer = combineReducers({
  dragDrop: dragDropReducer,
  fillChart: fillChartReducer,
  multipleChoice: multipleChoiceReducer,
  shortAnswer: shortAnswerReducer,
  writingPractice: writingPracticeReducer,
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
