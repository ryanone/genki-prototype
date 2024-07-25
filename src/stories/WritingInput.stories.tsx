import { fn } from '@storybook/test';
import type { ComponentProps } from 'react';
import type { Meta } from '@storybook/react';
import WritingInput from '@/components/WritingInput';

export const WritingInputActionsData = {
  onChange: fn(),
};

type WritingInputPropsAndCustomArgs = ComponentProps<typeof WritingInput>;

const meta: Meta<WritingInputPropsAndCustomArgs> = {
  component: WritingInput,
  title: 'Writing Input',
  tags: ['autodocs'],
  excludeStories: /.*Data$/,
  args: {
    ...WritingInputActionsData,
  },
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
    index: 0,
  },
};
