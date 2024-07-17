export type Choice = {
  content: string;
  id: string;
};

type Meta = {
  DRAG_DROP?: DragDropMeta;
  MULTIPLE_CHOICE?: MultipleChoiceMeta;
};

export type DragDropFlow = 'HORIZONTAL' | 'VERTICAL';

interface BaseMeta {
  instructions: string;
  randomizeQuestions?: boolean;
}

export interface DragDropMeta extends BaseMeta {
  HORIZONTAL?: {
    configuration?: number | number[];
    questionLayout: DragDropFlow;
    questionsFlow: DragDropFlow;
  };
  supportedLayouts: DragDropFlow[];
}

interface MultipleChoiceMeta extends BaseMeta {}

export type Question = {
  choices: {
    correctId: string;
  };
  content: string;
};

export type RenderMode = 'DRAG_DROP' | 'MULTIPLE_CHOICE';

export type BaseExercise = {
  choices: Choice[];
  meta: Meta;
  questions: Question[];
  supportedRenderModes: RenderMode[];
  title: string;
};

export interface DragDropExercise extends BaseExercise {
  meta: {
    DRAG_DROP: DragDropMeta;
  };
}

export interface MultipleChoiceExercise extends BaseExercise {
  meta: {
    MULTIPLE_CHOICE: MultipleChoiceMeta;
  };
}

export type Exercise = DragDropExercise | MultipleChoiceExercise;

export type Results = {
  numSolved: number;
  numWrong: number;
  timeElapsed?: number;
};
