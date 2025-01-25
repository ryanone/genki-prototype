import { useId, useState, type ReactNode } from 'react';
import * as styles from './Accordion.css';

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
      if (!options?.allowMultipleExpanded) {
        newOpenSections.clear();
      }
      newOpenSections.add(id);
    }
    setOpenSections(newOpenSections);
  };

  return (
    <div className={styles.accordionClass}>
      {sections.map(({ id, title, content }) => {
        const buttonId = `${accordionId}-button-${id}`;
        const panelId = `${accordionId}-panel-${id}`;
        const isExpanded = openSections.has(id);
        return (
          <div className={styles.itemClass} key={id}>
            <button
              className={styles.titleClass}
              id={buttonId}
              aria-controls={panelId}
              aria-expanded={isExpanded}
              type="button"
              data-testid="accordion-button"
              onClick={() => handleTitleClick(id)}
            >
              <span className={styles.titleContentClass}>{title}</span>
              <span
                aria-hidden
                className={[
                  styles.iconClass,
                  isExpanded && styles.iconRotatedClass,
                ]
                  .filter(Boolean)
                  .join(' ')}
              />
            </button>
            <div
              className={styles.contentClass}
              id={panelId}
              hidden={!isExpanded}
              aria-labelledby={buttonId}
              data-testid="accordion-content"
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
