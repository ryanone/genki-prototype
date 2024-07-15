import { withRouter } from 'storybook-addon-remix-react-router';
import Genki3 from '@/data/genki-3/index.json';
import LessonsNavigation from '@/components/LessonsNavigation';

export default {
  component: LessonsNavigation,
  title: 'Lessons Navigation',
  tags: ['autodocs'],
  excludeStories: /.*Data$/,
  args: {},
  decorators: [
    withRouter,
    (Story) => (
      <div style={{ height: '75vh' }}>
        <Story />
      </div>
    ),
  ],
};

const defaultArgs = {
  bookId: Genki3.id,
  lessons: Genki3.lessons,
  viewMode: 'COMPACT',
};

export const Default = {
  args: { ...defaultArgs },
};
