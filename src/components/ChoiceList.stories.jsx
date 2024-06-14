import ChoiceList from './ChoiceList';
import { fn } from '@storybook/test';

const choices = [
  {
    id: '0',
    content: 'Lorem ipsum dolor sit amet'
  },
  {
    id: '1',
    content: 'Mauris at feugiat mauris'
  },
  {
    id: '2',
    content: 'Vestibulum eleifend neque'
  },
  {
    id: '3',
    content: 'Quisque arcu odio'
  },
]

export const ChoiceListActionsData = {
  onChoiceSelect: fn(),
}

export default {
  component: ChoiceList,
  title: 'ChoiceList',
  tags: ['autodocs'],
  excludeStories: /.*Data$/,
  args: {
    ...ChoiceListActionsData
  },
  decorators: [
    (Story) => (
      <div style={{ width: '25vw' }}>
        <Story />
      </div>
    ),
  ],
};

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