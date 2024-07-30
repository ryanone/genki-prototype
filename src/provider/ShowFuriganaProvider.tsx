import { useEffect, useMemo, useState, type ReactNode } from 'react';
import ShowFuriganaContext from '@/context/ShowFuriganaContext';

const SHOW_FURIGANA_KEY = 'showFurigana';

type ShowFuriganaProviderProps = {
  children: ReactNode;
};

export default function ShowFuriganaProvider({
  children,
}: ShowFuriganaProviderProps) {
  const [showFurigana, setShowFurigana] = useState<boolean>(false);

  const providerValue = useMemo(
    () => ({
      showFurigana,
      setShowFurigana: (value: boolean) => {
        localStorage.setItem(SHOW_FURIGANA_KEY, value.toString());
        setShowFurigana(value);
      },
    }),
    [showFurigana],
  );

  useEffect(() => {
    const initialValue = localStorage.getItem(SHOW_FURIGANA_KEY);
    if (initialValue) {
      setShowFurigana(initialValue === 'true');
    } else {
      setShowFurigana(false);
    }
  }, []);

  return (
    <ShowFuriganaContext.Provider value={providerValue}>
      {children}
    </ShowFuriganaContext.Provider>
  );
}
