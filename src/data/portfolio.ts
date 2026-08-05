import tcgThumb from '../images/tcg-sim-thumbnail.png'
import tcgGallery1 from '../images/tcg-sim-gallery-1.png'
import tcgGallery2 from '../images/tcg-sim-gallery-2.png'
import humanshapeThumb from '../images/humanshape-thumbnail.png'
import humanshapeGallery from '../images/humanshape-gallery.png'
import eldritchThumb from '../images/ceo-thumbnail.png'
import tailsThumb from '../images/tails-thumbnail.png'
import tailsGallery1 from '../images/tails-gallery1.png'
import tailsGallery2 from '../images/tails-gallery-2.png'
import glitchEffect from '../assets/glitch-effect.png'
import riftunboundLog from '../images/riftunbound-log.png'
import riftunboundThumbnail from '../images/riftunbound-thumbnail.png'
import riftunboundGallery from '../images/riftunbound-gallery-1.png'
import logue from '../images/Logue.png'
import beepboop from '../images/BeepBoop.png'
import hypnogogia from '../images/Hypnogogia.png'
import what from '../images/What.png'
import scratch from '../images/scratch.jpg'
import cardboard from '../images/cardboard.jpg'
import gameboard from '../images/gameboard.jpg'
import flowchart from '../images/flowchart.jpg'
import math from '../images/math.png'
import victory from '../images/victory.jpg'
import shop from '../images/shop.jpg'
import slop from '../images/slop.png'
import copilot from '../images/copilot.jpg'
import thinking from '../images/thinking.png'
import dummy from '../images/dummy.jpg'
import cad from '../images/cad.jpg'
import helmet from '../images/helmet.jpg'
import cubicle from '../images/cubicle.png'
import measure from '../images/measure.png'
import controller from '../images/controller.jpg'
import gachiakuta from '../images/gachiakuta.jpg'
import ceo from '../images/ceo.jpg'
import eldritch from '../images/eldritch.jpg'
import lasertag from '../images/lasertag.png'
import tft from '../images/tft.jpg'
import chess from '../images/chess.jpg'
import cats from '../images/cats.jpg'
import sleep from '../images/sleep.png'
import splatoon from '../images/splatoon.jpg'
import neon from '../images/neon.jpg'
import alarm from '../images/alarm.jpg'
import loguetown from '../images/loguetown.jpg'
import sunrise from '../images/sunrise.jpg'
import cloudy from '../images/cloudy.jpg'
import robot from '../images/robot.jpg'
import laser from '../images/laser.jpg'
import dj from '../images/dj.jpg'
import onepiece from '../images/onepiece.jpg'
import mario from '../images/mario.jpg'
import shrug from '../images/shrug.jpg'


export const site = {
  name: 'Bryan Jiang',
  roles: 'Software Engineer · Musician · Game Developer',
  bioLead:
    'CS student from University of Michigan, previously interned at Microsoft as a SWE intern in MAI. AI systems, game engine/development, computer vision, music production',
  bioFade:
    ', volleyball, volleyball opposite, injured ankles and knees, #TheyBlameTheBeasts, electronic, jazz, I promise I will mix and master this time, Second Coming X Revelation, I Can See Mountains, one piece is real, EEAAO, Berri D',
  email: 'bryanjiang15@gmail.com',
  linkedin: 'https://www.linkedin.com/in/bryanbj15/',
  github: 'https://github.com/bryanjiang15',
  resumeHref: '/Bryan_Jiang_Resume.pdf',
  resumeFilename: 'Bryan_Jiang_Resume.pdf',
  spotify: 'https://open.spotify.com/artist/2JIXlDofL6v7PTHYMiAP8a?si=3ueCzDG7Sz-2dwdY5Cmbwg',
  appleMusic: 'https://music.apple.com/us/artist/berri-d/1834932044',
} as const

export type ContactLink = {
  label: string
  value: string
  href: string
  external?: boolean
  accent?: boolean
  download?: string
}

export const contactLinks: ContactLink[] = [
  {
    label: 'Email',
    value: site.email,
    href: `mailto:${site.email}`,
  },
  {
    label: 'GitHub',
    value: 'github.com/bryanjiang15',
    href: site.github,
    external: true,
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/bryanbj15',
    href: site.linkedin,
    external: true,
  },
  {
    label: 'Resume',
    value: 'Download PDF ↓',
    href: site.resumeHref,
    accent: true,
    download: site.resumeFilename,
  },
]

