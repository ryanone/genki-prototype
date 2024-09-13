import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
  selectAnswers as selectAnswersDraft,
  selectResults as selectResultsDraft,
} from '@/features/writingChoice/selectors';
import initializeState from '@/utils/writingChoice';
import type {
  Choice,
  Question,
  WritingChoiceExercise,
  WritingChoiceMeta,
} from '@/data/exercise';

export type WritingChoiceResult = 'CORRECT' | 'INCORRECT';

type Answer = {
  answerContent?: string;
  question: Question;
  result?: WritingChoiceResult;
  selectedChoiceId?: string;
};

export type WritingChoiceState = {
  answers: Answer[];
  choices: Choice[];
  initialized: boolean;
  isFinished: boolean;
  meta?: WritingChoiceMeta;
  startTime: number;
};

type InitializePayload = {
  exercise: WritingChoiceExercise;
};

type SetAnswerPayload = {
  answer: string;
  question: Question;
};

const initialState: WritingChoiceState = {
  answers: [],
  choices: [],
  initialized: false,
  isFinished: false,
  startTime: 0,
};

export const writingChoiceSlice = createSlice({
  name: 'writingChoice',
  initialState,
  reducers: {
    initialize(_, action: PayloadAction<InitializePayload>) {
      return initializeState(action.payload.exercise);
    },
    reset() {
      return { ...initialState };
    },
    restart(state) {
      state.isFinished = false;
      state.answers.forEach((a) => {
        delete a.answerContent;
        delete a.result;
        delete a.selectedChoiceId;
      });
      state.startTime = Date.now();
    },
    review(state) {
      state.isFinished = true;
      state.answers.forEach((a) => {
        a.result =
          a.selectedChoiceId === a.question.choices.correctId
            ? 'CORRECT'
            : 'INCORRECT';
        if (a.result === 'INCORRECT') {
          a.answerContent = state.choices.find(
            (c) => c.id === a.question.choices.correctId,
          )!.id;
        }
      });
    },
    setAnswer(state, action: PayloadAction<SetAnswerPayload>) {
      const answer = state.answers.find(
        (a) => a.question.content === action.payload.question.content,
      )!;
      answer.selectedChoiceId = action.payload.answer;
    },
  },
  selectors: {
    selectAnswers: selectAnswersDraft,
    selectResults: selectResultsDraft,
  },
});

export const { initialize, reset, restart, review, setAnswer } =
  writingChoiceSlice.actions;
export const { selectAnswers, selectResults } = writingChoiceSlice.selectors;

export default writingChoiceSlice.reducer;
