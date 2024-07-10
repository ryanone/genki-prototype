import Footer from '@/components/Footer';
import ThemeProvider from '@/provider/ThemeProvider';

export default {
  component: Footer,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    )
  ],
  title: 'Footer',
  tags: ['autodocs'],
  excludeStories: /.*Data$/,
  args: {},
};


export const Default = {
  args: { },
};