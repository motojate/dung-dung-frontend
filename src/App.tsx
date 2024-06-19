import React from 'react';
import RouterConfig from './routes';
import './App.css';
import useAppSelector from './hooks/useAppSelector';

const App = () => {
  const isLoading = useAppSelector(state => state.loadingReducer.isLoading);
  return (
    <>
      <RouterConfig />
    </>
  );
};

export default App;
