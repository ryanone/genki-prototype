import { createSelector } from '@reduxjs/toolkit';
import { type WritingChoiceState } from '@/features/writingChoice/slice';

export const selectAnswers = (state: WritingChoiceState) => state.answers;

const selectIsFinished = (state: WritingChoiceState) => state.isFinished;

export const selectResults = createSelector(
  [selectAnswers, selectIsFinished],
  (answers, isFinished) => {
    return isFinished
      ? {
          numSolved: answers.length,
          numWrong: answers.filter((a) => a.result !== 'CORRECT').length,
        }
      : null;
  },
);
