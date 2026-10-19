import { lazy } from 'react';

// Centralised route loaders so pages can be preloaded on hover/touch
// (e.g. from the Header nav) before the user clicks.
export const loadAboutPage = () => import('./pages/AboutPage');
export const loadTeamPage = () => import('./pages/TeamPage');
export const loadPlayerProfilePage = () => import('./pages/PlayerProfilePage');
export const loadMatchesPage = () => import('./pages/MatchesPage');
export const loadMatchDetailsPage = () => import('./pages/MatchDetailsPage');
export const loadNewsPage = () => import('./pages/NewsPage');
export const loadArticlePage = () => import('./pages/ArticlePage');
export const loadGalleryPage = () => import('./pages/GalleryPage');
export const loadAcademyPage = () => import('./pages/AcademyPage');
export const loadStorePage = () => import('./pages/StorePage');
export const loadTicketsPage = () => import('./pages/TicketsPage');
export const loadMembershipPage = () => import('./pages/MembershipPage');
export const loadContactPage = () => import('./pages/ContactPage');
export const loadNotFoundPage = () => import('./pages/NotFoundPage');

export const AboutPage = lazy(loadAboutPage);
export const TeamPage = lazy(loadTeamPage);
export const PlayerProfilePage = lazy(loadPlayerProfilePage);
export const MatchesPage = lazy(loadMatchesPage);
export const MatchDetailsPage = lazy(loadMatchDetailsPage);
export const NewsPage = lazy(loadNewsPage);
export const ArticlePage = lazy(loadArticlePage);
export const GalleryPage = lazy(loadGalleryPage);
export const AcademyPage = lazy(loadAcademyPage);
export const StorePage = lazy(loadStorePage);
export const TicketsPage = lazy(loadTicketsPage);
export const MembershipPage = lazy(loadMembershipPage);
export const ContactPage = lazy(loadContactPage);
export const NotFoundPage = lazy(loadNotFoundPage);

// Map a top-level nav path to the loader that prefetches its page chunk.
// Used by the Header to prefetch on hover/touch/focus.
export const navPreloaders: Record<string, () => Promise<unknown>> = {
  '/about': loadAboutPage,
  '/team': loadTeamPage,
  '/matches': loadMatchesPage,
  '/news': loadNewsPage,
  '/gallery': loadGalleryPage,
  '/academy': loadAcademyPage,
  '/store': loadStorePage,
  '/tickets': loadTicketsPage,
  '/membership': loadMembershipPage,
  '/contact': loadContactPage,
};

export const preloadRoute = (path: string) => {
  const loader = navPreloaders[path];
  if (loader) loader();
};
