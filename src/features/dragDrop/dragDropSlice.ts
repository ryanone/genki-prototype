import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
  selectChoicesMap as selectChoicesMapDraft,
  selectIsFinished as selectIsFinishedDraft,
  selectLayoutConfiguration as selectLayoutConfigurationDraft,
  selectRemainingChoices as selectRemainingChoicesDraft,
  selectResults as selectResultsDraft,
} from '@/features/dragDrop/selectors';
import { randomizeArray } from '@/utils/randomize';
import type {
  Choice,
  DragDropExercise,
  DragDropFlow,
  DragDropMeta,
  Question,
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
  layout?: DragDropFlow;
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
    initialize(state, action: PayloadAction<InitializePayload>) {
      const { exercise } = action.payload;
      const randomizeQuestions = !!exercise.meta.DRAG_DROP?.randomizeQuestions;
      const answers = (
        randomizeQuestions
          ? (randomizeArray(exercise.questions) as Question[])
          : exercise.questions
      ).map((question) => ({ question }));
      state.answers = answers;
      state.choices = exercise.choices;
      state.doReview = false;
      state.startTime = Date.now();
      state.meta = exercise.meta.DRAG_DROP;
      state.layout =
        exercise.meta.DRAG_DROP?.supportedLayouts[0] ?? 'HORIZONTAL';
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

export const { chooseChoice, initialize, fillRemainingAnswers, toggleLayout } =
  dragDropSlice.actions;
export const {
  selectChoicesMap,
  selectIsFinished,
  selectLayoutConfiguration,
  selectRemainingChoices,
  selectResults,
} = dragDropSlice.selectors;
export default dragDropSlice.reducer;
