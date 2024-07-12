import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { selectIsFinished as selectIsFinishedDraft, selectRemainingChoices as selectRemainingChoicesDraft, selectResults as selectResultsDraft } from '@/features/dragDrop/selectors';
import { randomizeArray } from '@/utils/randomize';
import type { Choice, Exercise, Question } from '@/data/exercise';

export type Answer = {
  question: Question;
  selectedChoiceId?: string;
  numIncorrectGuesses?: number;
  result?: 'CORRECT'|'INCORRECT';
}

export type DragDropState = {
  answers: Answer[];
  choices: Record<string, Choice>;
  doReview: boolean;
  startTime: number;
}

type InitializePayload = {
  exercise: Exercise;
};

type SelectChoicePayload = {
  choiceId: string;
  questionId: string;
}

const initialState: DragDropState = {
  answers: [],
  choices: {},
  doReview: false,
  startTime: Date.now(),
}

export const dragDropSlice = createSlice({
  name: 'dragDrop',
  initialState,
  reducers: {
    chooseChoice(state, action: PayloadAction<SelectChoicePayload>) {
      const { choiceId, questionId } = action.payload;
      const answer = state.answers?.find(a => a.question.content === questionId);
      if (answer) {
        // Mark the corresponding answer with the selected choice.
        // If all answers have been filled, create results
        answer.selectedChoiceId = choiceId;
        answer.result = answer.selectedChoiceId === answer.question.choices.correctId ?
          'CORRECT' : 'INCORRECT';
        if (answer.result === 'INCORRECT') {
          answer.numIncorrectGuesses = answer.numIncorrectGuesses === undefined ? 1 : answer.numIncorrectGuesses + 1;
        }
      }
    },
    initialize(state, action: PayloadAction<InitializePayload>) {
      const { exercise } = action.payload;
      const randomizeQuestions = !!exercise.meta.DRAG_DROP?.randomizeQuestions;
      const answers = (randomizeQuestions ?
        randomizeArray(exercise.questions) as Question[] :
        exercise.questions
      ).map(question => ({ question }));
      state.answers = answers;
      state.choices = randomizeArray(exercise.choices).reduce(
        (acc, choice) => {
          acc[choice.id] = choice;
          return acc;
        },
        {} as Record<string, Choice>
      );
      state.doReview = false;
      state.startTime = Date.now();
    },
    fillRemainingAnswers(state) {
      // This is dispatched when user wants to see the answers without completing the exercise.
      // For each answer...
      //   If no choice is selected, fill it in, but with no result
      //   If choice is incorrect, select correct choice, and clear out the result and num of incorrect guesses
      state.answers?.forEach(a => {
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
  },
  selectors: {
    selectIsFinished: selectIsFinishedDraft,
    selectRemainingChoices: selectRemainingChoicesDraft,
    selectResults: selectResultsDraft,
  }
});

export const { chooseChoice, initialize, fillRemainingAnswers } = dragDropSlice.actions;
export const { selectIsFinished, selectRemainingChoices, selectResults } = dragDropSlice.selectors;
export default dragDropSlice.reducer;