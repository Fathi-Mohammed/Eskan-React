import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './theme/index.scss';
import '@/shared/services/i18n/config.ts';
import { ScrollToTop } from '@/shared/components/ScrollToTop';
import { LanguageProvider } from './shared/context/languageContext';
import { AuthProvider } from './shared/context/AuthProvider';
import { AxiosConfig } from './shared/services/Axios';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <LanguageProvider>
          <AuthProvider>
            <AxiosConfig />
            <App />
          </AuthProvider>
        </LanguageProvider>
        <ScrollToTop />
        <ReactQueryDevtools
          initialIsOpen={false}
          buttonPosition="bottom-right"
        />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
