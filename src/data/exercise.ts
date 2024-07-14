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
  supportedLayouts: DragDropFlow[];
  HORIZONTAL?: {
    questionsFlow: DragDropFlow;
    questionLayout: DragDropFlow;
    configuration?: number | number[];
  }
}

interface MultipleChoiceMeta extends BaseMeta {

}

export type Question = {
  content: string;
  choices: {
    correctId: string;
  };
};

export type RenderMode = 'DRAG_DROP' | 'MULTIPLE_CHOICE';

export type BaseExercise = {
  title: string;
  choices: Choice[];
  questions: Question[];
  supportedRenderModes: RenderMode[];
  meta: Meta;
};

export interface DragDropExercise extends BaseExercise {
  meta: {
    DRAG_DROP: DragDropMeta;
  }
}

export interface MultipleChoiceExercise extends BaseExercise {
  meta: {
    MULTIPLE_CHOICE: MultipleChoiceMeta;
  }
}

export type Exercise = DragDropExercise | MultipleChoiceExercise;

export type Results = {
  numWrong: number;
  numSolved: number;
  timeElapsed?: number;
};
