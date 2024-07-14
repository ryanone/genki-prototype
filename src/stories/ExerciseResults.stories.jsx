import ExerciseResults from '@/components/ExerciseResults';
import { fn } from '@storybook/test';

export const ExerciseResultsActionsData = {
  onRestart: fn(),
};

export default {
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

export const Default = {
  args: {
    numSolved: 20,
    numWrong: 2,
    timeElapsed: 60,
  },
};
