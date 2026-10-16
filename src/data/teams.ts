export interface SuperLeagueTeam {
  id: string;
  name: string;
  shortName?: string;
  nickname?: string;
  logo: string;
}

export const superLeagueTeams: SuperLeagueTeam[] = [
  { id: 'mafco', name: 'MAFCO FC', shortName: 'MAFCO', logo: '/assets/teams/mafco.jpg' },
  { id: 'moyale', name: 'Moyale Barracks', shortName: 'Moyale', nickname: 'The Lions of Kaning’ina Forest', logo: '/assets/teams/moyale.jpg' },
  { id: 'creck', name: 'CRECK SC', shortName: 'CRECK', logo: '/assets/teams/creck.jpg' },
  { id: 'silver-strikers', name: 'Silver Strikers', shortName: 'Silver', logo: '/assets/teams/silver-strikers.jpg' },
  { id: 'dedza-dynamos', name: 'Dedza Dynamos', shortName: 'Dedza', logo: '/assets/teams/dedza-dynamos.jpg' },
  { id: 'bangwe-all-stars', name: 'Bangwe All Stars', shortName: 'Bangwe', logo: '/assets/teams/bangwe-all-stars.jpg' },
  { id: 'kau-kau', name: 'Kau Kau Tigers', shortName: 'Kau Kau', logo: '/assets/teams/kau-kau.jpg' },
  { id: 'baka-city', name: 'Baka City Clever Boys', shortName: 'Baka City', logo: '/assets/teams/baka-city.jpg' },
  { id: 'mighty-wanderers', name: 'Mighty Mukuru Wanderers', shortName: 'Wanderers', logo: '/assets/teams/mighty-wanderers.jpg' },
  { id: 'kamuzu-barracks', name: 'Kamuzu Barracks', shortName: 'KB', logo: '/assets/teams/kamuzu-barracks.jpg' },
  { id: 'mzuzu-city-hammers', name: 'Mzuzu City Hammers', shortName: 'Hammers', logo: '/assets/teams/mzuzu-city-hammers.jpg' },
  { id: 'chitipa-united', name: 'Chitipa United', shortName: 'Chitipa', nickname: 'Inkhalamu zga ku Chitipa', logo: '/assets/teams/chitipa-united.jpg' },
  { id: 'fomo', name: 'FOMO FC', shortName: 'FOMO', nickname: 'Lions of Sapitwa', logo: '/assets/teams/fomo.jpg' },
  { id: 'nyasa-big-bullets', name: 'Nyasa Big Bullets', shortName: 'Bullets', nickname: 'The People’s Team', logo: '/assets/teams/nyasa-big-bullets.jpg' },
  { id: 'karonga-united', name: 'Karonga United', shortName: 'Karonga', nickname: 'The Pride of Karonga', logo: '/assets/teams/karonga-united.jpg' },
  { id: 'civil-service-united', name: 'Civil Service United', shortName: 'CIVO', logo: '/assets/teams/civil-service-united.jpg' },
];

export const getTeamByName = (name: string) =>
  superLeagueTeams.find(
    (t) =>
      t.name.toLowerCase() === name.toLowerCase() ||
      t.shortName?.toLowerCase() === name.toLowerCase() ||
      t.id === name.toLowerCase(),
  );
