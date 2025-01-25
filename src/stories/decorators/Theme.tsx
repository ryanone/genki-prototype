import { FC, PropsWithChildren } from 'react';
import ThemeProvider from '@/provider/ThemeProvider';
import '@/styles/globalStyles.css';

const ThemeDecorator: FC<PropsWithChildren<{}>> = ({ children }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

export default ThemeDecorator;
