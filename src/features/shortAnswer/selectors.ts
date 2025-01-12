import { createSelector } from '@reduxjs/toolkit';
import { type ShortAnswerState } from '@/features/shortAnswer/slice';

export const selectItems = (state: ShortAnswerState) => state.items;

const selectIsFinished = (state: ShortAnswerState) => state.isFinished;

export const selectItemByQuestionId = createSelector(
  [selectItems, (_, questionId) => questionId],
  (items, questionId) => items.find((i) => i.question.id! === questionId)!,
);

export const selectResults = createSelector(
  [selectItems, selectIsFinished],
  (items, isFinished) => {
    return isFinished
      ? {
          numSolved: items.length,
          numWrong: items.filter((i) => i.result !== 'CORRECT').length,
        }
      : null;
  },
);
