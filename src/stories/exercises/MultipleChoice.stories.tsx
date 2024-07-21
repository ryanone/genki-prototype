import { ComponentProps, type ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import MultipleChoiceExercise from '@/components/exercises/MultipleChoice';
import Genki3Exercise01 from '@/data/genki-3/exercises/hiragana-0.json';
import { setupStore } from '@/app/store';
import type { MultipleChoiceExercise as MultipleChoiceExerciseType } from '@/data/exercise';
import initializeState from '@/utils/multipleChoice';

type MultipleChoiceExercisePropsAndCustomArgs = ComponentProps<
  typeof MultipleChoiceExercise
>;

type MockComponentProps = {
  children: ReactNode;
};

const data = {
  ...Genki3Exercise01,
  title: 'Hiragana (p. 20-21)',
} as MultipleChoiceExerciseType;

function MockRoot({ children }: MockComponentProps) {
  return (
    <Provider store={setupStore({ multipleChoice: initializeState(data) })}>
      {children}
    </Provider>
  );
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
        <Story />
      </MockRoot>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof MultipleChoiceExercise>;

export const Default: Story = {
  args: {},
};
