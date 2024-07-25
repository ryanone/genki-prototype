import { createSelector } from '@reduxjs/toolkit';
import { type WritingPracticeState } from '@/features/writingPractice/writingPracticeSlice';

const selectRows = (state: WritingPracticeState) => state.rows;
const selectIsFinished = (state: WritingPracticeState) => state.isFinished;

const selectResults = createSelector(
  [selectRows, selectIsFinished],
  (rows, isFinished) => {
    return isFinished
      ? {
          numSolved: rows.length * rows[0].answers.length,
          numWrong: rows.reduce((acc, row) => {
            return (
              acc +
              row.answers.reduce((acc2, answer) => {
                return acc2 + (answer.result !== 'CORRECT' ? 1 : 0);
              }, 0)
            );
          }, 0),
        }
      : null;
  },
);

export default selectResults;
