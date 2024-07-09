import ExercisesSection from '@/components/ExercisesSection';
import Genki3Lesson0 from '@/data/genki-3/lessons/lesson-0.json';
import { withRouter } from 'storybook-addon-remix-react-router';

export default {
  component: ExercisesSection,
  decorators: [ withRouter ],
  title: 'Exercises Section',
  tags: ['autodocs'],
  excludeStories: /.*Data$/,
  args: {},
};

const defaultArgs = {
  bookId: 'genki-3',
  lessonId: 'lesson-0',
  section: Genki3Lesson0.sections[0],
}

export const Default = {
  args: { ...defaultArgs },
};