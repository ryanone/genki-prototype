import { createVar, style } from '@vanilla-extract/css';

export const contentMinWidth = createVar();

export const verticalDropTargetListClass = style({
  display: 'flex',
  flexBasis: 'max-content',
  flexDirection: 'column',
  gap: 8,
  vars: {
    [contentMinWidth]: '125px',
  },
});
