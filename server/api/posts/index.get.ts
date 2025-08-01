export default defineEventHandler(() =>
  db.query.postsTable.findMany({
    where: ({ replayToID }, { isNull }) => isNull(replayToID),
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
  })
);
