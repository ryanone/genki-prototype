import { createVar, style } from '@vanilla-extract/css';
import { primaryButtonClass } from '@/styles/common.css';
import { themeVars } from '@/styles/theme.css';

export const numColumnsVar = createVar();
export const numRowsVar = createVar();
export const questionsFlowVar = createVar();

export const writingChoiceClass = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
});

export const actionsClass = style({
  display: 'flex',
  gap: 12,
  justifyContent: 'center',
});

export const answersClass = style({
  display: 'grid',
  gap: 16,
  gridAutoFlow: questionsFlowVar,
  gridTemplateColumns: `repeat(var${numColumnsVar}, 1fr)`,
  gridTemplateRows: `repeat(var${numRowsVar}, 1fr)`,
  marginBlockEnd: 28,
});

export const checkAnswersButtonClass = style([
  primaryButtonClass,
  {
    alignItems: 'center',
    display: 'flex',
    gap: 6,
    marginBlockStart: 20,
    marginInline: 'auto',
  },
]);

export const contentClass = style({
  backgroundColor: themeVars.color.background3,
  padding: 16,
});
