import { createSelector } from '@reduxjs/toolkit';
import type { Answer, DragDropState } from '@/features/dragDrop/dragDropSlice';
import type { Choice } from '@/data/exercise';

const selectAnswers = (state: DragDropState) => state.answers as Answer[];

export const selectRemainingChoices = createSelector(
  [
    selectAnswers,
    (state) => state.choices as Record<string, Choice>,
  ],
  (answers, choices) => {
    const correctChoiceIds = new Set(answers.filter(val => val.selectedChoiceId && val.result === 'CORRECT').map(val => val.selectedChoiceId));
    return Object.entries(choices).filter(([id]) => !correctChoiceIds.has(id)).map(([, choice]) => choice);
  }
);

export const selectResults = createSelector(
  [
    selectAnswers,
    selectRemainingChoices
  ],
  (answers, remainingChoices) =>
    remainingChoices.length === 0 ?
      {
        numSolved: answers.length,
        numWrong: answers.filter(a => a.numIncorrectGuesses).length,
      } :
      null
);

export const selectIsFinished = createSelector(
  [
    selectAnswers,
    selectRemainingChoices,
    (state) => state.doReview as boolean,
  ],
  (answers, remainingChoices, doReview) => {
    return answers.length && (doReview || !remainingChoices.length);
  }
);