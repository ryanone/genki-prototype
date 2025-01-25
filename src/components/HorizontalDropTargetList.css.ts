import { createVar, fallbackVar, style } from '@vanilla-extract/css';

export const gridAutoFlowVar = createVar();

export const horizontalDropTargetListClass = style({
  display: 'grid',
  gap: 12,
  gridAutoFlow: fallbackVar(gridAutoFlowVar, 'column'),
  justifyContent: 'center',
});
