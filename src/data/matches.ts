import type { Match } from '../types';

export const matches: Match[] = [
  {
    id: 'm-karonga',
    opponent: 'Karonga United',
    opponentShort: 'KUFC',
    home: true,
    date: '2026-10-18',
    time: '18:00',
    venue: 'Bingu National Stadium',
    competition: 'FDH Bank Premiership',
    status: 'Full Time',
    score: { home: 4, away: 1 },
    summary: 'A dominant home performance at Bingu National Stadium as Masters FC bounced back in style against Karonga United.',
  },
  {
    id: 'm002',
    opponent: 'City Rovers',
    opponentShort: 'CTR',
    home: false,
    date: '2026-10-25',
    time: '16:30',
    venue: 'Rovers Park',
    competition: 'Premier League Cup',
    status: 'Upcoming',
  },
  {
    id: 'm003',
    opponent: 'United Youth',
    opponentShort: 'UNY',
    home: true,
    date: '2026-11-01',
    time: '15:00',
    venue: 'Home Stadium',
    competition: 'Community Shield',
    status: 'Upcoming',
  },
  {
    id: 'm004',
    opponent: 'Northern Stars',
    opponentShort: 'NST',
    home: true,
    date: '2026-11-08',
    time: '15:00',
    venue: 'Home Stadium',
    competition: 'Premier League Cup',
    status: 'Upcoming',
  },
  {
    id: 'm-r1',
    opponent: 'Riverside FC',
    opponentShort: 'RIV',
    home: true,
    date: '2026-10-04',
    time: '15:00',
    venue: 'Home Stadium',
    competition: 'Premier League Cup',
    status: 'Full Time',
    score: { home: 2, away: 1 },
    summary: 'A hard-fought home win sealed by a late Leonard Jector finish.',
    highlights: [
      { title: 'Goal — Rashid Nkomo', minute: 23, player: 'Rashid Nkomo' },
      { title: 'Goal — Leonard Jector', minute: 78, player: 'Leonard Jector' },
    ],
  },
  {
    id: 'm-r2',
    opponent: 'Eastside United',
    opponentShort: 'EAU',
    home: false,
    date: '2026-09-27',
    time: '17:00',
    venue: 'Eastside Ground',
    competition: 'Community Shield',
    status: 'Full Time',
    score: { home: 1, away: 1 },
    summary: 'A disciplined away draw against a strong Eastside side.',
    highlights: [{ title: 'Goal — Taona Banda', minute: 61, player: 'Taona Banda' }],
  },
  {
    id: 'm-r3',
    opponent: 'Southern Lions',
    opponentShort: 'SOL',
    home: true,
    date: '2026-09-20',
    time: '15:00',
    venue: 'Home Stadium',
    competition: 'Premier League Cup',
    status: 'Full Time',
    score: { home: 3, away: 0 },
    summary: 'A commanding home performance with goals from Jector, Moyo and Mabena.',
    highlights: [
      { title: 'Goal — Leonard Jector', minute: 14, player: 'Leonard Jector' },
      { title: 'Goal — Patrick Moyo', minute: 44, player: 'Patrick Moyo' },
      { title: 'Goal — Joshua Mabena', minute: 71, player: 'Joshua Mabena' },
    ],
  },
  {
    id: 'm-r4',
    opponent: 'Westland FC',
    opponentShort: 'WES',
    home: false,
    date: '2026-09-13',
    time: '18:00',
    venue: 'Westland Arena',
    competition: 'Premier League Cup',
    status: 'Full Time',
    score: { home: 0, away: 0 },
    summary: 'A tactical goalless draw secured by a clean sheet from Daniel Okoro.',
  },
];

export const upcomingMatches = () =>
  matches.filter((m) => m.status === 'Upcoming' || m.status === 'Postponed').sort((a, b) => a.date.localeCompare(b.date));

export const results = () =>
  matches.filter((m) => m.status === 'Full Time').sort((a, b) => b.date.localeCompare(a.date));

export const nextMatch = () => upcomingMatches()[0];

export const getMatchById = (id: string) => matches.find((m) => m.id === id);
