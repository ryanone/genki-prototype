import ChoiceButton from './ChoiceButton';
import { fn } from '@storybook/test';

export const ChoiceButtonActionsData = {
  onClick: fn(),
};

export default {
  component: ChoiceButton,
  title: 'ChoiceButton',
  tags: ['autodocs'],
  excludeStories: /.*Data$/,
  args: {
    ...ChoiceButtonActionsData
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', width: '25vw' }}>
        <Story />
      </div>
    ),
  ],
};

const choice = {
  content: 'あそこにレストランがあります。',
  id: '0',
};

export const Default = {
  args: {
    data: {
      ...choice,
    },
  },
};

export const Disabled = {
  args: {
    data: {
      ...choice,
    },
    isDisabled: true,
  },
};

export const SelectedCorrect = {
  args: {
    data: {
      ...choice,
      result: 'SELECTED_CORRECT',
    },
  },
};

export const UnselectedCorrect = {
  args: {
    data: {
      ...choice,
      result: 'UNSELECTED_CORRECT',
    },
  },
};

export const Incorrect = {
  args: {
    data: {
      ...choice,
      result: 'INCORRECT',
    },
  },
};
