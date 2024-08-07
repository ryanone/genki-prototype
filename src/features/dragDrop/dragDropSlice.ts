import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
  selectChoicesMap as selectChoicesMapDraft,
  selectIsFinished as selectIsFinishedDraft,
  selectLayoutConfiguration as selectLayoutConfigurationDraft,
  selectRemainingChoices as selectRemainingChoicesDraft,
  selectResults as selectResultsDraft,
} from '@/features/dragDrop/selectors';
import { initializeState } from '@/utils/dragDrop';
import { randomizeArray } from '@/utils/randomize';
import type {
  Choice,
  DragDropExercise,
  DragDropMeta,
  Question,
  TwoDirectionalFlow,
} from '@/data/exercise';

export type Answer = {
  numIncorrectGuesses?: number;
  question: Question;
  result?: 'CORRECT' | 'INCORRECT';
  selectedChoiceId?: string;
};

export type DragDropState = {
  answers: Answer[];
  choices: Choice[];
  doReview: boolean;
  initialized: boolean;
  layout?: TwoDirectionalFlow;
  meta?: DragDropMeta;
  startTime: number;
};

type InitializePayload = {
  exercise: DragDropExercise;
};

type SelectChoicePayload = {
  choiceId: string;
  questionId: string;
};

const initialState: DragDropState = {
  answers: [],
  choices: [],
  doReview: false,
  initialized: false,
  startTime: Date.now(),
};

export const dragDropSlice = createSlice({
  name: 'dragDrop',
  initialState,
  reducers: {
    chooseChoice(state, action: PayloadAction<SelectChoicePayload>) {
      const { choiceId, questionId } = action.payload;
      const answer = state.answers?.find(
        (a) => a.question.content === questionId,
      );
      if (answer) {
        // Mark the corresponding answer with the selected choice.
        // If all answers have been filled, create results
        answer.selectedChoiceId = choiceId;
        answer.result =
          answer.selectedChoiceId === answer.question.choices.correctId
            ? 'CORRECT'
            : 'INCORRECT';
        if (answer.result === 'INCORRECT') {
          answer.numIncorrectGuesses =
            answer.numIncorrectGuesses === undefined
              ? 1
              : answer.numIncorrectGuesses + 1;
        }
      }
    },
    initialize(_, action: PayloadAction<InitializePayload>) {
      return initializeState(action.payload.exercise);
    },
    fillRemainingAnswers(state) {
      // This is dispatched when user wants to see the answers without completing the exercise.
      // For each answer...
      //   If no choice is selected, fill it in, but with no result
      //   If choice is incorrect, select correct choice, and clear out the result and num of incorrect guesses
      //   If choice is correct, clear out the number of incorrect guesses
      state.answers?.forEach((a) => {
        if (!a.result) {
          a.selectedChoiceId = a.question.choices.correctId;
        } else if (a.result === 'INCORRECT') {
          a.selectedChoiceId = a.question.choices.correctId;
          a.result = undefined;
          a.numIncorrectGuesses = undefined;
        } else if (a.result === 'CORRECT') {
          a.numIncorrectGuesses = undefined;
        }
      });
      state.doReview = true;
    },
    reset() {
      return { ...initialState };
    },
    restart(state) {
      const randomizeQuestions = !!state.meta?.randomizeQuestions;
      state.answers = (
        randomizeQuestions ? randomizeArray(state.answers) : state.answers
      ).map((a) => {
        delete a.result;
        delete a.selectedChoiceId;
        return a;
      });
      state.choices = randomizeArray(state.choices);

      state.doReview = false;
      state.startTime = Date.now();
    },
    toggleLayout(state) {
      state.layout = state.layout === 'VERTICAL' ? 'HORIZONTAL' : 'VERTICAL';
    },
  },
  selectors: {
    selectChoicesMap: selectChoicesMapDraft,
    selectIsFinished: selectIsFinishedDraft,
    selectLayoutConfiguration: selectLayoutConfigurationDraft,
    selectRemainingChoices: selectRemainingChoicesDraft,
    selectResults: selectResultsDraft,
  },
});

export const {
  chooseChoice,
  initialize,
  fillRemainingAnswers,
  reset,
  restart,
  toggleLayout,
} = dragDropSlice.actions;
export const {
  selectChoicesMap,
  selectIsFinished,
  selectLayoutConfiguration,
  selectRemainingChoices,
  selectResults,
} = dragDropSlice.selectors;
export default dragDropSlice.reducer;
