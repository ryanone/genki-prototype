import { ComponentProps } from 'react';
import type { Meta } from '@storybook/react';
import Footer from '@/components/Footer';
import ThemeProvider from '@/provider/ThemeProvider';

type FooterPropsAndCustomArgs = ComponentProps<typeof Footer>;

const meta: Meta<FooterPropsAndCustomArgs> = {
  component: Footer,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  title: 'Footer',
  tags: ['autodocs'],
  excludeStories: /.*Data$/,
  args: {},
};

export default meta;

export const Default = {
  args: {},
};
