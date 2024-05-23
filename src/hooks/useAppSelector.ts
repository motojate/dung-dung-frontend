import { TypedUseSelectorHook, useSelector } from 'react-redux';
import store from '../stores';

type TRootState = ReturnType<typeof store.getState>;
const useAppSelector = <TSelected>(
  selector: (state: TRootState) => TSelected
): TSelected => useSelector(selector);

export default useAppSelector;
