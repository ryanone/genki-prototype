import MultipleChoiceQuestion from '@/components/MultipleChoiceQuestion';
import type { ChoiceItem } from '@/components/ChoiceButton';
import type { Question } from '@/data/exercise';
import styles from './AnswerList.module.css';

export type QuestionAnswer = {
  choices: ChoiceItem[];
  question: Question;
};

type AnswerListProps = {
  data: QuestionAnswer[];
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
