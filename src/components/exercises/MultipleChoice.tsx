import { generateRandomChoices, randomizeArray } from '@/utils/randomize';
import { useRef, useState } from 'react';
import AnswerList from '@/components/AnswerList';
import ExerciseResults from '@/components/ExerciseResults';
import { FaCircleInfo } from 'react-icons/fa6';
import MultipleChoiceQuestion from '@/components/MultipleChoiceQuestion';
import ProgressBar from '@/components/ProgressBar';
import Timer from '@/components/Timer';
import type { Exercise, Question } from '@/data/exercise';
import type { ChoiceItem } from '@/components/ChoiceButton';
import type { QuestionAnswer } from '@/components/AnswerList';
import styles from './MultipleChoice.module.css';

type MultipleChoiceProps = {
  data: Exercise;
}

const NUM_CHOICES_PER_QUESTION = 4;

export default function MultipleChoice({ data }: MultipleChoiceProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isQuestionFinished, setIsQuestionFinished] = useState(false);
  const questions = useRef(data.meta?.MULTIPLE_CHOICE?.randomizeQuestions ? randomizeArray(data.questions) as Question[] : data.questions);
  const currentQuestion = questions.current[currentIndex];
  const [currentChoices, setCurrentChoices] = useState(
    currentQuestion ?
      generateRandomChoices(data, currentQuestion.content, NUM_CHOICES_PER_QUESTION) :
      []
  );
  const [answers, setAnswers] = useState<ChoiceItem[][]>([]);
  const timeElapsed = useRef(0);
  const isExerciseFinished = currentIndex === questions.current.length;
  const instructions = data.meta?.MULTIPLE_CHOICE?.instructions;
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
    setCurrentIndex(nextIndex);
    if (nextIndex < questions.current.length) {
      const nextQuestion = questions.current[nextIndex];
      setCurrentChoices(generateRandomChoices(data, nextQuestion.content, NUM_CHOICES_PER_QUESTION));
      setIsQuestionFinished(false);
    }
  }
  const handleRestart = () => {
    setCurrentIndex(0);
    setIsQuestionFinished(false);
    setAnswers([]);
    questions.current = randomizeArray(data.questions) as Question[];
    const nextQuestion = questions.current[0];
    setCurrentChoices(generateRandomChoices(data, nextQuestion.content, NUM_CHOICES_PER_QUESTION));
  }
  const nextButton = (isQuestionFinished && <button className={styles.nextButton} onClick={handleNextClick}>
    NEXT
  </button>);
  const questionsAnswers = isExerciseFinished ? questions.current.map((q, i) => (
    {
      question: q,
      choices: answers[i]
    }
  )) : [];
  const numSolved = isExerciseFinished ? answers.length : 0;
  const numWrong = isExerciseFinished ? answers.filter(a => !!a.find(c => c.result === 'INCORRECT')).length : 0;

  return (
    <div className={styles.multipleChoice}>
      {
        isExerciseFinished ?
          <>
            <ExerciseResults numSolved={numSolved} numWrong={numWrong} timeElapsed={timeElapsed.current} onRestart={handleRestart} />
            <AnswerList data={questionsAnswers as QuestionAnswer[]} />
          </> :
          <>
            {instructions && <div className={styles.instructions}><FaCircleInfo className={styles.instructionsIcon} role="presentation"/>{instructions}</div>}
            <MultipleChoiceQuestion
              key={currentIndex}
              choices={currentChoices}
              index={currentIndex}
              isDisabled={isQuestionFinished}
              question={currentQuestion}
              onChoiceSelect={handleChoiceSelect}
            />
            <div className={styles.actions}>
              {nextButton}
            </div>
            <ProgressBar current={currentIndex} total={questions.current.length}/>
            <Timer isRunning={!isExerciseFinished} onTick={(numSeconds) => timeElapsed.current = numSeconds}/>
          </>
      }
    </div>
  )
}