import { ComponentProps } from 'react';
import type { Meta } from '@storybook/react';
import { fn } from '@storybook/test';
import ChoiceList from '@/components/ChoiceList';

type ChoiceListPropsAndCustomArgs = ComponentProps<typeof ChoiceList>;

const choices = [
  {
    id: '0',
    content: 'Lorem ipsum dolor sit amet',
  },
  {
    id: '1',
    content: 'Mauris at feugiat mauris',
  },
  {
    id: '2',
    content: 'Vestibulum eleifend neque',
  },
  {
    id: '3',
    content: 'Quisque arcu odio',
  },
];

export const ChoiceListActionsData = {
  onChoiceSelect: fn(),
};

const meta: Meta<ChoiceListPropsAndCustomArgs> = {
  component: ChoiceList,
  title: 'Choice List',
  tags: ['autodocs'],
  excludeStories: /.*Data$/,
  args: {
    ...ChoiceListActionsData,
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

export const Default = {
  args: {
    choices: [...choices],
  },
};

export const WithResults = {
  args: {
    choices: [
      {
        ...choices[0],
      },
      {
        ...choices[1],
        result: 'SELECTED_CORRECT',
      },
      {
        ...choices[2],
        result: 'UNSELECTED_CORRECT',
      },
      {
        ...choices[3],
        result: 'INCORRECT',
      },
    ],
  },
};
