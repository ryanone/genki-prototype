export type Choice = {
  content: string;
  id: string;
};

type Meta = {
  DRAG_DROP?: DragDropMeta;
  MULTIPLE_CHOICE?: MultipleChoiceMeta;
}

export type DragDropFlow = 'HORIZONTAL'|'VERTICAL';
type DragDropLayouts = DragDropFlow|'BOTH';

interface BaseMeta {
  instructions: string;
  randomizeQuestions?: boolean;
}

interface DragDropMeta extends BaseMeta {
  supportedLayouts: DragDropLayouts[];
  HORIZONTAL?: {
    questionsFlow: DragDropFlow;
    questionLayout: DragDropFlow;
    configuration?: number[];
  }
}

interface MultipleChoiceMeta extends BaseMeta {

}

export type Question = {
  content: string;
  choices: {
    correctId: string;
  };
}

export type RenderMode = 'DRAG_DROP'|'MULTIPLE_CHOICE';

export type Exercise = {
  title: string;
  choices: Choice[];
  questions: Question[];
  supportedRenderModes: RenderMode[];
  meta: Meta;
}

export type Results = {
  numWrong: number;
  numSolved: number;
  timeElapsed?: number;
}