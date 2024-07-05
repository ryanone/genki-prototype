import Genki3 from '@/data/genki-3/index.json';
import LessonsAccordion from '@/components/LessonsAccordion';
import { withRouter } from 'storybook-addon-remix-react-router';

export default {
  component: LessonsAccordion,
  decorators: [ withRouter ],
  title: 'Lesson Accordion',
  tags: ['autodocs'],
  excludeStories: /.*Data$/,
  args: {},
};

const defaultArgs = {
  bookId: Genki3.id,
  lessons: Genki3.lessons,
  viewMode: 'DETAILED',
}

export const Default = {
  args: { ...defaultArgs },
};