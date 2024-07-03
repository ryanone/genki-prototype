import Accordion from '@/components/Accordion';

export default {
  component: Accordion,
  title: 'Acccordion',
  tags: ['autodocs'],
  excludeStories: /.*Data$/,
  args: {
  },
};

export const Default = {
  args: {
    sections: [
      {
        id: 'html',
        title: 'HTML',
        content:
          'The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser.',
      },
      {
        id: 'css',
        title: 'CSS',
        content:
          'Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML.',
      },
      {
        id: 'javascript',
        title: 'JavaScript',
        content:
          'JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS.',
      },
    ]
  },
};
