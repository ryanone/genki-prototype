import Footer from '@/components/Footer';
import { withRouter } from 'storybook-addon-remix-react-router';

export default {
  component: Footer,
  decorators: [ withRouter ],
  title: 'Footer',
  tags: ['autodocs'],
  excludeStories: /.*Data$/,
  args: {},
};


export const Default = {
  args: { },
};