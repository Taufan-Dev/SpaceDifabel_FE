import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import WelcomeModal from '../ui/WelcomeModal';

export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col relative">
      <WelcomeModal />
      <Navbar />
      <main id="main-content" className="flex-1 flex flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
