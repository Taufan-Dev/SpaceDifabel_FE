import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import WelcomeModal from '../ui/WelcomeModal';

export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col relative">
      <WelcomeModal />
      <Navbar />
      <main id="main-content" className="flex-1 flex flex-col">
        <Outlet />
      </main>
      <footer className="border-t border-slate-200 bg-slate-50 py-8">
        <div className="container mx-auto px-4 md:px-8 text-center text-slate-500">
          <p>&copy; {new Date().getFullYear()} SpaceDifabel. Semua hak cipta dilindungi.</p>
        </div>
      </footer>
    </div>
  );
}
