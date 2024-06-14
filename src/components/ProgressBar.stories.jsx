import ProgressBar from './ProgressBar';

export default {
  component: ProgressBar,
  title: 'ProgressBar',
  tags: ['autodocs'],
  excludeStories: /.*Data$/,
  args: {},
};

export const Zero = {
  args: {
    current: 0,
    total: 10,
  },
};

export const Half = {
  args: {
    current: 5,
    total: 10,
  },
};

export const Full = {
  args: {
    current: 10,
    total: 10,
  },
};