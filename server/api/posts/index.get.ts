export default defineEventHandler(() =>
  db.query.postsTable.findMany({
    where: ({ replayToID }, { isNull }) => isNull(replayToID),
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