export type Experience = {
  role: string
  company: string
  period: string
  bullets: string[]
}

export const experience: Experience[] = [
  {
    role: 'Applied AI Software Engineer Intern',
    company: 'Microsoft, Redmond, WA',
    period: 'May 2026 – Aug 2026',
    bullets: [
      'Built a tab-group context system for Copilot in Edge (C++, Chromium) enabling parallel AI workflows for millions of users.',
      'Automated the bug-to-PR pipeline with a multi-agent Copilot system; cut session load time 80% with background loading and copy-on-write caching.',
    ],
  },
  {
    role: 'Software Engineer',
    company: 'Here Technologies, Ann Arbor, MI',
    period: 'Oct 2025 – Present',
    bullets: [
      'Built a pipeline fusing satellite imagery and geospatial data to auto-detect entry points for large public venues.',
      'Applied CV and navigation algorithms (Python, Scala, Java, OpenCV, GeoPandas) and deployed on AWS for crowd-aware, accessible routing.',
    ],
  },
  {
    role: 'Software Engineer Intern',
    company: 'Clark Associates, Ann Arbor, MI',
    period: 'May 2025 – Dec 2025',
    bullets: [
      'Shipped account-history features for a multi-tenant e-commerce platform (.NET, React, TypeScript).',
      'Cut query latency ~80% with MSSQL stored procedures; streamlined CI/CD and added Sentry and Kubernetes monitoring.',
    ],
  },
]

export type ProjectLink = {
  label: string
  href: string
}

export type MoodImage = {
  src: string
  alt: string
  /** Percentage-based free-flow placement (no rotation). */
  style: {
    top: string
    left: string
    width: string
    height: string
  }
}

export type MoodDriftContent = {
  images: string[]
  texts: string[]
}

export type Project = {
  id: string
  title: string
  tagline: string
  period: string
  tags: string[]
  highlight?: boolean
  /** Short bullets for about / side summaries */
  bullets: string[]
  /** Full overview from prior portfolio — only set for implemented pages */
  overview?: string
  links?: ProjectLink[]
  demoEmbed?: { src: string; title: string }
  mood?: MoodImage[]
  /** Background drift wall — images + text scraps that scroll forever */
  moodDrift?: MoodDriftContent
  implemented?: boolean
}

/** Shared placeholder drift until per-project media is wired. */
export const placeholderMoodDrift: MoodDriftContent = {
  images: [
    glitchEffect,
    tcgThumb,
    tcgGallery1,
    humanshapeThumb,
    eldritchThumb,
    tailsGallery1,
    tcgGallery2,
    humanshapeGallery,
  ],
  texts: [
    'placeholder scrap — rewrite me',
    'signal / noise / signal',
    'draft note · ignore chronology',
    'frame buffer leaking into the margin',
    'TODO: swap for real project residue',
    'soft glitch · pastel bleed',
    'lorem fragment stuck on loop',
    'field recording of a half-finished build',
    'meta / ruleset / agent / again',
    'this wall is temporary scenery',
  ],
}

