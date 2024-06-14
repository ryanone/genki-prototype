import DragDrop from '@/components/exercises/DragDrop';
import MultipleChoice from '@/components/exercises/MultipleChoice';
import { useState } from 'react';
import type { Exercise } from '@/data/exercise';

type ExerciseRendererProps = {
  data: Exercise
}

export default function ExerciseRenderer({ data }: ExerciseRendererProps) {
  const [renderMode, setRenderMode] = useState(data.supportedRenderModes[0]);
  let exercise = <></>;
  if (renderMode === 'DRAG_DROP') {
    exercise = <DragDrop data={data}/>
  } else if (renderMode === 'MULTIPLE_CHOICE') {
    exercise = <MultipleChoice data={data}/>
  }
  return (
    <div className="exerciserenderer">
      {exercise}
    </div>
  );
}