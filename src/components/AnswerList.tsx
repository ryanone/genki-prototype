import { useContext } from 'react';
import MultipleChoiceQuestion from '@/components/MultipleChoiceQuestion';
import Ruby from '@/components/Ruby';
import ShowFuriganaContext from '@/context/ShowFuriganaContext';
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
  const { showFurigana } = useContext(ShowFuriganaContext);

  return (
    <div className={styles.answerList}>
      {data.map((item, i) => (
        <MultipleChoiceQuestion
          key={item.question.content}
          index={i}
          questionContent={
            <Ruby
              showAlt={showFurigana}
              content={item.question.content}
              alt={item.question.alt}
            />
          }
          choices={item.choices}
          isDisabled
        />
      ))}
    </div>
  );
}
