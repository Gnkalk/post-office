import { and, eq, sql } from 'drizzle-orm';
import { reactionsTable } from '~~/server/utils/schema';

export default defineEventHandler(async (event) => {
  const { id: postID } = getRouterParams(event);

  if (!postID)
    return sendError(
      event,
      createError({ statusCode: 422, message: 'Invalid post ID' })
    );

  const postReactions = await db
    .select({
      type: reactionsTable.type,
      count: sql<number>`count(*)`,
    })
    .from(reactionsTable)
    .where(eq(reactionsTable.postID, postID))
    .groupBy(reactionsTable.type);

  const session = getCookie(event, 'tg_user');

  if (!session) return { reactions: postReactions };

  const decodedSession = JSON.parse(
    Buffer.from(session, 'base64').toString('utf-8')
  );

  const userReaction = await db
    .select({
      type: reactionsTable.type,
    })
    .from(reactionsTable)
    .where(
      and(
        eq(reactionsTable.userID, decodedSession.id),
        eq(reactionsTable.postID, postID)
      )
    )
    .limit(1);

  return {
    reactions: postReactions,
    userReaction: userReaction[0]?.type ?? null,
  };
});
