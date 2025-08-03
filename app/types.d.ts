type TelegramUser = {
  auth_date: number;
  first_name: string;
  id: number;
  hash: string;
  photo_url: string;
  username: string;
} | null;

type Session = (TelegramUser & { loggedIn: true }) | { loggedIn: false };

type NullableKeys<T, K extends keyof T> = Omit<T, K> & {
  [P in K]?: T[P];
};

type Post = typeof postsTable.$inferSelect & {
  author: NullableKeys<typeof usersTable.$inferSelect, 'id' | 'biography'>;
  replays?: Post[];
};

type Reaction = {
  type: 'like' | 'dislike' | 'joy' | 'poo' | 'moyai' | 'heart';
  count: number;
};

type Reactions = {
  reactions: Reaction[];
  userReaction?: Reaction['type'];
};
