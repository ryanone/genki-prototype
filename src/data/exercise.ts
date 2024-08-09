export type Choice = {
  content: string;
  id: string;
};

export type TwoDirectionalFlow = 'HORIZONTAL' | 'VERTICAL';

interface BaseMeta {
  instructions: string;
}

interface ShortAnswerConfigurationValue {
  width: number;
}
export interface DragDropMeta extends BaseMeta {
  HORIZONTAL?: {
    configuration?: number | number[];
    questionLayout: TwoDirectionalFlow;
    questionsFlow: TwoDirectionalFlow;
  };
  randomizeQuestions?: boolean;
  supportedLayouts: TwoDirectionalFlow[];
}

export interface FillChartMeta extends BaseMeta {
  configuration: string[][];
  flow: TwoDirectionalFlow;
}

export interface MultipleChoiceMeta extends BaseMeta {
  randomizeQuestions?: boolean;
}

export interface ShortAnswerMeta extends BaseMeta {
  configuration?: Record<string, ShortAnswerConfigurationValue>;
}

export interface WritingPracticeMeta extends BaseMeta {
  numExamples: number;
  numRepetitions: number;
}

type Meta = {
  DRAG_DROP?: DragDropMeta;
  FILL_CHART?: FillChartMeta;
  MULTIPLE_CHOICE?: MultipleChoiceMeta;
  SHORT_ANSWER?: ShortAnswerMeta;
  WRITING_PRACTICE?: WritingPracticeMeta;
};

export type Question = {
  alt?: string | undefined;
  choices: {
    correctId: string;
    suggestions?: string[];
  };
  content: string;
  id?: string;
};

export type ExerciseType =
  | 'DRAG_DROP'
  | 'FILL_CHART'
  | 'MULTIPLE_CHOICE'
  | 'SHORT_ANSWER'
  | 'WRITING_PRACTICE';

export type BaseExercise = {
  choices: Choice[];
  meta: Meta;
  questions: Question[];
  title: string;
  types: ExerciseType[];
};

export interface DragDropExercise extends BaseExercise {
  meta: {
    DRAG_DROP: DragDropMeta;
  };
}

export interface FillChartExercise extends BaseExercise {
  meta: {
    FILL_CHART: FillChartMeta;
  };
}

export interface MultipleChoiceExercise extends BaseExercise {
  meta: {
    MULTIPLE_CHOICE: MultipleChoiceMeta;
  };
}

export interface ShortAnswerExercise extends BaseExercise {
  meta: {
    SHORT_ANSWER: ShortAnswerMeta;
  };
}

export interface WritingPracticeExercise extends BaseExercise {
  meta: {
    WRITING_PRACTICE: WritingPracticeMeta;
  };
}

export type Exercise =
  | DragDropExercise
  | FillChartExercise
  | MultipleChoiceExercise
  | ShortAnswerExercise
  | WritingPracticeExercise;

export type Results = {
  numSolved: number;
  numWrong: number;
  timeElapsed?: number;
};
