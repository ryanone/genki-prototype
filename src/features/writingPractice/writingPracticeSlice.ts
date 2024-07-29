import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import initializeState from '@/utils/writingPractice';
import selectResultsDraft from '@/features/writingPractice/selectors';
import type {
  Question,
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
  // choice: Choice;
  question: Question;
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
  column: number;
  // choiceId: string;
  questionContent: string;
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
        const questionContent = row.question.content;
        row.answers.forEach((answer) => {
          answer.result =
            answer.content === questionContent ? 'CORRECT' : 'INCORRECT';
        });
      });
      state.isFinished = true;
    },
    setAnswer(state, action: PayloadAction<SetAnswerPayload>) {
      const { questionContent, column, value } = action.payload;
      const row = state.rows.find(
        (r) => r.question.content === questionContent,
      )!;
      row.answers[column].content = value;
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
