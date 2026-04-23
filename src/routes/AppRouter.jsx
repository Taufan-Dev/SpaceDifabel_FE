import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import Home from '../pages/Home';
import Courses from '../pages/Courses';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="courses" element={<Courses />} />
          
          <Route path="jobs" element={<div className="container p-8 text-center text-slate-800"><h1 className="text-4xl font-bold">Pekerjaan</h1><p>Lowongan pekerjaan ramah difabel segera hadir!</p></div>} />
          
          <Route path="articles" element={<div className="container p-8 text-center text-slate-800"><h1 className="text-4xl font-bold">Artikel</h1><p>Cerita inspiratif dan panduan penting segera hadir!</p></div>} />

          <Route path="login" element={<div className="container p-8 text-center"><h1 className="text-3xl font-bold">Halaman Masuk (Mock)</h1></div>} />
          <Route path="register" element={<div className="container p-8 text-center"><h1 className="text-3xl font-bold">Halaman Daftar</h1></div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
