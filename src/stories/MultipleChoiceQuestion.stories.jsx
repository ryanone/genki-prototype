import MultipleChoiceQuestion from '../components/MultipleChoiceQuestion';
import { fn } from '@storybook/test';

export const MultipleChoiceQuestionActionsData = {
  onChoiceSelect: fn()
}

export default {
  component: MultipleChoiceQuestion,
  title: 'Multiple Choice Question',
  tags: ['autodocs'],
  excludeStories: /.*Data$/,
  args: {
    ...MultipleChoiceQuestionActionsData
  },
  decorators: [
    (Story) => (
      <div style={{ width: '50vw' }}>
        <Story />
      </div>
    ),
  ],
};

const data = {
  question: {
    content: 'wa',
    choices: {
      correctId: '0',
      suggestions: [
        '1',
        '2',
        '3',
      ]
    }
  },
  choices: [
    {
      id: '0',
      content: 'わ'
    },
    {
      id: '1',
      content: 'み'
    },
    {
      id: '2',
      content: 'へ'
    },
    {
      id: '3',
      content: 'ふ'
    },
  ],
}

export const Default = {
  args: {
    ...data,
    index: 0,
  }
};
