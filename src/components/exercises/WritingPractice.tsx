import { useRef } from 'react';
import Instructions from '@/components/Instructions';
import Timer from '@/components/Timer';
import WritingPracticeRow from '@/components/WritingPracticeRow';
import useAppSelector from '@/hooks/useAppSelector';
import type { Ref as WritingInputRefType } from '@/components/WritingInput';
import styles from './WritingPractice.module.css';

export default function WritingPractice() {
  const rowRefs = useRef<WritingInputRefType[]>([]);
  const timeElapsed = useRef(0);
  const instructions = useAppSelector(
    (state) => state.writingPractice.meta?.instructions,
  );
  const numExamples = useAppSelector(
    (state) => state.writingPractice.meta?.numExamples,
  );
  const numRepetitions = useAppSelector(
    (state) => state.writingPractice.meta?.numRepetitions,
  );
  const rows = useAppSelector((state) => state.writingPractice.rows);
  const isFinished = useAppSelector(
    (state) => state.writingPractice.isFinished,
  );

  const rowsStyles: Record<string, string> = {
    gridTemplateColumns: `repeat(${(numRepetitions ?? 0) + 1}, minmax(0, 1fr))`,
    gridTemplateRows: `repeat(${rows.length}, max-content)`,
  };

  const handleRowComplete = (rowNumber: number) => {
    if (rowNumber < rows.length - 1) {
      rowRefs.current[rowNumber + 1].focus();
    }
  };

  return (
    <div className={styles.writingPractice}>
      {instructions ? <Instructions>{instructions}</Instructions> : null}
      <div className={styles.rows} style={rowsStyles}>
        {rows.length
          ? rows.map((row, i) => {
              return (
                <WritingPracticeRow
                  choice={row.choice}
                  key={row.choice.content}
                  numExamples={numExamples ?? 0}
                  numRepetitions={numRepetitions ?? 0}
                  onRowComplete={handleRowComplete}
                  ref={(el) => {
                    if (el) {
                      rowRefs.current[i] = el;
                    }
                  }}
                  rowNumber={i}
                />
              );
            })
          : null}
      </div>
      <Timer
        isRunning={!isFinished}
        onTick={(numSeconds) => {
          timeElapsed.current = numSeconds;
        }}
      />
    </div>
  );
}
