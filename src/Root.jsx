import App from './App.jsx';
import SuccessPage from './components/SuccessPage.jsx';
import CancelPage from './components/CancelPage.jsx';
import PrivacyPolicy from './components/PrivacyPolicy.jsx';
import TermsOfService from './components/TermsOfService.jsx';
import DonationTerms from './components/DonationTerms.jsx';

function normalizePath(pathname) {
  const p = pathname.replace(/\/$/, '');
  return p === '' ? '/' : p;
}

export default function Root() {
  const path = normalizePath(window.location.pathname);

  if (path === '/donate/success') return <SuccessPage />;
  if (path === '/donate/cancel') return <CancelPage />;
  if (path === '/privacy') return <PrivacyPolicy />;
  if (path === '/terms') return <TermsOfService />;
  if (path === '/donation-terms') return <DonationTerms />;
  return <App />;
}
