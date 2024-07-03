import ExerciseResults from '../components/ExerciseResults';
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
    ...ExerciseResultsActionsData
  },
  decorators: [
    (Story) => (
      <div style={{ width: '50vw' }}>
        <Story />
      </div>
    ),
  ],
};

const data = [
  [
    {
      id: '0',
      content: 'わ'
    },
    {
      id: '1',
      content: 'み',
      result: 'SELECTED_CORRECT'
    },
    {
      id: '2',
      content: 'へ'
    },
    {
      id: '3',
      content: 'ふ'
    },
  ],
  [
    {
      id: '0',
      content: 'わ'
    },
    {
      id: '1',
      content: 'み',
      result: 'INCORRECT'
    },
    {
      id: '2',
      content: 'へ'
    },
    {
      id: '3',
      content: 'ふ'
    },
  ],
  [
    {
      id: '0',
      content: 'わ'
    },
    {
      id: '1',
      content: 'み',
      result: 'INCORRECT'
    },
    {
      id: '2',
      content: 'へ'
    },
    {
      id: '3',
      content: 'ふ'
    },
  ],
  [
    {
      id: '0',
      content: 'わ'
    },
    {
      id: '1',
      content: 'み',
      result: 'SELECTED_CORRECT'
    },
    {
      id: '2',
      content: 'へ'
    },
    {
      id: '3',
      content: 'ふ'
    },
  ],
];

export const Default = {
  args: {
    answers: data,
    timeElapsed: 60,
  }
};
