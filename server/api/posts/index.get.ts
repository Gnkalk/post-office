export default defineEventHandler(() =>
  db.query.postsTable.findMany({
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
