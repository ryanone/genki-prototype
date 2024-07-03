import Timer from '../components/Timer';

export default {
  component: Timer,
  title: 'Timer',
  tags: ['autodocs'],
  excludeStories: /.*Data$/,
  args: {},
};

export const Default = {
  args: {
    isRunning: false,
  },
};

export const Running = {
  args: {
    isRunning: true,
  },
};
