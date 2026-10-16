export const club = {
  name: 'Masters Football Club',
  shortName: 'Masters FC',
  founded: 2015,
  nickname: 'The Lions',
  motto: 'Discipline. Unity. Progress.',
  tagline: 'More Than Football',
  description:
    'Masters FC is committed to developing football talent, building discipline and creating opportunities for young people through the beautiful game.',
  mission:
    'To develop young football talent through disciplined training, strong character and real opportunities on and off the pitch.',
  vision:
    'To become a leading community football club recognised for building players, leaders and future professionals.',
  values: [
    { title: 'Discipline', description: 'Consistency, structure and respect for the game.' },
    { title: 'Teamwork', description: 'Playing for the badge and for each other, every match.' },
    { title: 'Respect', description: 'For opponents, officials, supporters and community.' },
    { title: 'Integrity', description: 'Honest effort, fair play and transparent leadership.' },
    { title: 'Excellence', description: 'Pushing standards higher in training and in matches.' },
    { title: 'Community', description: 'Rooted in our neighbourhood, playing for its young people.' },
  ],
  contact: {
    email: 'info@mastersfc.mw',
    phone: 'Club Contact Number',
    address: 'Club Address, City, Country',
    stadium: 'Home Stadium',
  },
  social: {
    facebook: 'https://web.facebook.com/profile.php?id=61562658512059',
  },
  nav: [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Team', to: '/team' },
    { label: 'Matches', to: '/matches' },
    { label: 'News', to: '/news' },
    { label: 'Gallery', to: '/gallery' },
    { label: 'Academy', to: '/academy' },
    { label: 'Tickets', to: '/tickets' },
    { label: 'Store', to: '/store' },
    { label: 'Contact', to: '/contact' },
  ],
} as const;
