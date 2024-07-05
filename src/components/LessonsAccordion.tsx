import { type Lesson } from '@/data/lesson';
import Accordion from '@/components/Accordion';

type LessonsAccordionProps = {
  data: Lesson[];
};

export default function LessonsAccordion({ data }: LessonsAccordionProps) {
  const sections = data.map(d => {
    return {
      id: d.id,
      title: (<div>{d.title}: {d.description}</div>),
      content: (<div>Hello</div>),
    }
  });
  const options = {
    allowMultipleExpanded: true,
  }
  return (
    <Accordion sections={sections} options={options}/>
  );
}