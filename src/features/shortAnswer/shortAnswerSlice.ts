import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import initializeState from '@/utils/shortAnswer';
import {
  selectItems as selectItemsDraft,
  selectItemByQuestionId as selectItemByQuestionIdDraft,
  selectResults as selectResultsDraft,
} from '@/features/shortAnswer/selectors';
import type {
  Choice,
  Question,
  ShortAnswerExercise,
  ShortAnswerMeta,
} from '@/data/exercise';

export type ShortAnswerResult = 'CORRECT' | 'INCORRECT';

export type Item = {
  correctChoiceContent?: string;
  question: Question;
  result?: ShortAnswerResult;
  userAnswer?: string;
  width?: number;
};

export type ShortAnswerState = {
  correctChoices: Record<string, Choice>;
  initialized: boolean;
  isFinished: boolean;
  items: Item[];
  meta?: ShortAnswerMeta;
  startTime: number;
};

type InitializePayload = {
  exercise: ShortAnswerExercise;
};

type SetAnswerPayload = {
  answer: string;
  questionId: string;
};

const initialState: ShortAnswerState = {
  correctChoices: {},
  initialized: false,
  isFinished: false,
  items: [],
  startTime: Date.now(),
};

export const shortAnswerSlice = createSlice({
  name: 'shortAnswer',
  initialState,
  reducers: {
    initialize(state, action: PayloadAction<InitializePayload>) {
      const initial = initializeState(action.payload.exercise);
      state.correctChoices = initial.correctChoices;
      state.initialized = initial.initialized;
      state.isFinished = false;
      state.items = initial.items;
      state.meta = initial.meta;
      state.startTime = initial.startTime;
    },
    reset() {
      return { ...initialState };
    },
    restart(state) {
      state.items.forEach((i) => {
        i.result = undefined;
        i.userAnswer = undefined;
      });
      state.isFinished = false;
    },
    review(state) {
      state.items.forEach((i) => {
        const correctChoice =
          state.correctChoices[i.question.choices.correctId]!;
        i.correctChoiceContent = correctChoice.content;
        i.result =
          i.userAnswer === correctChoice.content ? 'CORRECT' : 'INCORRECT';
      });
      state.isFinished = true;
    },
    setAnswer(state, action: PayloadAction<SetAnswerPayload>) {
      const item = state.items.find(
        (i) => i.question.id! === action.payload.questionId,
      )!;
      item.userAnswer = action.payload.answer;
    },
  },
  selectors: {
    selectItemByQuestionId: selectItemByQuestionIdDraft,
    selectItems: selectItemsDraft,
    selectResults: selectResultsDraft,
  },
});

export const { initialize, reset, restart, review, setAnswer } =
  shortAnswerSlice.actions;
export const { selectItemByQuestionId, selectItems, selectResults } =
  shortAnswerSlice.selectors;

export default shortAnswerSlice.reducer;
