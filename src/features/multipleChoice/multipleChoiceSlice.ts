import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
  selectCurrentAnswer as selectCurrentAnswerDraft,
  selectIsFinished as selectIsFinishedDraft,
  selectResults as selectResultsDraft,
} from '@/features/multipleChoice/selectors';
import type {
  Choice,
  MultipleChoiceExercise,
  MultipleChoiceMeta,
  Question,
} from '@/data/exercise';
import { generateRandomChoices, randomizeArray } from '@/utils/randomize';

export interface ChoiceData extends Choice {
  result?: 'SELECTED_CORRECT' | 'UNSELECTED_CORRECT' | 'INCORRECT' | undefined;
}

export type Answer = {
  choices?: ChoiceData[];
  question: Question;
};

export type MultipleChoiceState = {
  answers: Answer[];
  exercise?: MultipleChoiceExercise;
  index: number;
  isQuestionFinished: boolean;
  meta?: MultipleChoiceMeta;
  startTime: number;
};

type InitializePayload = {
  exercise: MultipleChoiceExercise;
};

type SelectChoicePayload = {
  choiceId: string;
};

const initialState: MultipleChoiceState = {
  answers: [],
  index: 0,
  isQuestionFinished: false,
  startTime: Date.now(),
};

const NUM_CHOICES_PER_QUESTION = 4;

export const multipleChoiceSlice = createSlice({
  name: 'multipleChoice',
  initialState,
  reducers: {
    chooseChoice(state, action: PayloadAction<SelectChoicePayload>) {
      const currentItem = state.answers[state.index];
      currentItem.choices?.forEach((choice) => {
        if (choice.id === action.payload.choiceId) {
          choice.result =
            choice.id === currentItem.question.choices.correctId
              ? 'SELECTED_CORRECT'
              : 'INCORRECT';
        } else if (choice.id === currentItem.question.choices.correctId) {
          choice.result = 'UNSELECTED_CORRECT';
        }
      });
      state.isQuestionFinished = true;
    },
    goToNextQuestion(state) {
      state.index += 1;
      if (state.exercise && state.index < state.answers.length) {
        state.answers[state.index].choices = generateRandomChoices(
          state.exercise,
          state.answers[state.index].question.content,
          NUM_CHOICES_PER_QUESTION,
        );
        state.isQuestionFinished = false;
      }
    },
    initialize(state, action: PayloadAction<InitializePayload>) {
      const { exercise } = action.payload;
      const randomizeQuestions =
        !!exercise.meta.MULTIPLE_CHOICE.randomizeQuestions;
      state.answers = (
        randomizeQuestions
          ? (randomizeArray(exercise.questions) as Question[])
          : exercise.questions
      ).map((question) => ({ question }));
      state.exercise = exercise;
      state.meta = exercise.meta.MULTIPLE_CHOICE;
      state.isQuestionFinished = false;

      // Generate choices for first question
      state.index = 0;
      state.answers[state.index].choices = generateRandomChoices(
        exercise,
        state.answers[state.index].question.content,
        NUM_CHOICES_PER_QUESTION,
      );
    },
  },
  selectors: {
    selectCurrentAnswer: selectCurrentAnswerDraft,
    selectIsFinished: selectIsFinishedDraft,
    selectResults: selectResultsDraft,
  },
});

export const { chooseChoice, goToNextQuestion, initialize } =
  multipleChoiceSlice.actions;
export const { selectCurrentAnswer, selectIsFinished, selectResults } =
  multipleChoiceSlice.selectors;

export default multipleChoiceSlice.reducer;
