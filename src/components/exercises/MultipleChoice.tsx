import { generateRandomChoices, randomizeArray } from '@/utils/randomize';
import { useRef, useState } from 'react';
import MultipleChoiceQuestion from '@/components/MultipleChoiceQuestion';
import ProgressBar from '@/components/ProgressBar';
import Timer from '@/components/Timer';
import type { Exercise, Question } from '@/data/exercise';
import type { ChoiceItem } from '@/components/ChoiceButton';
import './MultipleChoice.css';

type MultipleChoiceProps = {
  data: Exercise;
}

const NUM_CHOICES_PER_QUESTION = 4;

export default function MultipleChoice({ data }: MultipleChoiceProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isQuestionFinished, setIsQuestionFinished] = useState(false);
  const questions = useRef(randomizeArray(data.questions) as Question[]);
  const currentQuestion = questions.current[currentIndex];
  const [currentChoices, setCurrentChoices] = useState(
    generateRandomChoices(data, currentQuestion.content, NUM_CHOICES_PER_QUESTION)
  );
  const [answers, setAnswers] = useState<ChoiceItem[][]>([]);
  const isExerciseFinished = currentIndex === questions.current.length;
  const handleChoiceSelect = (id: string) => {
    const currentChoicesUpdated: ChoiceItem[] = currentChoices.map(c => {
      if (c.id === id) {
        return {
          ...c,
          result: (c.id === currentQuestion.choices.correctId) ? 'SELECTED_CORRECT' : 'INCORRECT',
        };
      } else if (c.id === currentQuestion.choices.correctId) {
        return {
          ...c,
          result: 'UNSELECTED_CORRECT',
        };
      }
      return c;
    });
    setCurrentChoices(currentChoicesUpdated);
    setAnswers(a => [...a, currentChoicesUpdated]);
    setIsQuestionFinished(true);
  }
  const handleNextClick = () => {
    const nextIndex = currentIndex + 1;
    const nextQuestion = questions.current[nextIndex];
    setCurrentIndex(nextIndex);
    setCurrentChoices(generateRandomChoices(data, nextQuestion.content, NUM_CHOICES_PER_QUESTION));
    setIsQuestionFinished(false);
  }

  return (
    <div className="multiplechoice">
      <MultipleChoiceQuestion
        key={currentIndex}
        choices={currentChoices}
        index={currentIndex}
        isDisabled={isQuestionFinished}
        question={currentQuestion}
        onChoiceSelect={handleChoiceSelect}
      />
      <ProgressBar current={currentIndex + 1} total={data.questions.length}/>
      <Timer isRunning={!isExerciseFinished}/>
      <div className="multiplechoice__actions">
        {isQuestionFinished && <button className="multiplechoice__next-button" onClick={handleNextClick}>
          NEXT
        </button>}
      </div>
    </div>
  )
}