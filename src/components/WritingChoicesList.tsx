import { type Choice } from '@/data/exercise';
import * as styles from './WritingChoicesList.css';

type WritingChoicesListProps = {
  choices: Choice[];
};

export default function WritingChoicesList({
  choices,
}: WritingChoicesListProps) {
  return (
    <div className={styles.writingChoicesListClass}>
      {choices.map((c) => (
        <div key={c.id} className={styles.choiceClass}>
          ({c.id}) {c.content}
        </div>
      ))}
    </div>
  );
}
