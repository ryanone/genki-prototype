import { ComponentProps, type ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import MultipleChoiceExercise from '@/components/exercises/MultipleChoice';
import Genki3Exercise01 from '@/data/genki-3/exercises/hiragana-0.json';
import { store } from '@/app/store';
import type { MultipleChoiceExercise as MultipleChoiceExerciseType } from '@/data/exercise';

type MultipleChoiceExercisePropsAndCustomArgs = ComponentProps<
  typeof MultipleChoiceExercise
>;

type MockRootProps = {
  children: ReactNode;
};

function MockRoot({ children }: MockRootProps) {
  return <Provider store={store}>{children}</Provider>;
}

const meta: Meta<MultipleChoiceExercisePropsAndCustomArgs> = {
  component: MultipleChoiceExercise,
  title: 'Multiple Choice Exercise',
  tags: ['autodocs'],
  excludeStories: /.*Data$/,
  args: {},
  decorators: [
    (Story) => (
      <MockRoot>
        <div style={{ width: '50vw' }}>
          <Story />
        </div>
      </MockRoot>
    ),
  ],
};

export default meta;

const data = {
  ...Genki3Exercise01,
  title: 'Hiragana (p. 20-21)',
} as MultipleChoiceExerciseType;

type Story = StoryObj<typeof MultipleChoiceExercise>;

export const Default: Story = {
  args: {
    data,
  },
};
