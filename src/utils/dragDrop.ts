import type { DragDropFlow, Exercise } from '@/data/exercise';

export type LayoutConfiguration = {
  canSupportMultipleLayouts: boolean;
  dropTargetLayout: DragDropFlow;
  instructions: string|undefined;
  isHorizontal: boolean;
  maxTrackLen: number;
  questionsFlow: DragDropFlow;
  questionsTrackConfig: number[]|undefined;
  questionsStyles: Record<string, string>;
  randomizeQuestions: boolean;
}

const HORIZONTAL = 'HORIZONTAL';

interface LC2Horizontal extends LC2Base {
  layout: 'HORIZONTAL';
  maxTrackLen: number;
  dropTargetLayout: DragDropFlow;
  questionsFlow: DragDropFlow;
  questionsTrackConfig?: number[];
}

interface LC2Vertical extends LC2Base {
  layout: 'VERTICAL';
}

type LC2Base = {
  canSupportMultipleLayouts: boolean;
  instructions: string;
  randomizeQuestions: boolean;
  questionsStyles: Record<string, string>;
}

type LC2 = LC2Horizontal|LC2Vertical;

const BASE_HORIZONTAL_CONFIG: Omit<LC2Horizontal, 'questionsStyles'> = {
  canSupportMultipleLayouts: false,
  instructions: '',
  randomizeQuestions: false,

  layout: HORIZONTAL,
  dropTargetLayout: HORIZONTAL,
  questionsFlow: HORIZONTAL,
  maxTrackLen: Number.MIN_VALUE,
};

const BASE_VERTICAL_CONFIG: Omit<LC2Vertical, 'questionsStyles'> = {
  canSupportMultipleLayouts: false,
  instructions: '',
  randomizeQuestions: false,

  layout: 'VERTICAL',
}

export function createLayoutConfiguration2(data: Exercise, layout?: DragDropFlow): LC2 {
  const meta = data.meta?.DRAG_DROP;
  const questionsStyles: Record<string, string> = {};
  let config: LC2Base = {
    canSupportMultipleLayouts: (meta?.supportedLayouts?.length ?? 1) > 1,
    instructions: meta?.instructions ?? '',
    randomizeQuestions: meta?.randomizeQuestions ?? false,
    questionsStyles,
  };
  if (layout === HORIZONTAL || !layout) {
    config = {
      ...config,
      ...BASE_HORIZONTAL_CONFIG,
      dropTargetLayout: meta?.HORIZONTAL?.questionLayout ?? 'VERTICAL',
      questionsFlow: meta?.HORIZONTAL?.questionsFlow ?? 'HORIZONTAL',
    } as LC2Horizontal;


  } else {
    config = {
      ...config,
      ...BASE_VERTICAL_CONFIG,
    };
  }
  return config as LC2;
}

export function createLayoutConfiguration(data: Exercise): LayoutConfiguration {
  /*
  Get the supported layouts
  If 1 or more
    Set to the first element (horizontal by default)
  Else
    Set the layout to HORIZONTAL

  If horizontal
    Set display: grid
    Get flow value and set grid-auto-flow
    Get num cols by checking configuration.length
    Get num rows by getting max value in configuration
    Questions should be rendered based on questionLayout value
  If vertical
    Set display: flex, flex-direction: column
    Render items
    Questions should be rendered in horizontal mode
  */
  const questionsStyles: Record<string, string> = {};
  const meta = data.meta?.DRAG_DROP;
  let canSupportMultipleLayouts = false;
  let randomizeQuestions = false;
  let isHorizontal = false;
  let dropTargetLayout: DragDropFlow = HORIZONTAL;
  let questionsFlow: DragDropFlow = HORIZONTAL;
  let maxTrackLen = Number.MIN_VALUE;
  let questionsTrackConfig: number[]|undefined;
  let crossAxisLen: number|undefined;
  let instructions: string|undefined;
  if (meta) {
    randomizeQuestions = !!meta.randomizeQuestions;
    if (meta.supportedLayouts?.length >= 1) {
      isHorizontal = meta.supportedLayouts[0] === HORIZONTAL;
      canSupportMultipleLayouts = meta.supportedLayouts?.length > 1;
    }
    if (isHorizontal && meta.HORIZONTAL) {
      dropTargetLayout = meta.HORIZONTAL.questionLayout ?? 'VERTICAL';
      questionsFlow = meta.HORIZONTAL.questionsFlow ?? HORIZONTAL;
      if (meta.HORIZONTAL.configuration) {
        if (Array.isArray(meta.HORIZONTAL.configuration)) {
          questionsTrackConfig = meta.HORIZONTAL.configuration;
          maxTrackLen = Math.max(...questionsTrackConfig);
          crossAxisLen = questionsTrackConfig.length;
        } else if (Number.isInteger(meta.HORIZONTAL.configuration)) {
          crossAxisLen = meta.HORIZONTAL.configuration;
        }
      }
    }
    instructions = meta.instructions;
  }
  if (questionsFlow === HORIZONTAL) {
    questionsStyles['--grid-auto-flow'] = 'row';
    if (crossAxisLen) {
      questionsStyles['gridTemplateColumns'] = `repeat(${crossAxisLen}, 1fr)`;
    }
  } else {
    questionsStyles['--grid-auto-flow'] = 'column';
    if (crossAxisLen) {
      questionsStyles['gridTemplateColumns'] = `repeat(${crossAxisLen}, max-content)`;
    }
    if (maxTrackLen > 0) {
      questionsStyles['gridTemplateRows'] = `repeat(${maxTrackLen}, max-content)`;
    }
  }

  return {
    canSupportMultipleLayouts,
    dropTargetLayout,
    instructions,
    isHorizontal,
    maxTrackLen,
    questionsFlow,
    questionsTrackConfig,
    questionsStyles,
    randomizeQuestions
  };
}