import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import initializeState from '@/utils/fillChart';
import {
  selectItemsMap as selectItemsMapDraft,
  selectResults as selectResultsDraft,
} from '@/features/fillChart/selectors';
import type {
  Choice,
  FillChartExercise,
  FillChartMeta,
  Question,
} from '@/data/exercise';

type Answer = {
  content?: string | undefined;
  result?: 'CORRECT' | 'INCORRECT' | undefined;
};

export type Item = {
  answer: Answer;
  correctChoice: Choice;
  question: Question;
};

export type FillChartState = {
  initialized: boolean;
  isFinished: boolean;
  items: Item[];
  meta?: FillChartMeta;
  startTime: number;
};

const initialState: FillChartState = {
  initialized: false,
  isFinished: false,
  items: [],
  startTime: 0,
};

type InitializePayload = {
  exercise: FillChartExercise;
};

type SetAnswerPayload = {
  answerValue: string;
  questionContent: string;
};

export const fillChartSlice = createSlice({
  name: 'fillChart',
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
      state.items.forEach((item) => {
        item.answer = {};
      });
      state.startTime = Date.now();
    },
    review(state) {
      state.items.forEach((item) => {
        item.answer.result =
          item.answer.content === item.question.content
            ? 'CORRECT'
            : 'INCORRECT';
      });
      state.isFinished = true;
    },
    setAnswer(state, action: PayloadAction<SetAnswerPayload>) {
      const item = state.items.find(
        (i) => i.correctChoice.content === action.payload.questionContent,
      )!;
      item.answer.content = action.payload.answerValue;
    },
  },
  selectors: {
    selectItemsMap: selectItemsMapDraft,
    selectResults: selectResultsDraft,
  },
});

export const { initialize, reset, restart, review, setAnswer } =
  fillChartSlice.actions;

export const { selectItemsMap, selectResults } = fillChartSlice.selectors;

export default fillChartSlice.reducer;
