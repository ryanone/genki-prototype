import { lazy, useState, Suspense } from 'react';
import ChangeExerciseTypeDialog from '@/components/ChangeExerciseTypeDialog';
import { FaArrowsRotate } from 'react-icons/fa6';
import type { Exercise, RenderMode } from '@/data/exercise';
import styles from './ExerciseRenderer.module.css';

type ExerciseRendererProps = {
  data: Exercise
}

const DragDrop = lazy(() => import('@/components/exercises/DragDrop'));
const MultipleChoice = lazy(() => import('@/components/exercises/MultipleChoice'));

export default function ExerciseRenderer({ data }: ExerciseRendererProps) {
  const [renderMode, setRenderMode] = useState(data.supportedRenderModes[0]);
  let exercise = <></>;
  if (renderMode === 'DRAG_DROP') {
    exercise = <DragDrop data={data} key={Date.now()}/>
  } else if (renderMode === 'MULTIPLE_CHOICE') {
    exercise = <MultipleChoice data={data} key={Date.now()}/>
  }
  const canChangeRenderMode = data.supportedRenderModes.length > 1;
  const [showChangeRenderModeDialog, setShowChangeRenderModeDialog] = useState(false);
  const handleRenderModeChoose = (renderMode: RenderMode) => {
    setRenderMode(renderMode);
    setShowChangeRenderModeDialog(false);
  }

  return (
    <div>
      <Suspense fallback={<p className={styles.loading} role="alert">Loading...</p>}>
        {exercise}
      </Suspense>
      {
        canChangeRenderMode &&
        <>
          <button className={styles.renderModeButton} onClick={() => setShowChangeRenderModeDialog(true)}><FaArrowsRotate role="presentation"/>Change Exercise Type</button>
          <ChangeExerciseTypeDialog isOpen={showChangeRenderModeDialog} exercise={data} onCancel={() => setShowChangeRenderModeDialog(false)} onRenderModeChoose={handleRenderModeChoose}/>
        </>
      }
    </div>
  );
}