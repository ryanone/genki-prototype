type Choice = {
  content: string;
  id: string;
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