export const projects: Project[] = [
  {
    id: 'ai-agent',
    title: 'RiftUnbound — Riftbound AI',
    tagline: 'An LLM agent that plans and improves its own tactics.',
    period: 'March 2026 – Present',
    tags: ['Godot', 'Python', 'FastAPI', 'OpenAI API', 'Game-Tree Search'],
    highlight: true,
    implemented: true,
    mood: [
      {
        src: riftunboundThumbnail,
        alt: 'RiftUnbound thumbnail',
        style: { top: '0%', left: '0%', width: '52%', height: '48%' },
      },
      {
        src: riftunboundLog,
        alt: 'RiftUnbound log',
        style: { top: '6%', left: '56%', width: '42%', height: '40%' },
      },
      {
        src: riftunboundGallery,
        alt: 'RiftUnbound gallery',
        style: { top: '54%', left: '18%', width: '58%', height: '44%' },
      },
    ],
    moodDrift: {
      images: [victory, shop, slop, copilot, thinking],
      texts: ['Gameplay agents', 'three prototypes', '$1000 and 34 packs later', 'AI evaluation pipeline', 'Is this weird', '2-1 record', 'Just let it be', 'pewpewpewpewpewpewpewpew', 'Make sure to update your shipping address']
    },
    bullets: [
      'Full rules engine for Riftbound TCG in Godot, with a Python FastAPI AI opponent powered by OpenAI.',
      'Hybrid LLM+Score-based tree search algorithm AI Agent: LLM plan and set strategy policy; beam search and a tunable evaluation function choose concrete moves.',
      'Self-play and scoring-weight tuning loop that benchmarks and strengthens the agent over time.',
    ],
    overview:
      'RiftUnbound is a digital rules engine and AI gameplay agent for Riftbound trading card game. Built in Godot, it implements the full game loop—turns, combat, resources, and card abilities driven by data definitions. A separate Python FastAPI service powers the AI with OpenAI models: the agent has a multi-staged planning pipeline using tools and beam-search algorithm to make calculated decisions, while the engine searches candidate lines and score each position. Every move is validated against the real rules, and a self-play pipeline captures decisions so evaluation weights can be tuned and compared over time.',
    links: [{ label: 'Source Code', href: 'https://github.com/bryanjiang15/RiftUnbound' }],
  },
  {
    id: 'tcg-engine',
    title: 'AI-Driven Trading Card Engine',
    tagline: 'A game engine that writes its own card games.',
    period: '2025',
    tags: ['Node.js', 'Pytorch', 'Sqlite', 'OpenAI API', 'Python', 'Unity'],
    highlight: true,
    implemented: true,
    bullets: [
      'Generates full TCG rulesets, abilities, and sprite assets from natural-language input.',
      'Custom Python SDK and agent compiler turning text and visual node graphs into game logic.',
      'Async multi-agent infrastructure cut API latency 3x for real-time simulation testing.',
    ],
    overview:
      'As a personal project, I created a trading card game simulation and development toolkit using OpenAI agents and Unity ML-Agents. The purpose of this project is to provide game developers a flexible tool that can convert text-input game components such as new card abilities, new game rules, and art. Users can create interactive trading cards with unique abilities by just inputting a text description. The game can simulate user-created cards in the game environment and calculate strength and meta-relevancy. Upcoming features include rule and player interaction generation, block-based coding, Monte-Carlo Tree Search AI simulation for meta analysis, and maybe dipping a toe into board games.',
    links: [{ label: 'Source Code', href: 'https://github.com/bryanjiang15/cards' }],
    mood: [
      {
        src: tcgThumb,
        alt: 'TCG Simulator main interface',
        style: { top: '0%', left: '0%', width: '52%', height: '48%' },
      },
      {
        src: tcgGallery1,
        alt: 'TCG Simulator card generation',
        style: { top: '6%', left: '56%', width: '42%', height: '40%' },
      },
      {
        src: tcgGallery2,
        alt: 'TCG Simulator gameplay view',
        style: { top: '54%', left: '18%', width: '58%', height: '44%' },
      },
    ],
    moodDrift: {
      images: [flowchart, gameboard, cardboard, scratch, math],
      texts: ['AAAHHHHAHAHAH', 'Scratch it!', 'Snap it!', 'TCG assembly', 'TCG 01s', 'Reaction system', 'This afternoon\'s math class will be replaced by a coding bootcamp run by teen volunteers'],
    },
  },
  {
    id: 'humanshape',
    title: 'HumanShape',
    tagline: '3D body-shape analysis for design research.',
    period: '2024',
    tags: ['Python', 'Flask', 'Dash', 'VTK.js', 'Vedo', 'PCA'],
    implemented: true,
    bullets: [
      'Visualizes and analyzes large human-body-shape datasets for human-centered design research.',
      'Calculates model dimensions and simulates hand postures via PCA and regression.',
    ],
    overview:
      'Developed a 3D Geometry Visualization Tool using Python, Flask, and Dash to render complex human body shape datasets, enabling parametric studies for human-centered product designs and research. The web app features full model dimension analysis, allowing users to calculate dimensions and simulate hand postures on large datasets using principal component analysis and regression techniques.',
    links: [{ label: 'Live Demo', href: 'https://umtribiosci.pythonanywhere.com/' }],
    mood: [
      {
        src: humanshapeThumb,
        alt: 'HumanShape 3D analysis tool',
        style: { top: '0%', left: '0%', width: '56%', height: '52%' },
      },
      {
        src: humanshapeGallery,
        alt: 'HumanShape geometry visualization',
        style: { top: '38%', left: '42%', width: '54%', height: '54%' },
      },
    ],
    moodDrift: {
      images: [dummy, cad, helmet, cubicle, measure],
      texts: ['Analysis analysis paralysis', 'Carseats salesman', 'PCAR analysis', 'Headphones and all that fits on your nose', 'Custom dimensions', 'Look at my face!', 'Distributed curve analysis', 'Hi would you be interested to take a look at my poster?', 'Is this a drawing tool?'],
    },
  },
  {
    id: 'eldritch',
    title: 'Corrupt Eldritch Order',
    tagline: 'A rogue-like shoot-’em-up, shipped on Steam.',
    period: '2024',
    tags: ['Unity', 'C#', 'Game Design', 'Jira'],
    highlight: true,
    implemented: true,
    bullets: [
      'Rogue-like shoot-’em-up with procedurally generated levels, enemies, and weapons.',
      'Designed and implemented every enemy behavior, including a final boss with 30+ abilities.',
    ],
    overview:
      "Developed a rogue-like shoot-em-up game with procedurally generated levels, enemies, and weapons as a designer and programmer at UMich's game development studio WolverineSoft. I created and implemented all enemy state behaviours, including a final boss with 30+ different abilities. The game was built using Unity and C# and is available on Steam and Itch.io.",
    links: [
      {
        label: 'Play on Itch.io',
        href: 'https://wolverinesoft-studio.itch.io/corrupt-eldritch-order',
      },
    ],
    demoEmbed: {
      src: 'https://www.youtube.com/watch?v=Jt_S_6pmxDI',
      title: 'Corrupt Eldritch Order demo video',
    },
    mood: [
      {
        src: eldritchThumb,
        alt: 'Corrupt Eldritch Order key art',
        style: { top: '8%', left: '8%', width: '78%', height: '78%' },
      },
    ],
    moodDrift: {
      images: [controller, gachiakuta, ceo, eldritch, lasertag],
      texts: ['Rogue-like', 'Procedurally generated levels', 'The title was HIPPA violation', 'Final boss with 30+ abilities', 'Gachiakuta', 'Designing is fun in concept', 'is this randomsauce?'],
    },
  },
  {
    id: 'tails-of-war',
    title: 'Tails of War',
    tagline: 'A turn-based strategy game about positioning.',
    period: '2023',
    tags: ['Unity', 'C#', 'Game AI', 'Design'],
    implemented: true,
    bullets: [
      'Turn-based multiplayer strategy game centered on unit positioning and resource management.',
      'Built adaptable core AI governing opponent behavior.',
    ],
    overview:
      "Tails of War is a multi-player turn-based strategy game with a focus on unit positioning and resource management. I worked as a game designer and programmer on the project, creating the game's core AI with highly adaptable behaviours.",
    links: [
      {
        label: 'Play on Itch.io',
        href: 'https://wolverinesoft-studio.itch.io/tails-of-war',
      },
    ],
    demoEmbed: {
      src: 'https://www.youtube.com/embed/Jt_S_6pmxDI?si=CRzyLjyP-zNgr_CZ',
      title: 'Tails of War demo video',
    },
    mood: [
      {
        src: tailsThumb,
        alt: 'Tails of War title art',
        style: { top: '0%', left: '0%', width: '50%', height: '46%' },
      },
      {
        src: tailsGallery1,
        alt: 'Tails of War gameplay',
        style: { top: '8%', left: '54%', width: '44%', height: '42%' },
      },
      {
        src: tailsGallery2,
        alt: 'Tails of War unit view',
        style: { top: '54%', left: '22%', width: '52%', height: '44%' },
      },
    ],
    moodDrift: {
      images: [tft, chess, cats],
      texts: ['Turn-based strategy', 'Unit positioning', 'Resource management', 'Is it AI?', 'I forgot my juicebox paired with my lunchable', 'Please someone choose me I\'ll do anything'],
    },
  },
]

