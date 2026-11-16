import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import LifeSlicesStage from './components/LifeSlicesStage.tsx';
import './index.css';
import './styles/portfolio.css';
import { initPortfolio } from './scripts/portfolioMain.ts';

initPortfolio();

const holoMount = document.getElementById('holoStage');
if (holoMount) {
  createRoot(holoMount).render(<LifeSlicesStage />);
} else {
  const rootEl = document.getElementById('root');
  if (rootEl) {
    createRoot(rootEl).render(<App />);
  }
}
