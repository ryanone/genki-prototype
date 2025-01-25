import { FaArrowLeft, FaStar, FaX } from 'react-icons/fa6';
import { useState, type KeyboardEvent } from 'react';
import { type TwoDirectionalFlow } from '@/data/exercise';
import {
  altClass,
  content,
  dropTarget,
  icon,
  incorrectArrowClass,
  numIncorrectClass,
  primaryClass,
  zone,
  type ContentVariant,
  type DropTargetVariant,
  type ZoneVariant,
} from './DropTarget.css';

type DropTargetValue = {
  alt?: string | undefined;
  content: string;
  id: string;
};

type DropTargetValue2 = {
  content: string;
};

type DropTargetProps = {
  layout: TwoDirectionalFlow;
  numIncorrectGuesses?: number;
  onDrop: (value: string) => void;
  result: 'CORRECT' | 'INCORRECT' | undefined;
  showAlt?: boolean | undefined;
  style?: Record<string, string>;
  val1: DropTargetValue;
  val2?: DropTargetValue2;
};

export default function DropTarget({
  layout,
  result,
  numIncorrectGuesses,
  showAlt = false,
  style,
  val1,
  val2,
  onDrop,
}: DropTargetProps) {
  const [isZoneEntered, setIsZoneEntered] = useState(false);
  const isDisabled = result === 'CORRECT';
  const handleZoneDropKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!isDisabled && (e.key === 'Enter' || e.key === ' ')) {
      onDrop(val1.id);
      setIsZoneEntered(false);
    }
  };
  const handleZoneDropClick = () => {
    if (!isDisabled) {
      onDrop(val1.id);
      setIsZoneEntered(false);
    }
  };

  let dropTargetVariant: DropTargetVariant = { orientation: 'horizontal' };
  if (layout === 'VERTICAL') {
    dropTargetVariant = { orientation: 'vertical' };
  }

  const isCorrect = result === 'CORRECT';
  const isIncorrect = result === 'INCORRECT';
  const zoneContent = val2 && val2.content;
  let zoneVariant: ZoneVariant = {};
  if (isZoneEntered) {
    zoneVariant = { interaction: 'entered' };
  }

  let numIncorrectContent;
  if (numIncorrectGuesses && numIncorrectGuesses > 0) {
    numIncorrectContent =
      layout === 'HORIZONTAL' ? (
        <span
          className={numIncorrectClass}
          data-testid="drop-target-num-incorrect"
        >
          <FaArrowLeft className={incorrectArrowClass} role="presentation" />
          {`wrong ${numIncorrectGuesses}x`}
        </span>
      ) : (
        <span
          className={numIncorrectClass}
          data-testid="drop-target-num-incorrect"
        >{`x${numIncorrectGuesses}`}</span>
      );
    // zoneClasses.push(styles.zoneHasIncorrect);
    zoneVariant.mode = 'incorrect';
  }

  // const contentClasses = [styles.content];
  let contentVariant: ContentVariant;
  if (showAlt && !val1.alt && layout === 'VERTICAL') {
    // contentClasses.push(styles.emptyContent);
    contentVariant = { contents: 'empty' };
  }

  return (
    <div className={dropTarget(dropTargetVariant)} style={style}>
      <div className={content(contentVariant)}>
        <div className={primaryClass} data-testid="drop-target-val1-content">
          {val1.content}
        </div>
        {showAlt && val1.alt && (
          <div className={altClass} data-testid="drop-target-val1-alt">
            {val1.alt}
          </div>
        )}
      </div>
      <div
        className={zone(zoneVariant)}
        data-drop-target-zone="true"
        onDrop={handleZoneDropClick}
        onClick={handleZoneDropClick}
        onDragEnter={() => setIsZoneEntered(true)}
        onDragLeave={() => setIsZoneEntered(false)}
        onDragOver={(e) => e.preventDefault()}
        onKeyDown={handleZoneDropKeyDown}
        tabIndex={0}
        role="button"
      >
        {zoneContent}
        {isIncorrect && (
          <FaX aria-label="Incorrect" className={icon({ mode: 'incorrect' })} />
        )}
        {isCorrect && (
          <FaStar aria-label="Correct" className={icon({ mode: 'correct' })} />
        )}
      </div>
      {numIncorrectContent}
    </div>
  );
}
