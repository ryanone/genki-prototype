import MultipleChoiceQuestion from '@/components/MultipleChoiceQuestion';
import type {
  Answer,
  ChoiceData,
} from '@/features/multipleChoice/multipleChoiceSlice';
import type { Question } from '@/data/exercise';
import styles from './AnswerList.module.css';

export interface FilledAnswer extends Answer {
  choices: ChoiceData[];
  question: Question;
}

type AnswerListProps = {
  data: FilledAnswer[];
};

export default function AnswerList({ data }: AnswerListProps) {
  return (
    <div className={styles.answerList}>
      {data.map((item, i) => (
        <MultipleChoiceQuestion
          key={item.question.content}
          index={i}
          question={item.question}
          choices={item.choices}
          isDisabled
        />
      ))}
    </div>
  );
}
