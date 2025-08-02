import { relations } from 'drizzle-orm';
import {
  AnyPgColumn,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
  id: varchar({ length: 10 }).notNull().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  biography: varchar({ length: 1024 }),
  username: varchar({ length: 255 }).notNull().unique(),
  avatar: varchar({ length: 1024 }),
});

export const postsTable = pgTable('posts', {
  id: uuid().primaryKey().defaultRandom(),
  text: text().notNull(),
  authorID: varchar({ length: 10 })
    .notNull()
    .references(() => usersTable.id),
  publishedAt: timestamp().notNull().defaultNow(),
  replayToID: uuid().references((): AnyPgColumn => postsTable.id, {
    onDelete: 'cascade',
  }),
});

export const postRepliesRelation = relations(postsTable, ({ one, many }) => ({
  author: one(usersTable, {
    fields: [postsTable.authorID],
    references: [usersTable.id],
    relationName: 'author',
  }),
  replays: many(postsTable, {
    relationName: 'replays',
  }),
  replayTo: one(postsTable, {
    fields: [postsTable.replayToID],
    references: [postsTable.id],
    relationName: 'replays',
  }),
}));
