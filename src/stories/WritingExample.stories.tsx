import type { ComponentProps } from 'react';
import type { Meta } from '@storybook/react';
import WritingExample from '@/components/WritingExample';

type WritingExamplePropsAndCustomArgs = ComponentProps<typeof WritingExample>;

const meta: Meta<WritingExamplePropsAndCustomArgs> = {
  component: WritingExample,
  title: 'Writing Example',
  tags: ['autodocs'],
  excludeStories: /.*Data$/,
  args: {},
  decorators: [
    (Story) => (
      <div style={{ width: '25vw' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

export const Default = {
  args: {
    content: 'あ',
  },
};

export const WithAlt = {
  args: {
    alt: 'おんがく',
    content: '音楽',
    showAlt: true,
  },
};
