import { fn } from '@storybook/test';
import type { ComponentProps } from 'react';
import type { Meta } from '@storybook/react';
import type { Question } from '@/data/exercise';
import WritingChoiceItem from '@/components/WritingChoiceItem';

export const WritingChoiceItemActionsData = {
  onChoiceChange: fn(),
};

type WritingChoiceItemPropsAndCustomArgs = ComponentProps<
  typeof WritingChoiceItem
>;

const meta: Meta<WritingChoiceItemPropsAndCustomArgs> = {
  component: WritingChoiceItem,
  title: 'Writing Choice Item',
  tags: ['autodocs'],
  excludeStories: /.*Data$/,
  args: {
    ...WritingChoiceItemActionsData,
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

const question: Question = {
  choices: {
    correctId: '100',
  },
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing eli',
  id: 'a',
};

export const Default = {
  args: {
    question,
    index: 1,
  },
};
