import Accordion from '@/components/Accordion';
import LessonDetail from '@/components/LessonDetail';
import { type Lesson } from '@/data/lesson';
import styles from './LessonsAccordion.module.css';

type LessonsAccordionProps = {
  bookId: string;
  lessons: Lesson[];
  viewMode: 'COMPACT' | 'DETAILED';
};

export default function LessonsAccordion({ bookId, lessons, viewMode }: LessonsAccordionProps) {
  const isViewModeDetailed = viewMode === 'DETAILED';
  const headerClass = isViewModeDetailed ? styles.detailedHeader : styles.compactHeader;
  const sections = lessons.map((l) => {
    const title = isViewModeDetailed ? (<>{l.title}: {l.description}</>) : (<>{l.title}</>);
    return {
      id: l.id,
      title: (<div className={headerClass}>{title}</div>),
      content: (<LessonDetail bookId={bookId} lessonId={l.id} viewMode={viewMode}/>),
    };
  });
  const options = {
    allowMultipleExpanded: true,
  };
  return (
    <Accordion sections={sections} options={options}/>
  );
}
