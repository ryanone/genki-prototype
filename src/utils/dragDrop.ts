import type { DragDropFlow, Exercise } from '@/data/exercise';

type LayoutConfiguration = {
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
        questionsTrackConfig = [...meta.HORIZONTAL.configuration];
        questionsTrackConfig.forEach(val => maxTrackLen = Math.max(maxTrackLen, val));
        crossAxisLen = questionsTrackConfig.length;
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
      questionsStyles['gridTemplateColumns'] = `repeat(${crossAxisLen}, min-content)`;
    }
    if (maxTrackLen > 0) {
      questionsStyles['gridTemplateRows'] = `repeat(${maxTrackLen}, min-content)`;
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