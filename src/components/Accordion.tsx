import { useId, useState, type ReactNode } from 'react';
import styles from './Accordion.module.css';

type AccordionSection = {
  content: ReactNode;
  defaultExpanded?: boolean;
  id: string;
  title: ReactNode;
};

type AccordionOptions = {
  allowMultipleExpanded: boolean;
};

type AccordionProps = {
  options?: AccordionOptions;
  sections: AccordionSection[];
};

export default function Accordion({ sections, options }: AccordionProps) {
  const accordionId = useId();
  const [openSections, setOpenSections] = useState(
    new Set(
      sections.filter((s) => s.defaultExpanded === true).map((s) => s.id),
    ),
  );
  const handleTitleClick = (id: string) => {
    const newOpenSections = new Set(openSections);
    if (newOpenSections.has(id)) {
      newOpenSections.delete(id);
    } else {
      if (options?.allowMultipleExpanded) {
        newOpenSections.clear();
      }
      newOpenSections.add(id);
    }
    setOpenSections(newOpenSections);
  };

  return (
    <div className={styles.accordion}>
      {sections.map(({ id, title, content }) => {
        const buttonId = `${accordionId}-button-${id}`;
        const panelId = `${accordionId}-panel-${id}`;
        const isExpanded = openSections.has(id);
        return (
          <div className={styles.item} key={id}>
            <button
              className={styles.title}
              id={buttonId}
              aria-controls={panelId}
              aria-expanded={isExpanded}
              type="button"
              onClick={() => handleTitleClick(id)}
            >
              <span className={styles.titleContent}>{title}</span>
              <span
                aria-hidden
                className={[styles.icon, isExpanded && styles.iconRotated]
                  .filter(Boolean)
                  .join(' ')}
              />
            </button>
            <div
              className={styles.content}
              id={panelId}
              hidden={!isExpanded}
              aria-labelledby={buttonId}
              role="region"
            >
              {content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
