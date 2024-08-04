import type { ComponentProps } from 'react';
import type { Meta } from '@storybook/react';
import { fn } from '@storybook/test';
import MultipleChoiceQuestion from '@/components/MultipleChoiceQuestion';

type MultipleChoiceQuestionPropsAndCustomArgs = ComponentProps<
  typeof MultipleChoiceQuestion
>;

export const MultipleChoiceQuestionActionsData = {
  onChoiceSelect: fn(),
};

const meta: Meta<MultipleChoiceQuestionPropsAndCustomArgs> = {
  component: MultipleChoiceQuestion,
  title: 'Multiple Choice Question',
  tags: ['autodocs'],
  excludeStories: /.*Data$/,
  args: {
    ...MultipleChoiceQuestionActionsData,
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

const data = {
  questionContent: 'wa',
  choices: [
    {
      id: '0',
      content: 'わ',
    },
    {
      id: '1',
      content: 'み',
    },
    {
      id: '2',
      content: 'へ',
    },
    {
      id: '3',
      content: 'ふ',
    },
  ],
};

export const Default = {
  args: {
    ...data,
    index: 0,
  },
};
