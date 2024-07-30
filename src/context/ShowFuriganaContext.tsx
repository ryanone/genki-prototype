import { createContext } from 'react';

type ShowFuriganaContextValue = {
  setShowFurigana: (value: boolean) => void;
  showFurigana: boolean;
};

const ShowFuriganaContext = createContext({
  showFurigana: false,
  setShowFurigana: (value: boolean) => {
    console.error(
      'ShowFuriganaContext: `setShowFurigana()` not implemented: %o',
      value,
    );
  },
} as ShowFuriganaContextValue);

export default ShowFuriganaContext;
