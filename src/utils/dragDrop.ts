import type { DragDropFlow, DragDropMeta } from '@/data/exercise';

const HORIZONTAL = 'HORIZONTAL';

type LayoutConfigurationBase = {
  canSupportMultipleLayouts: boolean;
  instructions: string;
  randomizeQuestions: boolean;
};

export interface LayoutConfigurationHorizontal extends LayoutConfigurationBase {
  layout: 'HORIZONTAL';
  maxTrackLen: number;
  dropTargetLayout: DragDropFlow;
  questionsFlow: DragDropFlow;
  questionsStyles: Record<string, string>;
  questionsTrackConfig?: number[];
}

export interface LayoutConfigurationVertical extends LayoutConfigurationBase {
  layout: 'VERTICAL';
}

export type LayoutConfiguration = LayoutConfigurationHorizontal | LayoutConfigurationVertical;

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

export function createLayoutConfiguration(meta: DragDropMeta, layout?: DragDropFlow): LayoutConfiguration {
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

    const questionsStyles: Record<string, string> = {};
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
      questionsStyles['--grid-auto-flow'] = 'row';
      if (crossAxisLen) {
        questionsStyles.gridTemplateColumns = `repeat(${crossAxisLen}, 1fr)`;
      }
    } else {
      questionsStyles['--grid-auto-flow'] = 'column';
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
