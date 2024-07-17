import { ComponentProps } from 'react';
import type { Meta } from '@storybook/react';
import MultipleChoiceExercise from '@/components/exercises/MultipleChoice';
import Genki3Exercise01 from '@/data/genki-3/exercises/hiragana-0.json';

type MultipleChoiceExercisePropsAndCustomArgs = ComponentProps<
  typeof MultipleChoiceExercise
>;

const meta: Meta<MultipleChoiceExercisePropsAndCustomArgs> = {
  component: MultipleChoiceExercise,
  title: 'Multiple Choice Exercise',
  tags: ['autodocs'],
  excludeStories: /.*Data$/,
  args: {},
  decorators: [
    (Story) => (
      <div style={{ width: '50vw' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

const data = { ...Genki3Exercise01 };

export const Default = {
  args: {
    data,
  },
};
