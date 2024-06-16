import ChangeExerciseTypeDialog from '@/components/ChangeExerciseTypeDialog';
import DragDrop from '@/components/exercises/DragDrop';
import { FaArrowsRotate } from 'react-icons/fa6';
import MultipleChoice from '@/components/exercises/MultipleChoice';
import { useState } from 'react';
import type { Exercise, RenderMode } from '@/data/exercise';
import './ExerciseRenderer.css';

type ExerciseRendererProps = {
  data: Exercise
}

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
    <div className="exerciserenderer">
      {exercise}
      {
        canChangeRenderMode &&
        <>
          <button className="exerciserenderer__changerendermode-button" onClick={() => setShowChangeRenderModeDialog(true)}><FaArrowsRotate role="presentation"/>Change Exercise Type</button>
          <ChangeExerciseTypeDialog isOpen={showChangeRenderModeDialog} exercise={data} onCancel={() => setShowChangeRenderModeDialog(false)} onRenderModeChoose={handleRenderModeChoose}/>
        </>
      }
    </div>
  );
}