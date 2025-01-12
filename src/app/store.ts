import { combineReducers, configureStore } from '@reduxjs/toolkit';
import dragDropReducer from '@/features/dragDrop/slice';
import fillChartReducer from '@/features/fillChart/slice';
import multipleChoiceReducer from '@/features/multipleChoice/slice';
import shortAnswerReducer from '@/features/shortAnswer/slice';
import writingChoiceSlice from '@/features/writingChoice/slice';
import writingPracticeReducer from '@/features/writingPractice/slice';

const rootReducer = combineReducers({
  dragDrop: dragDropReducer,
  fillChart: fillChartReducer,
  multipleChoice: multipleChoiceReducer,
  shortAnswer: shortAnswerReducer,
  writingChoice: writingChoiceSlice,
  writingPractice: writingPracticeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
