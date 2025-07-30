import { relations } from 'drizzle-orm';
import { AnyPgColumn, date, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

export const postsTable = pgTable('posts', {
  id: uuid().primaryKey().defaultRandom(),
  text: varchar({ length: 255 }).notNull(),
  author: varchar({ length: 255 }).notNull().default('Anonymous'),
  publishedAt: date().defaultNow(),
  replayToID: uuid().references((): AnyPgColumn => postsTable.id),
});

export const postRepliesRelation = relations(postsTable, ({ one, many }) => ({
  replaies: many(postsTable),
  replayTo: one(postsTable, {
    fields: [postsTable.replayToID],
    references: [postsTable.id],
  }),
}));
