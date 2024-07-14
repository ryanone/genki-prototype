import { createLayoutConfiguration } from '@/utils/dragDrop';
import { createSelector } from '@reduxjs/toolkit';
import { randomizeArray } from '@/utils/randomize';
import type { Answer, DragDropState } from '@/features/dragDrop/dragDropSlice';
import type { DragDropMeta } from '@/data/exercise';

const selectAnswers = (state: DragDropState) => state.answers as Answer[];

export const selectChoicesMap = createSelector(
  [
    (state: DragDropState) => state.choices,
  ],
  (choices) => new Map(randomizeArray(choices).map((c) => [c.id, c])),
);

export const selectLayoutConfiguration = createSelector(
  [
    (state: DragDropState) => state.meta,
    (state: DragDropState) => state.layout,
  ],
  (meta, layout) => {
    return meta ? createLayoutConfiguration(meta as DragDropMeta, layout) : undefined;
  },
);

export const selectRemainingChoices = createSelector(
  [
    selectAnswers,
    selectChoicesMap,
  ],
  (answers, choices) => {
    const correctChoiceIds = new Set(answers.filter((val) => val.selectedChoiceId && val.result === 'CORRECT').map((val) => val.selectedChoiceId));
    return Array.from(choices).filter(([id]) => !correctChoiceIds.has(id)).map(([, choice]) => choice);
  },
);

export const selectResults = createSelector(
  [
    selectAnswers,
    selectRemainingChoices,
  ],
  (answers, remainingChoices) => remainingChoices.length === 0
    ? {
      numSolved: answers.length,
      numWrong: answers.filter((a) => a.numIncorrectGuesses).length,
    }
    : null,
);

export const selectIsFinished = createSelector(
  [
    selectAnswers,
    selectRemainingChoices,
    (state) => state.doReview as boolean,
  ],
  (answers, remainingChoices, doReview) => {
    return answers.length && (doReview || !remainingChoices.length);
  },
);
