import { createSelector } from '@reduxjs/toolkit';
import {
  type FillChartState,
  type Item,
} from '@/features/fillChart/fillChartSlice';

const selectIsFinished = (state: FillChartState) => state.isFinished;
const selectItems = (state: FillChartState) => state.items;

export const selectItemsMap = createSelector([selectItems], (items) => {
  return new Map<string, Item>(
    items.map((item) => [item.correctChoice.id, item]),
  );
});

export const selectResults = createSelector(
  [selectItems, selectIsFinished],
  (items, isFinished) => {
    return isFinished
      ? {
          numSolved: items.length,
          numWrong: items.filter((item) => item.answer.result !== 'CORRECT')
            .length,
        }
      : null;
  },
);
