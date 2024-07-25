import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import initializeState from '@/utils/writingPractice';
import selectResultsDraft from '@/features/writingPractice/selectors';
import type {
  Choice,
  WritingPracticeExercise,
  WritingPracticeMeta,
} from '@/data/exercise';

export type WritingInputResult = 'CORRECT' | 'INCORRECT';

type Answer = {
  content?: string;
  result?: WritingInputResult;
};

type Row = {
  answers: Answer[];
  choice: Choice;
};

export type WritingPracticeState = {
  initialized: boolean;
  isFinished: boolean;
  meta?: WritingPracticeMeta;
  rows: Row[];
  startTime: number;
};

const initialState: WritingPracticeState = {
  initialized: false,
  isFinished: false,
  rows: [],
  startTime: 0,
};

type InitializePayload = {
  exercise: WritingPracticeExercise;
};

type SetAnswerPayload = {
  choiceId: string;
  column: number;
  value: string;
};

export const writingPracticeSlice = createSlice({
  name: 'writingPractice',
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
      state.rows.forEach((row) => {
        row.answers = row.answers.map(() => ({}));
      });
      state.startTime = Date.now();
    },
    review(state) {
      state.rows.forEach((row) => {
        const choiceContent = row.choice.content;
        row.answers.forEach((answer) => {
          answer.result =
            answer.content === choiceContent ? 'CORRECT' : 'INCORRECT';
        });
      });
      state.isFinished = true;
    },
    setAnswer(state, action: PayloadAction<SetAnswerPayload>) {
      const { choiceId, column, value } = action.payload;
      const row = state.rows.find((r) => r.choice.id === choiceId);
      if (row) {
        row.answers[column].content = value;
      }
    },
  },
  selectors: {
    selectResults: selectResultsDraft,
  },
});

export const { initialize, reset, restart, review, setAnswer } =
  writingPracticeSlice.actions;

export const { selectResults } = writingPracticeSlice.selectors;

export default writingPracticeSlice.reducer;
