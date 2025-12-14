export interface Track {
  id: number;
  title: string;
  genre: string;
  url: string;
  created_at: string;
  description: string;
  duration: string;
  bpm: string | number;
  permissions: {
    use_in_videos: boolean;
    credit_required: boolean;
  };
}

// SoundCloud Username
const SC_USERNAME = "m3galodn81";

export const sampleTracks: Track[] = [
  // 2021
  {
    id: 1,
    title: "Sunrise",
    genre: "Ambient",
    url: `https://soundcloud.com/${SC_USERNAME}/sunrise`,
    created_at: "2021-07-08T00:00:00Z",
    description: "First Song in general (LMMS era)",
    duration: "1:10",
    bpm: 160,
    permissions: { use_in_videos: false, credit_required: true } // Red
  },
  {
    id: 2,
    title: "Beginning",
    genre: "Unknown",
    url: `https://soundcloud.com/${SC_USERNAME}/beginning`,
    created_at: "2021-07-10T00:00:00Z",
    description: "",
    duration: "1:40",
    bpm: 140,
    permissions: { use_in_videos: false, credit_required: true } // Red
  },
  {
    id: 3,
    title: "Flashback",
    genre: "Unknown",
    url: `https://soundcloud.com/${SC_USERNAME}/flashback`,
    created_at: "2021-07-21T00:00:00Z",
    description: "",
    duration: "3:02",
    bpm: 150,
    permissions: { use_in_videos: false, credit_required: true } // Red
  },
  {
    id: 4,
    title: "|/4|",
    genre: "Unknown",
    url: `https://soundcloud.com/${SC_USERNAME}/4`,
    created_at: "2021-08-01T00:00:00Z",
    description: "-",
    duration: "2:07",
    bpm: 140,
    permissions: { use_in_videos: false, credit_required: true } // Red
  },

  // 2023
  {
    id: 5,
    title: "realize",
    genre: "Artcore?",
    url: `https://soundcloud.com/${SC_USERNAME}/realize`,
    created_at: "2023-07-12T00:00:00Z",
    description: "Best of LMMS 10 Submission Song",
    duration: "1:49",
    bpm: 190,
    permissions: { use_in_videos: true, credit_required: false } // Yellow
  },
  {
    id: 6,
    title: "-lost-",
    genre: "Artcore?",
    url: `https://soundcloud.com/${SC_USERNAME}/lost`,
    created_at: "2023-07-14T00:00:00Z",
    description: "-",
    duration: "1:50",
    bpm: 190,
    permissions: { use_in_videos: true, credit_required: false } // Yellow
  },
  {
    id: 7,
    title: "light-rays",
    genre: "Kawaii?",
    url: `https://soundcloud.com/${SC_USERNAME}/light-rays`,
    created_at: "2023-08-14T00:00:00Z",
    description: "First Song in REAPER",
    duration: "2:31",
    bpm: 200,
    permissions: { use_in_videos: true, credit_required: false } // Green
  },
  {
    id: 8,
    title: "unStable",
    genre: "Unknown",
    url: `https://soundcloud.com/${SC_USERNAME}/unstable`,
    created_at: "2023-10-21T00:00:00Z",
    description: "Rushed song so pain.",
    duration: "4:04",
    bpm: 180,
    permissions: { use_in_videos: true, credit_required: false } // Green
  },
  {
    id: 9,
    title: "|\\/|-\\/-|",
    genre: "Speedcore?",
    url: `https://soundcloud.com/${SC_USERNAME}/mvi`,
    created_at: "2023-11-23T00:00:00Z",
    description: "\"M-V-I\" / First Song in FL Studio.",
    duration: "3:08",
    bpm: 190,
    permissions: { use_in_videos: false, credit_required: true } // Red
  },
  {
    id: 10,
    title: "passing-by",
    genre: "Piano",
    url: `https://soundcloud.com/${SC_USERNAME}/passing-by`,
    created_at: "2023-12-08T00:00:00Z",
    description: "-",
    duration: "1:42",
    bpm: "190?",
    permissions: { use_in_videos: false, credit_required: true } // Red
  },

  // 2024
  {
    id: 11,
    title: "Alius",
    genre: "Unknown",
    url: `https://soundcloud.com/${SC_USERNAME}/alius`,
    created_at: "2024-03-16T00:00:00Z",
    description: "-",
    duration: "1:56",
    bpm: 190,
    permissions: { use_in_videos: false, credit_required: true } // Red
  },
  {
    id: 12,
    title: "heartless",
    genre: "Hard Renaissance",
    url: `https://soundcloud.com/${SC_USERNAME}/heartless`,
    created_at: "2024-03-30T00:00:00Z",
    description: "Cosmic Radio 2024 Submission Song",
    duration: "1:58",
    bpm: 180,
    permissions: { use_in_videos: true, credit_required: false } // Green
  },
  {
    id: 13,
    title: "ʀɛʍɨռɨsƈɛ",
    genre: "Artcore",
    url: `https://soundcloud.com/${SC_USERNAME}/reminisce`,
    created_at: "2024-05-11T00:00:00Z",
    description: "Reminisce",
    duration: "2:20",
    bpm: 190,
    permissions: { use_in_videos: true, credit_required: false } // Green
  },
  {
    id: 14,
    title: "i-let-my-cat-cook-this-banger",
    genre: "House?",
    url: `https://soundcloud.com/${SC_USERNAME}/cat-cook-banger`,
    created_at: "2024-06-12T00:00:00Z",
    description: "i dont have a cat 😭",
    duration: "2:50",
    bpm: 191,
    permissions: { use_in_videos: true, credit_required: false } // Green
  },
  {
    id: 15,
    title: "severity",
    genre: "Hardcore?",
    url: `https://soundcloud.com/${SC_USERNAME}/severity`,
    created_at: "2024-07-19T00:00:00Z",
    description: "-",
    duration: "2:56",
    bpm: 234,
    permissions: { use_in_videos: true, credit_required: false } // Green
  },
  {
    id: 16,
    title: "fallen-singularity",
    genre: "Hardcore?",
    url: `https://soundcloud.com/${SC_USERNAME}/fallen-singularity`,
    created_at: "2024-10-29T00:00:00Z",
    description: "-",
    duration: "3:20",
    bpm: 202,
    permissions: { use_in_videos: true, credit_required: false } // Green
  },
  {
    id: 17,
    title: "chrononihil",
    genre: "Artcore",
    url: `https://soundcloud.com/${SC_USERNAME}/chrononihil`,
    created_at: "2024-12-10T00:00:00Z",
    description: "-",
    duration: "2:37",
    bpm: 170,
    permissions: { use_in_videos: true, credit_required: false } // Green
  },

  // 2025
  {
    id: 18,
    title: "nevertheless",
    genre: "Hardcore?",
    url: `https://soundcloud.com/${SC_USERNAME}/nevertheless`,
    created_at: "2025-02-07T00:00:00Z",
    description: "BPM Changes / This is not a sequel of heartless",
    duration: "4:03",
    bpm: "[200]",
    permissions: { use_in_videos: true, credit_required: false } // Green
  },
  {
    id: 19,
    title: "Xperiment: 1",
    genre: "Dubstep / House?",
    url: `https://soundcloud.com/${SC_USERNAME}/xperiment-1`,
    created_at: "2025-04-21T00:00:00Z",
    description: "AF Song but I delayed",
    duration: "2:15",
    bpm: 300,
    permissions: { use_in_videos: false, credit_required: true } // Red
  }
];

export const generalPermissions = [
  {
    icon: "🎥",
    title: "Content Creation",
    description: "You can use my music in your YouTube videos, Twitch streams, or other content creation platforms as long as you credit me."
  },
  // {
  //   icon: "💰",
  //   title: "Monetization",
  //   description: "You may monetize your videos that use my music, provided you follow the specific track permissions."
  // },
  {
    icon: "📝",
    title: "Credit Required",
    description: "You must always credit me (R3ality) and link back to the original track or my SoundCloud profile."
  },
  {
    icon: "🚫",
    title: "No Redistribution",
    description: "Do not re-upload my tracks as-is or sell them on other platforms."
  }
];