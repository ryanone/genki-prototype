import { ComponentProps } from 'react';
import type { Meta } from '@storybook/react';
import AnswerList from '@/components/AnswerList';

type AnswerListPropsAndCustomArgs = ComponentProps<typeof AnswerList>;

const meta: Meta<AnswerListPropsAndCustomArgs> = {
  component: AnswerList,
  title: 'Answer List',
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

const data = [
  {
    question: {
      content: 'wa',
    },
    choices: [
      {
        id: '0',
        content: 'わ',
        result: 'SELECTED_CORRECT',
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
  },
  {
    question: {
      content: 'mi',
    },
    choices: [
      {
        id: '0',
        content: 'わ',
      },
      {
        id: '1',
        content: 'み',
        result: 'UNSELECTED_CORRECT',
      },
      {
        id: '2',
        content: 'へ',
        result: 'INCORRECT',
      },
      {
        id: '3',
        content: 'ふ',
      },
    ],
  },
];

export const Default = {
  args: {
    data,
  },
};
