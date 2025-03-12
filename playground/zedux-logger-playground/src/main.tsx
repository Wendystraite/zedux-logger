import { createRoot } from 'react-dom/client';

import App from './App.tsx';
import './style.css';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  // <StrictMode> // Disabled for now because it currently breaks Zedux
  <App />,
  // </StrictMode>,
);