export const implementedProjects = projects.filter((p) => p.implemented)

export const highlightProjects = projects.filter((p) => p.highlight)

export const neonAccents = ['#ff8fd8', '#b48cff', '#6fa8ff'] as const

export function getProject(id: string) {
  return projects.find((p) => p.id === id)
}

/** Spotify / Apple Music / local audio for in-page streaming. */
export type MusicStream =
  | { provider: 'spotify'; kind: 'track' | 'album' | 'playlist'; id: string }
  | { provider: 'apple'; embedUrl: string }
  | { provider: 'audio'; src: string; title?: string }

export type MusicTrack = {
  id: string
  title: string
  period?: string
  tags: string[]
  blurb?: string
  mood?: MoodImage[]
  moodDrift?: MoodDriftContent
  /** Short playable demo — Spotify/Apple embed or local audio file */
  stream?: MusicStream
  links?: ProjectLink[]
  bpm?: number
}

export type ListeningTrack = {
  id: string
  title: string
  artist: string
  artwork: string
  /** Prefer Spotify for full streaming; Apple Music embed also works */
  stream: MusicStream
  href?: string
  bpm?: number
}

export function streamEmbedSrc(stream: MusicStream): string | null {
  if (stream.provider === 'spotify') {
    // Strip share query params (?si=...) — they break the embed URL
    const id = stream.id.split('?')[0] ?? stream.id
    return `https://open.spotify.com/embed/${stream.kind}/${id}?utm_source=generator&theme=0`
  }
  if (stream.provider === 'apple') return stream.embedUrl
  return null
}

