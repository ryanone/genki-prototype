import { ComponentProps } from 'react';
import type { Meta } from '@storybook/react';
import { fn } from '@storybook/test';
import ExerciseResults from '@/components/ExerciseResults';

type ExerciseResultsPropsAndCustomArgs = ComponentProps<typeof ExerciseResults>;

export const ExerciseResultsActionsData = {
  onRestart: fn(),
};

const meta: Meta<ExerciseResultsPropsAndCustomArgs> = {
  component: ExerciseResults,
  title: 'Exercise Results',
  tags: ['autodocs'],
  excludeStories: /.*Data$/,
  args: {
    ...ExerciseResultsActionsData,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '50vw' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

export const Default = {
  args: {
    numSolved: 20,
    numWrong: 2,
    timeElapsed: 60,
  },
};
