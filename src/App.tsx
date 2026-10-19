import { Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import SiteLayout from './layouts/SiteLayout';
import HomePage from './pages/HomePage';
import {
  AboutPage,
  AcademyPage,
  ArticlePage,
  ContactPage,
  GalleryPage,
  MatchDetailsPage,
  MatchesPage,
  MembershipPage,
  NewsPage,
  NotFoundPage,
  PlayerProfilePage,
  StorePage,
  TeamPage,
  TicketsPage,
  navPreloaders,
} from './routes';

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

function useIdlePreloadNavRoutes() {
  useEffect(() => {
    const preloadAll = () => {
      for (const loader of Object.values(navPreloaders)) {
        try {
          loader();
        } catch {
          /* ignore */
        }
      }
    };
    // Preload every top-level route during browser idle time so that
    // by the time the user actually clicks a nav link, the chunk is cached.
    const w = window as Window & { requestIdleCallback?: (cb: () => void) => number };
    if (typeof w.requestIdleCallback === 'function') {
      w.requestIdleCallback(preloadAll);
    } else {
      setTimeout(preloadAll, 2000);
    }
  }, []);
}

function App() {
  useIdlePreloadNavRoutes();
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
