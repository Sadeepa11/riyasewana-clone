import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import CategoryBar from '../components/CategoryBar';
import Footer from '../components/Footer';

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <CategoryBar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
