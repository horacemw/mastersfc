import { Route, Routes } from 'react-router-dom';
import SiteLayout from './layouts/SiteLayout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import TeamPage from './pages/TeamPage';
import PlayerProfilePage from './pages/PlayerProfilePage';
import MatchesPage from './pages/MatchesPage';
import MatchDetailsPage from './pages/MatchDetailsPage';
import NewsPage from './pages/NewsPage';
import ArticlePage from './pages/ArticlePage';
import GalleryPage from './pages/GalleryPage';
import AcademyPage from './pages/AcademyPage';
import StorePage from './pages/StorePage';
import TicketsPage from './pages/TicketsPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/team/:slug" element={<PlayerProfilePage />} />
        <Route path="/matches" element={<MatchesPage />} />
        <Route path="/matches/:id" element={<MatchDetailsPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/:slug" element={<ArticlePage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/academy" element={<AcademyPage />} />
        <Route path="/store" element={<StorePage />} />
        <Route path="/tickets" element={<TicketsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
