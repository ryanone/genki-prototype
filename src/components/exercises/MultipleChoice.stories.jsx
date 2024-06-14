import MultipleChoiceExercise from './MultipleChoice';
import Genki3Exercise01 from '../../data/exercises/genki-3/hiragana-1.json';

export default {
  component: MultipleChoiceExercise,
  title: 'Multiple Choice Exercise',
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

const data = { ...Genki3Exercise01 };

export const Default = {
  args: {
    data,
  }
};
