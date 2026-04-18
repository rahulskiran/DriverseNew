import App from './App.jsx';
import SuccessPage from './components/SuccessPage.jsx';
import CancelPage from './components/CancelPage.jsx';

function normalizePath(pathname) {
  const p = pathname.replace(/\/$/, '');
  return p === '' ? '/' : p;
}

export default function Root() {
  const path = normalizePath(window.location.pathname);

  if (path === '/donate/success') {
    return <SuccessPage />;
  }
  if (path === '/donate/cancel') {
    return <CancelPage />;
  }
  return <App />;
}
