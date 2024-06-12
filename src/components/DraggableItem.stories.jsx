import DraggableItem from './DraggableItem';

export default {
  component: DraggableItem,
  title: 'DraggableItem',
  tags: ['autodocs'],
  excludeStories: /.*Data$/,
  args: {},
};

export const DefaultHiragana = {
  args: {
    val: {
      content: 'つ',
      id: "0"
    },
  },
};

export const DefaultEnglish = {
  args: {
    val: {
      content: 'graduate student',
      id: "0"
    },
  },
};