import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import SiteLayout from './layouts/SiteLayout';
import HomePage from './pages/HomePage';

const AboutPage = lazy(() => import('./pages/AboutPage'));
const TeamPage = lazy(() => import('./pages/TeamPage'));
const PlayerProfilePage = lazy(() => import('./pages/PlayerProfilePage'));
const MatchesPage = lazy(() => import('./pages/MatchesPage'));
const MatchDetailsPage = lazy(() => import('./pages/MatchDetailsPage'));
const NewsPage = lazy(() => import('./pages/NewsPage'));
const ArticlePage = lazy(() => import('./pages/ArticlePage'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));
const AcademyPage = lazy(() => import('./pages/AcademyPage'));
const StorePage = lazy(() => import('./pages/StorePage'));
const TicketsPage = lazy(() => import('./pages/TicketsPage'));
const MembershipPage = lazy(() => import('./pages/MembershipPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function RouteFallback() {
  return (
    <div className="min-h-[40vh] flex items-center justify-center">
      <span className="inline-flex items-center gap-3 text-pitch-700">
        <span className="h-6 w-6 rounded-full border-2 border-pitch-700/30 border-t-pitch-700 animate-spin" />
        <span className="text-sm font-semibold">Loading…</span>
      </span>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route
          path="/about"
          element={
            <Suspense fallback={<RouteFallback />}>
              <AboutPage />
            </Suspense>
          }
        />
        <Route
          path="/team"
          element={
            <Suspense fallback={<RouteFallback />}>
              <TeamPage />
            </Suspense>
          }
        />
        <Route
          path="/team/:slug"
          element={
            <Suspense fallback={<RouteFallback />}>
              <PlayerProfilePage />
            </Suspense>
          }
        />
        <Route
          path="/matches"
          element={
            <Suspense fallback={<RouteFallback />}>
              <MatchesPage />
            </Suspense>
          }
        />
        <Route
          path="/matches/:id"
          element={
            <Suspense fallback={<RouteFallback />}>
              <MatchDetailsPage />
            </Suspense>
          }
        />
        <Route
          path="/news"
          element={
            <Suspense fallback={<RouteFallback />}>
              <NewsPage />
            </Suspense>
          }
        />
        <Route
          path="/news/:slug"
          element={
            <Suspense fallback={<RouteFallback />}>
              <ArticlePage />
            </Suspense>
          }
        />
        <Route
          path="/gallery"
          element={
            <Suspense fallback={<RouteFallback />}>
              <GalleryPage />
            </Suspense>
          }
        />
        <Route
          path="/academy"
          element={
            <Suspense fallback={<RouteFallback />}>
              <AcademyPage />
            </Suspense>
          }
        />
        <Route
          path="/store"
          element={
            <Suspense fallback={<RouteFallback />}>
              <StorePage />
            </Suspense>
          }
        />
        <Route
          path="/tickets"
          element={
            <Suspense fallback={<RouteFallback />}>
              <TicketsPage />
            </Suspense>
          }
        />
        <Route
          path="/membership"
          element={
            <Suspense fallback={<RouteFallback />}>
              <MembershipPage />
            </Suspense>
          }
        />
        <Route
          path="/contact"
          element={
            <Suspense fallback={<RouteFallback />}>
              <ContactPage />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<RouteFallback />}>
              <NotFoundPage />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
