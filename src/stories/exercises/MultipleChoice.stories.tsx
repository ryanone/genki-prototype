import { ComponentProps, type ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import MultipleChoiceExercise from '@/components/exercises/MultipleChoice';
import Genki3Exercise01 from '@/data/genki-3/exercises/hiragana-0.json';
import { setupStore } from '@/app/store';
import type { MultipleChoiceQuestionFeedback } from '@/context/MultipleChoiceSettingsContext';
import type { MultipleChoiceExercise as MultipleChoiceExerciseType } from '@/data/exercise';
import initializeState from '@/utils/multipleChoice';

type MultipleChoiceExercisePropsAndCustomArgs = ComponentProps<
  typeof MultipleChoiceExercise
>;

type MockComponentProps = {
  children: ReactNode;
  questionFeedback: MultipleChoiceQuestionFeedback;
};

const data = {
  ...Genki3Exercise01,
  title: 'Hiragana (p. 20-21)',
} as MultipleChoiceExerciseType;

function MockRoot({ children, questionFeedback }: MockComponentProps) {
  return (
    <Provider
      store={setupStore({
        multipleChoice: {
          ...initializeState(data),
          questionFeedback,
        },
      })}
    >
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
};

export default meta;

type Story = StoryObj<typeof MultipleChoiceExercise>;

export const AtEndFeedback: Story = {
  args: {},
  decorators: [
    (Story) => (
      <MockRoot questionFeedback="AT_END">
        <Story />
      </MockRoot>
    ),
  ],
};

export const InstantFeedback: Story = {
  args: {},
  decorators: [
    (Story) => (
      <MockRoot questionFeedback="INSTANT">
        <Story />
      </MockRoot>
    ),
  ],
};
