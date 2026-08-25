import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { LanguageProvider } from './presentation/context/LanguageContext';
import { ThemeProvider } from './presentation/context/ThemeContext';
import { DIContainerProvider } from './presentation/context/DIContainerContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DIContainerProvider>
      <ThemeProvider>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </ThemeProvider>
    </DIContainerProvider>
  </StrictMode>,
);

