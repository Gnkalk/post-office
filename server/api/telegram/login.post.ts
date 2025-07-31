import { z } from 'zod/v4';

const bodySchema = z.object({
  auth_date: z.number(),
  first_name: z.string(),
  hash: z.string(),
  id: z.number(),
  photo_url: z.string(),
  username: z.string(),
});

export default defineEventHandler(async (event) => {
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

  await db
    .insert(usersTable)
    .values({
      id: body.id.toString(),
      name: body.first_name,
      username: body.username,
      avatar: body.photo_url,
    })
    .onConflictDoUpdate({
      set: {
        name: body.first_name,
        username: body.username,
        avatar: body.photo_url,
      },
      target: usersTable.id,
    });

  console.log(body.first_name, ' Logged in');
  return {
    message: 'OK',
    user: body,
  };
});
