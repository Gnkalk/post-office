export default defineEventHandler(async (event) => {
  const { id: postID } = getQuery(event);

  if (!postID)
    return createError({ statusCode: 400, message: 'Invalid query' });

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
