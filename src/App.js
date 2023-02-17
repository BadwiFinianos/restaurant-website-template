import { QueryClientProvider } from 'react-query';

import useAppState from './hooks/useAppState';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';
import { queryClient } from './utils/queryClient';
import AxiosInterceptor from './utils/AxiosInterceptor';

import './theme/theme.css';
// ----------------------------------------------------------------------

export default function App() {
  const { InitializeApp } = useAppState();
  InitializeApp();
  return (
    <QueryClientProvider client={queryClient}>
      <AxiosInterceptor>
        <ThemeProvider>
          <ScrollToTop />
          <BaseOptionChartStyle />
          <Router />
        </ThemeProvider>
      </AxiosInterceptor>
    </QueryClientProvider>
  );
}
