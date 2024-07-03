import { useId, useState, type ReactNode } from 'react';
import styles from './Accordion.module.css';

type AccordionSection = {
  id: string;
  content: ReactNode;
  title: ReactNode;
}

type AccordionProps = {
  sections: AccordionSection[];
}

export default function Accordion({ sections }: AccordionProps) {
  const accordionId = useId();
  const [openSections, setOpenSections] = useState(
    new Set(),
  );
  const handleTitleClick = (id: string) => {
    setOpenSections(os => {
      os.has(id) ? os.delete(id) : os.add(id);
      return new Set(os);
    });
  }

  return (
    <div className={styles.accordion}>
      {
        sections.map(({ id, title, content }) => {
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
                {title}
                <span
                  aria-hidden={true}
                  className={[
                    styles.icon,
                    isExpanded && styles.iconRotated,
                  ]
                    .filter(Boolean)
                    .join(' ')}
                ></span>
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
          )
        })
      }
    </div>
  )
}