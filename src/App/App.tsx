import { QueryClient, QueryClientProvider } from 'react-query';
import { Routes, Header } from '@/Components';
import classes from './App.module.scss';

export const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className={classes.App}>
        <Header />
        <Routes />
      </div>
    </QueryClientProvider>
  );
};
