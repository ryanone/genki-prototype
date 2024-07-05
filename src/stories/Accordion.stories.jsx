import Accordion from '@/components/Accordion';

export default {
  component: Accordion,
  title: 'Acccordion',
  tags: ['autodocs'],
  excludeStories: /.*Data$/,
  args: {
  },
};

const sections = [
  {
    id: 'html',
    title: 'HTML',
    content:
      (<div>The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser.</div>),
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
];

export const Default = {
  args: {
    sections,
  },
};

export const AllowMultipleExpanded = {
  args: {
    sections,
    options: {
      allowMultipleExpanded: true,
    },
  },
};


export const DefaultExpanded = {
  args: {
    sections: sections.map(s => ({ ...s, defaultExpanded: true, }))
  },
};