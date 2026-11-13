import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AgreementPage } from './AgreementPage';
import '../../styles/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AgreementPage />
  </StrictMode>,
);
