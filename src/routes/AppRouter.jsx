import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import ScrollToTop from '../components/layout/ScrollToTop';
import Home from '../pages/Home';
import Courses from '../pages/Courses';
import CourseDetail from '../pages/CourseDetail';
import CoursePlayer from '../pages/CoursePlayer';
import Jobs from '../pages/Jobs';
import JobDetail from '../pages/JobDetail';
import Articles from '../pages/Articles';
import ArticleDetail from '../pages/ArticleDetail';
export default function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="courses" element={<Courses />} />
          <Route path="courses/:id" element={<CourseDetail />} />
          <Route path="learn/:id" element={<CoursePlayer />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="jobs/:id" element={<JobDetail />} />
          
          <Route path="articles" element={<Articles />} />
          <Route path="articles/:id" element={<ArticleDetail />} />
          <Route path="login" element={<div className="container p-8 text-center"><h1 className="text-3xl font-bold">Halaman Masuk (Mock)</h1></div>} />
          <Route path="register" element={<div className="container p-8 text-center"><h1 className="text-3xl font-bold">Halaman Daftar</h1></div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
