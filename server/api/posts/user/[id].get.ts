export default defineEventHandler((event) => {
  const { id: userID } = getRouterParams(event);

  if (!userID)
    return sendError(
      event,
      createError({ statusCode: 422, message: 'Invalid user ID' })
    );

  return db.query.postsTable.findMany({
    where: ({ authorID, replayToID }, { eq, and, isNull }) =>
      and(eq(authorID, userID.toString()), isNull(replayToID)),
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
  });
});
