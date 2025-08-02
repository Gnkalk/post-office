import { and, eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const { id: postID } = getRouterParams(event);

  if (!postID)
    return sendError(
      event,
      createError({ statusCode: 422, message: 'Invalid post ID' })
    );

  const session = getCookie(event, 'tg_user');

  if (!session)
    return sendError(
      event,
      createError({ statusCode: 401, message: 'Unauthorized' })
    );

  const decodedSession = JSON.parse(
    Buffer.from(session, 'base64').toString('utf-8')
  );

  try {
    return await db
      .delete(postsTable)
      .where(
        and(
          eq(postsTable.id, postID.toString()),
          eq(postsTable.authorID, decodedSession.id)
        )
      );
  } catch (error) {
    return sendError(
      event,
      createError({ statusCode: 400, message: 'Invalid post ID' })
    );
  }
});
