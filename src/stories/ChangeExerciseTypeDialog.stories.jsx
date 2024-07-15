import { fn } from '@storybook/test';
import ChangeExerciseTypeDialog from '@/components/ChangeExerciseTypeDialog';
import Genki3Exercise01 from '@/data/genki-3/exercises/hiragana-0.json';
import Genki3Lesson0 from '@/data/genki-3/lessons/lesson-0.json';

export const ChangeExerciseTypeDialogActionsData = {
  onRenderModeChoose: fn(),
};

const exercise = {
  ...Genki3Exercise01,
  title: Genki3Lesson0.sections.flatMap((s) => s.exercises).find((e) => e.id === 'hiragana-0')?.title ?? '',
};

export default {
  component: ChangeExerciseTypeDialog,
  title: 'Change Exercise Type Dialog',
  tags: ['autodocs'],
  excludeStories: /.*Data$/,
  args: {
    ...ChangeExerciseTypeDialogActionsData,
    isOpen: false,
  },
};

export const DefaultOpen = {
  args: {
    exercise,
    isOpen: true,
  },
};
