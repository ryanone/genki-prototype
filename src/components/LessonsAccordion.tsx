import Accordion from '@/components/Accordion';
import LessonDetail from '@/components/LessonDetail';
import { type Lesson } from '@/data/lesson';
import styles from './LessonsAccordion.module.css';

type LessonsAccordionProps = {
  bookId: string;
  lessons: Lesson[];
  viewMode: 'COMPACT'|'DETAILED';
};

export default function LessonsAccordion({ bookId, lessons, viewMode }: LessonsAccordionProps) {
  const headerClass = viewMode === 'DETAILED' ? styles.detailedHeader : styles.compactHeader;
  const sections = lessons.map(l => {
    return {
      id: l.id,
      title: (<div className={headerClass}>{l.title}: {l.description}</div>),
      content: (<div><LessonDetail bookId={bookId} lessonId={l.id} viewMode={viewMode}/></div>),
    }
  });
  const options = {
    allowMultipleExpanded: true,
  }
  return (
    <Accordion sections={sections} options={options}/>
  );
}