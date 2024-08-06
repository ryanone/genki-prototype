import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { generateRandomChoices, randomizeArray } from '@/utils/randomize';
import {
  selectCurrentAnswer as selectCurrentAnswerDraft,
  selectIsFinished as selectIsFinishedDraft,
  selectResults as selectResultsDraft,
} from '@/features/multipleChoice/selectors';
import initializeState from '@/utils/multipleChoice';
import type {
  Choice,
  MultipleChoiceExercise,
  MultipleChoiceMeta,
  Question,
} from '@/data/exercise';
import type { MultipleChoiceQuestionFeedback } from '@/context/MultipleChoiceSettingsContext';

export interface ChoiceData extends Choice {
  result?: 'SELECTED_CORRECT' | 'UNSELECTED_CORRECT' | 'INCORRECT' | undefined;
}

export type Answer = {
  choices?: ChoiceData[];
  question: Question;
};

export type MultipleChoiceState = {
  answers: Answer[];
  choices: Choice[];
  index: number;
  initialized: boolean;
  isQuestionFinished: boolean;
  meta?: MultipleChoiceMeta;
  questionFeedback: MultipleChoiceQuestionFeedback;
  startTime: number;
};

type ChangeQuestionFeedbackPayload = {
  questionFeedback: MultipleChoiceQuestionFeedback;
};

type InitializePayload = {
  exercise: MultipleChoiceExercise;
  questionFeedback?: MultipleChoiceQuestionFeedback;
};

type SelectChoicePayload = {
  choiceId: string;
};

const initialState: MultipleChoiceState = {
  answers: [],
  choices: [],
  index: 0,
  initialized: false,
  isQuestionFinished: false,
  questionFeedback: 'INSTANT',
  startTime: Date.now(),
};

export const NUM_CHOICES_PER_QUESTION = 4;

function updateStateToNextQuestion(state: MultipleChoiceState) {
  state.index += 1;
  if (state.answers.length && state.index < state.answers.length) {
    state.answers[state.index].choices = generateRandomChoices(
      state.answers[state.index].question,
      state.choices,
      NUM_CHOICES_PER_QUESTION,
    );
    state.isQuestionFinished = false;
  }
}

export const multipleChoiceSlice = createSlice({
  name: 'multipleChoice',
  initialState,
  reducers: {
    changeQuestionFeedback(
      state,
      action: PayloadAction<ChangeQuestionFeedbackPayload>,
    ) {
      state.questionFeedback = action.payload.questionFeedback;
    },
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
      if (state.questionFeedback === 'AT_END') {
        updateStateToNextQuestion(state);
      } else {
        // if state.questionFeedback === 'INSTANT'
        state.isQuestionFinished = true;
      }
    },
    goToNextQuestion(state) {
      updateStateToNextQuestion(state);
    },
    initialize(state, action: PayloadAction<InitializePayload>) {
      const initial = initializeState(action.payload.exercise);
      state.answers = initial.answers;
      state.choices = initial.choices;
      state.isQuestionFinished = initial.isQuestionFinished;
      state.index = initial.index;
      state.initialized = initial.initialized;
      state.meta = initial.meta;
      state.questionFeedback = initial.questionFeedback;
      state.startTime = initial.startTime;
      if (action.payload.questionFeedback) {
        state.questionFeedback = action.payload.questionFeedback;
      }
    },
    reset() {
      return { ...initialState };
    },
    restart(state) {
      const randomizeQuestions = !!state.meta?.randomizeQuestions;
      state.isQuestionFinished = false;
      state.answers = (
        randomizeQuestions ? randomizeArray(state.answers) : state.answers
      ).map((a) => {
        delete a.choices;
        return a;
      });

      // Generate choices for first question
      state.index = -1;
      updateStateToNextQuestion(state);
    },
  },
  selectors: {
    selectCurrentAnswer: selectCurrentAnswerDraft,
    selectIsFinished: selectIsFinishedDraft,
    selectResults: selectResultsDraft,
  },
});

export const {
  changeQuestionFeedback,
  chooseChoice,
  goToNextQuestion,
  initialize,
  reset,
  restart,
} = multipleChoiceSlice.actions;
export const { selectCurrentAnswer, selectIsFinished, selectResults } =
  multipleChoiceSlice.selectors;

export default multipleChoiceSlice.reducer;
