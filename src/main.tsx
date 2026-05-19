import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './shared/styles/global.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div>Home</div>
  </StrictMode>,
);
