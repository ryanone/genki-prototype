import type { ComponentProps } from 'react';
import type { Meta } from '@storybook/react';
import Genki3WordMatch20 from '@/data/genki-3/exercises/word-match-2-0.json';
import WritingChoicesList from '@/components/WritingChoicesList';

type WritingChociesListPropsAndCustomArgs = ComponentProps<
  typeof WritingChoicesList
>;

const meta: Meta<WritingChociesListPropsAndCustomArgs> = {
  component: WritingChoicesList,
  title: 'Writing Choices List',
  tags: ['autodocs'],
  excludeStories: /.*Data$/,
  args: {},
  decorators: [
    (Story) => (
      <div style={{ width: '100vw' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

export const Default = {
  args: {
    choices: Genki3WordMatch20.choices,
  },
};
