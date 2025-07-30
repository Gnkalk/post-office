import { postsTable } from '~~/server/utils/schema';
import { z } from 'zod/v4';

const bodySchema = z.object({
  text: z.string().min(1),
});

export default defineEventHandler(async (event) => {
  const {
    success: validBody,
    data: body,
    error,
  } = await readValidatedBody(event, bodySchema.safeParse);

  if (!validBody) {
    console.log(error);
    return createError({
      statusCode: 422,
      message: 'Invalid body',
    });
  }

  const session = getCookie(event, 'tg_user');

  if (!session)
    return createError({ statusCode: 401, message: 'Unauthorized' });

  const decodedCookie = JSON.parse(
    Buffer.from(session, 'base64').toString('utf-8')
  );

  const post = await db.insert(postsTable).values({
    author: decodedCookie.first_name,
    text: body.text,
  });

  return post;
});
