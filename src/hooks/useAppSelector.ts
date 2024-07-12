import { useSelector } from 'react-redux';
import type { RootState } from '@/app/store';

export default useSelector.withTypes<RootState>()