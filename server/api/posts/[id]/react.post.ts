import { and, eq } from 'drizzle-orm';
import { z } from 'zod/v4';
import { reactionsTable, reactionTypeEnum } from '~~/server/utils/schema';

const bodySchema = z.object({
  type: z.enum(reactionTypeEnum.enumValues),
});

export default defineEventHandler(async (event) => {
  const { id: postID } = getRouterParams(event);

  if (!postID)
    return sendError(
      event,
      createError({ statusCode: 422, message: 'Invalid post ID' })
    );

  const { success: validBody, data: body } = await readValidatedBody(
    event,
    bodySchema.safeParse
  );

  if (!validBody) {
    return sendError(
      event,
      createError({
        statusCode: 422,
        message: 'Invalid body',
      })
    );
  }

  const session = getCookie(event, 'tg_user');

  if (!session)
    return sendError(
      event,
      createError({ statusCode: 401, message: 'Unauthorized' })
    );

  const decodedSession = JSON.parse(
    Buffer.from(session, 'base64').toString('utf-8')
  );

  // Check if reaction already exists
  const existingReaction = await db
    .select()
    .from(reactionsTable)
    .where(
      and(
        eq(reactionsTable.userID, decodedSession.id),
        eq(reactionsTable.postID, postID)
      )
    )
    .limit(1);

  if (existingReaction.length > 0) {
    // Remove existing reaction (toggle off)
    await db
      .delete(reactionsTable)
      .where(
        and(
          eq(reactionsTable.userID, decodedSession.id),
          eq(reactionsTable.postID, postID)
        )
      );

    // if not click on another reaction
    if (existingReaction[0].type === body.type)
      return { message: 'Succesfully removed' };
  }

  // Add new reaction
  await db.insert(reactionsTable).values({
    userID: decodedSession.id,
    postID,
    type: body.type,
  });
  return { message: 'Succesfully added/changed' };
});
