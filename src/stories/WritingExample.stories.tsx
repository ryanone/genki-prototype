import WritingExample from '@/components/WritingExample';

export default {
  component: WritingExample,
  title: 'Writing Example',
  tags: ['autodocs'],
  excludeStories: /.*Data$/,
  args: {},
};

export const Default = {
  args: {
    content: 'あ',
  },
};
