import { withRouter } from 'storybook-addon-remix-react-router';
import LessonDetail from '@/components/LessonDetail';

export default {
  component: LessonDetail,
  decorators: [withRouter],
  title: 'Lesson Detail',
  tags: ['autodocs'],
  excludeStories: /.*Data$/,
  args: {},
};

const defaultArgs = {
  bookId: 'genki-3',
  lessonId: 'lesson-0',
  viewMode: 'DETAILED',
};

export const Default = {
  args: { ...defaultArgs },
};
