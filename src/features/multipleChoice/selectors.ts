import { createSelector } from '@reduxjs/toolkit';
import type { MultipleChoiceState } from '@/features/multipleChoice/slice';

const selectAnswers = (state: MultipleChoiceState) => state.answers;

const selectIndex = (state: MultipleChoiceState) => state.index;

export const selectCurrentAnswer = createSelector(
  [selectAnswers, selectIndex],
  (answers, index) => answers[index],
);

export const selectIsFinished = (state: MultipleChoiceState) =>
  state.index > 0 && state.index === state.answers.length;

export const selectResults = createSelector(
  [selectAnswers, selectIsFinished],
  (answers, isFinished) => {
    return isFinished
      ? {
          numSolved: answers.length,
          numWrong: answers.filter(
            (a) => !!a.choices?.find((c) => c.result === 'INCORRECT'),
          ).length,
        }
      : null;
  },
);
