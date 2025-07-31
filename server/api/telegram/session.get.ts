import * as crypto from 'node:crypto';

const handleUnauthorized = () => {
  return {
    loggedIn: false,
    status: 401,
    message: 'Unauthorized',
  };
};

export default eventHandler(async (event) => {
  try {
    const session = getCookie(event, 'tg_user');

    if (!session) return handleUnauthorized();

    const decodedCookie = JSON.parse(
      Buffer.from(session, 'base64').toString('utf-8')
    );

    if (Date.now() / 1000 - decodedCookie.auth_date > 86400)
      return handleUnauthorized();

    const telegramApiToken = process.env.TELEGRAM_TOKEN;

    if (!telegramApiToken)
      return {
        loggedIn: false,
        status: 500,
        body: 'Telegram bot token is not configured',
      };

    const secret = crypto
      .createHash('sha256')
      .update(telegramApiToken)
      .digest();

    const dataCheckString = [];
    for (const key in decodedCookie)
      if (key != 'hash') dataCheckString.push(key + '=' + decodedCookie[key]);

    const check_hash = crypto
      .createHmac('sha256', secret)
      .update(dataCheckString.sort().join('\n'))
      .digest('hex');

    return {
      loggedIn: check_hash == decodedCookie.hash,
      ...decodedCookie,
    };
  } catch (err) {
    console.error('Telegram Auth - ', err);
    return {
      loggedIn: false,
      status: 500,
      body: 'Internal Server Error',
    };
  }
});
