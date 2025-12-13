export interface Track {
  id: number;
  title: string;
  genre: string;
  url: string;
  created_at: string;
  description: string;
  duration: string;
  bpm: number;
  permissions: {
    use_in_videos: boolean;
    credit_required: boolean;
  };
}

// SoundCloud Username
const SC_USERNAME = "m3galodn81";

export const sampleTracks: Track[] = [
  // 2023 Tracks
  {
    id: 1,
    title: "Sunrise",
    genre: "Artcore",
    url: `https://soundcloud.com/${SC_USERNAME}/sunrise`,
    created_at: "2021-07-08T10:00:00Z",
    description: "",
    duration: "1:10",
    bpm: 160,
    permissions: {
      use_in_videos: true,
      credit_required: true
    }
  },
  {
    id: 2,
    title: "Azure Memories",
    genre: "Drum & Bass",
    url: `https://soundcloud.com/${SC_USERNAME}/azure-memories`,
    created_at: "2023-09-22T14:30:00Z",
    description: "Melodic DnB with atmospheric pads and emotional piano lines.",
    duration: "4:12",
    bpm: 174,
    permissions: {
      use_in_videos: true,
      credit_required: true
    }
  },
  {
    id: 3,
    title: "Glitch In The Reality",
    genre: "Glitch Hop",
    url: `https://soundcloud.com/${SC_USERNAME}/glitch-in-the-reality`,
    created_at: "2023-08-05T09:15:00Z",
    description: "Experimental glitch hop track. Trying something new with granular synthesis.",
    duration: "3:20",
    bpm: 110,
    permissions: {
      use_in_videos: true,
      credit_required: true
    }
  },
  // 2022 Tracks
  {
    id: 4,
    title: "Nightfall Protocol",
    genre: "Cyberpunk",
    url: `https://soundcloud.com/${SC_USERNAME}/nightfall-protocol`,
    created_at: "2022-12-10T18:00:00Z",
    description: "Dark synthwave meets breakcore. The city never sleeps.",
    duration: "3:55",
    bpm: 160,
    permissions: {
      use_in_videos: true,
      credit_required: true
    }
  },
  {
    id: 5,
    title: "Undefined Variable",
    genre: "Artcore",
    url: `https://soundcloud.com/${SC_USERNAME}/undefined-variable`,
    created_at: "2022-05-20T12:00:00Z",
    description: "My submission for the seasonal rhythm game contest.",
    duration: "2:45",
    bpm: 180,
    permissions: {
      use_in_videos: true,
      credit_required: true
    }
  },
  // 2021 Tracks
  {
    id: 6,
    title: "Hello World",
    genre: "Electronic",
    url: `https://soundcloud.com/${SC_USERNAME}/hello-world`,
    created_at: "2021-01-01T00:00:00Z",
    description: "First upload. Just testing the waters.",
    duration: "3:10",
    bpm: 128,
    permissions: {
      use_in_videos: true,
      credit_required: true
    }
  }
];

export const generalPermissions = [
  {
    icon: "🎥",
    title: "Content Creation",
    description: "You can use my music in your YouTube videos, Twitch streams, or other content creation platforms."
  },
  {
    icon: "💰",
    title: "Monetization",
    description: "You may monetize your videos that use my music, provided you follow the specific track permissions."
  },
  {
    icon: "📝",
    title: "Credit Required",
    description: "You must always credit me (M3galodon) and link back to the original track or my SoundCloud profile."
  },
  {
    icon: "🚫",
    title: "No Redistribution",
    description: "Do not re-upload my tracks as-is or sell them on other platforms."
  }
];