import { assignInlineVars } from '@vanilla-extract/dynamic';
import type {
  DragDropExercise,
  DragDropMeta,
  Question,
  TwoDirectionalFlow,
} from '@/data/exercise';
import { gridAutoFlowVar } from '@/components/HorizontalDropTargetList.css';
import type { DragDropState } from '@/features/dragDrop/slice';
import { randomizeArray } from '@/utils/randomize';

const HORIZONTAL = 'HORIZONTAL';

type LayoutConfigurationBase = {
  canSupportMultipleLayouts: boolean;
  instructions: string;
  randomizeQuestions: boolean;
};

export interface LayoutConfigurationHorizontal extends LayoutConfigurationBase {
  dropTargetLayout: TwoDirectionalFlow;
  layout: 'HORIZONTAL';
  maxTrackLen: number;
  questionsFlow: TwoDirectionalFlow;
  questionsStyles: Record<string, CSSStyleValue>;
  questionsTrackConfig?: number[];
}

export interface LayoutConfigurationVertical extends LayoutConfigurationBase {
  layout: 'VERTICAL';
}

export type LayoutConfiguration =
  | LayoutConfigurationHorizontal
  | LayoutConfigurationVertical;

const BASE_HORIZONTAL_CONFIG = {
  canSupportMultipleLayouts: false,
  instructions: '',
  randomizeQuestions: false,

  layout: HORIZONTAL,
  dropTargetLayout: HORIZONTAL,
  questionsFlow: HORIZONTAL,
  questionsStyles: {},
  maxTrackLen: Number.MIN_VALUE,
};

const BASE_VERTICAL_CONFIG = {
  canSupportMultipleLayouts: false,
  instructions: '',
  randomizeQuestions: false,

  layout: 'VERTICAL',
};

export function createLayoutConfiguration(
  meta: DragDropMeta,
  layout?: TwoDirectionalFlow,
): LayoutConfiguration {
  const config: LayoutConfigurationBase = {
    canSupportMultipleLayouts: (meta?.supportedLayouts?.length ?? 1) > 1,
    instructions: meta?.instructions ?? '',
    randomizeQuestions: meta?.randomizeQuestions ?? false,
  };

  if (layout === HORIZONTAL || !layout) {
    const horizontalConfig = {
      ...BASE_HORIZONTAL_CONFIG,
      ...config,
      dropTargetLayout: meta?.HORIZONTAL?.questionLayout ?? 'VERTICAL',
      questionsFlow: meta?.HORIZONTAL?.questionsFlow ?? 'HORIZONTAL',
    } as LayoutConfigurationHorizontal;

    let questionsStyles: Record<string, CSSStyleValue> = {};
    let maxTrackLen = Number.MIN_VALUE;
    let crossAxisLen: number | undefined;
    if (meta?.HORIZONTAL?.configuration) {
      if (Array.isArray(meta.HORIZONTAL.configuration)) {
        const questionsTrackConfig = meta.HORIZONTAL.configuration;
        horizontalConfig.questionsTrackConfig = questionsTrackConfig;
        maxTrackLen = Math.max(...questionsTrackConfig);
        crossAxisLen = questionsTrackConfig.length;
      } else if (Number.isInteger(meta.HORIZONTAL.configuration)) {
        crossAxisLen = meta.HORIZONTAL.configuration;
      }
    }

    if (horizontalConfig.questionsFlow === HORIZONTAL) {
      questionsStyles = assignInlineVars({
        [gridAutoFlowVar]: 'row',
      });
      if (crossAxisLen) {
        questionsStyles.gridTemplateColumns = `repeat(${crossAxisLen}, 1fr)`;
      }
    } else {
      questionsStyles = assignInlineVars({
        [gridAutoFlowVar]: 'column',
      });
      if (crossAxisLen) {
        questionsStyles.gridTemplateColumns = `repeat(${crossAxisLen}, max-content)`;
      }
      if (maxTrackLen > 0) {
        questionsStyles.gridTemplateRows = `repeat(${maxTrackLen}, max-content)`;
      }
    }

    horizontalConfig.maxTrackLen = maxTrackLen;
    horizontalConfig.questionsStyles = questionsStyles;
    return horizontalConfig;
  }

  return {
    ...BASE_VERTICAL_CONFIG,
    ...config,
  } as LayoutConfiguration;
}

export function initializeState(exercise: DragDropExercise): DragDropState {
  const meta = exercise.meta.DRAG_DROP;
  const randomizeQuestions = !!meta?.randomizeQuestions;
  return {
    meta,
    answers: (randomizeQuestions
      ? (randomizeArray(exercise.questions) as Question[])
      : exercise.questions
    ).map((question) => ({ question })),
    choices: randomizeArray(exercise.choices),
    doReview: false,
    startTime: Date.now(),
    layout: meta.supportedLayouts[0] ?? 'HORIZONTAL',
    initialized: true,
  };
}
