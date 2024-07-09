import ExerciseLink from '@/components/ExerciseLink';
import Genki3Lesson0 from '@/data/genki-3/lessons/lesson-0.json';
import { withRouter } from 'storybook-addon-remix-react-router';

export default {
  component: ExerciseLink,
  decorators: [ withRouter ],
  title: 'Exercise Link',
  tags: ['autodocs'],
  excludeStories: /.*Data$/,
}

const defaultArgs = {
  bookId: 'genki-3',
  lessonId: 'lesson-0',
  exercise: Genki3Lesson0.sections[0].exercises[0]
};

export const Default = {
  args: { ...defaultArgs },
}