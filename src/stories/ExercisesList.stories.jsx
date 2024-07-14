import ExercisesList from '@/components/ExercisesList';
import Genki3Lesson0 from '@/data/genki-3/lessons/lesson-0.json';
import { withRouter } from 'storybook-addon-remix-react-router';

export default {
  component: ExercisesList,
  decorators: [withRouter],
  title: 'Exercises List',
  tags: ['autodocs'],
  excludeStories: /.*Data$/,
  args: {},
};

const defaultArgs = {
  bookId: 'genki-3',
  lessonId: 'lesson-0',
  exercises: Genki3Lesson0.sections.flatMap((s) => s.exercises),
};

export const Default = {
  args: { ...defaultArgs },
};