/**
 * Original music — swap titles / mood / stream IDs with your releases.
 * Spotify: open a track → Share → Embed → copy the id from /embed/track/{id}
 * Apple: Music → Share → Embed → paste the iframe src as embedUrl
 * Local: drop an mp3 in public/music/ and use { provider: 'audio', src: '/music/....mp3' }
 */
export const musicTracks: MusicTrack[] = [
  {
    id: 'hypnogogia',
    title: 'Hypnogogia',
    tags: [],
    bpm: 140,
    blurb: "",
    mood: [
      {
        src: hypnogogia,
        alt: 'Hypnogogia title art',
        style: { top: '25%', left: '25%', width: '55%', height: '70%' },
      },

    ],
    moodDrift: {
      images: [sleep, splatoon, neon, alarm],
      texts: [
        'kookeehdaaldhaaaidodkkkkkkk',
        'zzzzzzzz',
        'so there was a dinosaur and then it kidnapped them all and I snuck into the trunk of a bus and woke up in a hotel and',
        'bliip',
        'one and a half hour',
        'noise'
      ],
    },
    // Add your Spotify/Apple/audio demo here, e.g.:
    stream: { provider: 'spotify', kind: 'track', id: '7ga7h94pND2q6LNUbzLaws?si=60afb603fb354b88' },
  },
  {
    id: 'Logue',
    title: 'Logue',
    tags: [],
    blurb: "",
    bpm: 142,
    mood: [
      {
        src: logue,
        alt: 'Logue title art',
        style: { top: '25%', left: '25%', width: '55%', height: '70%' },
      },
    ],
    moodDrift: {
      images: [loguetown, sunrise, cloudy],
      texts: [
        'space odyssey monkeys fighting',
        'execution stand',
        'okay let\'s record that again go to floor 6',
        'I\'m just like him',
        'click clicky clickeity cliktiuer',
      ],
    },
    // Add your Spotify/Apple/audio demo here, e.g.:
    stream: { provider: 'spotify', kind: 'track', id: '3zdiKqZECWHpWZ3j4DlLpn?si=14058159f5774d16' },
  },
  {
    id: 'BeepBoop',
    title: 'BeepBoop',
    tags: [],
    blurb: "",
    bpm: 120,
    mood: [
      {
        src: beepboop,
        alt: 'BeepBoop title art',
        style: { top: '25%', left: '25%', width: '55%', height: '70%' },
      },
    ],
    moodDrift: {
      images: [robot, laser, dj],
      texts: [
        'beep beep bobop bep boop beep',
        '01010110111000010010110',
        '0101011',
        '11100101000111',
        '00010 0101110 111010111',
        'boop',
      ],
    },
    // Add your Spotify/Apple/audio demo here, e.g.:
    stream: { provider: 'spotify', kind: 'track', id: '70jqcwejF7p4HpjXEMPXVR?si=7c7973f715224657' },
  },
  {
    id: 'One-Piece-Opening-45',
    title: 'One Piece Opening 45',
    tags: [],
    blurb: "",
    bpm: 120,
    mood: [
      {
        src: what,
        alt: 'One Piece Opening 45 title art',
        style: { top: '25%', left: '25%', width: '55%', height: '70%' },
      },
    ],
    moodDrift: {
      images: [onepiece, mario, shrug],
      texts: [
        'what?',
        'what did you say?',
        'huh?',
        'urr...',
        'yeah',
        'coool',
      ],
    },
    // Add your Spotify/Apple/audio demo here, e.g.:
    stream: { provider: 'spotify', kind: 'track', id: '3AvYCgNsGv3nVZiFWL91WW?si=00b8458af3cc4f5e' },
  },
]

