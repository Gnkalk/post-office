type TelegramUser = {
  auth_date: number;
  first_name: string;
  id: number;
  hash: string;
  photo_url: string;
  username: string;
} | null;

type Session = (TelegramUser & { loggedIn: true }) | { loggedIn: false };

type Post = typeof postsTable.$inferSelect & {
  author: typeof usersTable.$inferSelect;
  replays: Post[];
};
