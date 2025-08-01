export default defineEventHandler((event) => {
  const { id: usernameParam } = getRouterParams(event);

  if (!usernameParam)
    return sendError(
      event,
      createError({ statusCode: 422, message: 'Invalid username' })
    );

  return db.query.usersTable.findFirst({
    where: ({ username }, { eq }) => eq(username, usernameParam.toString()),
  });
});
