type Choice = {
  content: string;
};

type Meta = {
  DRAG_DROP?: DragDropMeta;
}

type DragDropLayouts = 'HORIZONTAL'|'VERTICAL'|'BOTH';
type DragDropFlow = 'COLUMN'|'ROW';

type DragDropMeta = {
  supportedLayouts: DragDropLayouts[];
  HORIZONTAL?: {
    flow: DragDropFlow;
    configuration: number[];
  }
}

type Question = {
  content: string;
  choices: {
    correct: number;
  };
}

type RenderMode = 'DRAG_DROP'|'MULTIPLE_CHOICE';

export type Exercise = {
  choices: Choice[];
  questions: Question[];
  supportedRenderModes: RenderMode[];
  meta?: Meta;
}
