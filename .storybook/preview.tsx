import React from 'react';
import type { Preview } from '@storybook/react';
import ThemeDecorator from '../src/stories/decorators/Theme';
import '../src/index.css';

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeDecorator>
        <Story />
      </ThemeDecorator>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  tags: ['autodocs', 'autodocs'],
};

export default preview;
