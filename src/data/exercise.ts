export type Choice = {
  content: string;
  id: string;
};

type Meta = {
  DRAG_DROP?: DragDropMeta;
}

export type DragDropFlow = 'HORIZONTAL'|'VERTICAL';
type DragDropLayouts = DragDropFlow|'BOTH';

type DragDropMeta = {
  supportedLayouts: DragDropLayouts[];
  HORIZONTAL?: {
    questionsFlow: DragDropFlow;
    questionFlow: DragDropFlow;
    configuration: number[];
  }
}

export type Question = {
  content: string;
  choices: {
    correctId: string;
  };
}

type RenderMode = 'DRAG_DROP'|'MULTIPLE_CHOICE';

export type Exercise = {
  choices: Choice[];
  questions: Question[];
  supportedRenderModes: RenderMode[];
  meta?: Meta;
}
