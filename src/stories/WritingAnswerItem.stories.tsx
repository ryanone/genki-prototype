import { fn } from '@storybook/test';
import type { ComponentProps } from 'react';
import type { Meta } from '@storybook/react';
import WritingAnswerItem from '@/components/WritingAnswerItem';

export const WritingAnswerItemActionsData = {
  onAnswerChange: fn(),
};

type WritingAnswerItemPropsAndCustomArgs = ComponentProps<
  typeof WritingAnswerItem
>;

const meta: Meta<WritingAnswerItemPropsAndCustomArgs> = {
  component: WritingAnswerItem,
  title: 'Writing Answer Item',
  tags: ['autodocs'],
  excludeStories: /.*Data$/,
  args: {
    ...WritingAnswerItemActionsData,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '25vw' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

const data = {
  question: {
    choices: {
      correctId: '100',
    },
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    id: '1',
  },
};

const index = 1;

export const Default = {
  args: {
    data,
    index,
  },
};