/** Songs currently in rotation — Spotify embeds stream in-page. */
export const listeningNow: ListeningTrack[] = [
  {
    id: 'mouth-flash',
    title: 'Mouth Flash',
    artist: 'Hakushi Hasegawa',
    artwork:
      'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e023c6122ac9bca56da016231de',
    stream: { provider: 'spotify', kind: 'track', id: '5QneXGb9baT7XSjqZvQdYl' },
    href: 'https://open.spotify.com/track/5QneXGb9baT7XSjqZvQdYl',
    bpm: 230,
  },
  {
    id: 'total-euphoria',
    title: 'Total Euphoria',
    artist: 'Caroline',
    bpm: 140,
    artwork:
      'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02d81dcb2fcf72fccce04ac381',
    stream: { provider: 'spotify', kind: 'track', id: '5GHYjIrLwK4e7WTTZZcJt5' },
    href: 'https://open.spotify.com/track/5GHYjIrLwK4e7WTTZZcJt5',
  },
  {
    id: 'i-can-see-mountains',
    title: 'I Can See Mountains',
    artist: 'Hakushi Hasegawa',
    bpm: 234,
    artwork:
      'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02b5979a24b4f1fac47f82fe20',
    stream: { provider: 'spotify', kind: 'track', id: '4o5kJXXguBaum9G2yjT8sY' },
    href: 'https://open.spotify.com/track/4o5kJXXguBaum9G2yjT8sY',
  },
  {
    id: 'pppppfffffuuuuuiiiii',
    title: "!'¨'..∵×*''¨'^*+..o0OO0o..+*^'¨''*×∵..'¨'!",
    artist: 'pppppfffffuuuuuiiiii',
    bpm: 138,
    artwork:
      'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02ae3fc36bdb1cc7d429506d4e',
    stream: { provider: 'spotify', kind: 'track', id: '7EFbHDFj2WnbDPDm2r0BAF' },
    href: 'https://open.spotify.com/track/7EFbHDFj2WnbDPDm2r0BAF',
  },
  {
    id: 'told-you-so',
    title: 'Told You So',
    artist: 'Count Basie',
    bpm: 115,
    artwork:
      'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02bbeb29be4a0cfabd7c9adbc8',
    stream: { provider: 'spotify', kind: 'track', id: '4wWrJhZGOD9O0A69qBPw3K' },
    href: 'https://open.spotify.com/track/4wWrJhZGOD9O0A69qBPw3K',
  },
  {
    id: 'crime-and-punishment',
    title: 'Crime and Punishment',
    artist: 'Ado',
    bpm: 235,
    artwork:
      'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e025e1b5cb7f14f2f7870938e99',
    stream: { provider: 'spotify', kind: 'track', id: '7r46PpiDGgW7cQwXMHS5lU' },
    href: 'https://open.spotify.com/track/7r46PpiDGgW7cQwXMHS5lU',
  },
  {
    id: 'life-could-be-a-cloud',
    title: 'Life Could Be a Cloud',
    artist: 'MEMORIALS',
    bpm: 177,
    artwork:
      'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02d99ceb951d9b936834aed848',
    stream: { provider: 'spotify', kind: 'track', id: '3xP5vrK9Am5kRZyrgrwhzQ' },
    href: 'https://open.spotify.com/track/3xP5vrK9Am5kRZyrgrwhzQ',
  },
]
