export default defineEventHandler(async (event) => {
  const { id: postID } = getRouterParams(event);

  if (!postID)
    return sendError(
      event,
      createError({ statusCode: 422, message: 'Invalid post ID' })
    );

  return await db.query.postsTable.findFirst({
    where: ({ id }, { eq }) => eq(id, postID.toString()),
    with: {
      author: {
        columns: {
          avatar: true,
          name: true,
          username: true,
        },
      },
      replays: {
        orderBy: ({ publishedAt }, { desc }) => desc(publishedAt),
        with: {
          author: {
            columns: {
              avatar: true,
              name: true,
              username: true,
            },
          },
        },
      },
    },
  });
});
