import { useDispatch } from 'react-redux';
import store from '../stores';

type TAppDispatch = typeof store.dispatch;

const useAppDispatch = () => useDispatch<TAppDispatch>();

export default useAppDispatch;
