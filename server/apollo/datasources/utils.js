/**
 *
 * I hate users
 * (auth and tokens and stuff)
 */

import jwt from 'jsonwebtoken';

// TODO GET THIS OUT OF HERE
const ACCESS_KEY = 'NEEDTOMAKESECRET';
const REFRESH_KEY = 'KEYSBUTIAMLAZY';

// TODO set secure true for https in prod
const refreshCookieOptions = {
  maxAge: 7 * 24 * 60 * 60 * 1000, // one week in miliseconds
  httpOnly: true,
  // sameSite: 'none',
  secure: false,
  path: '/',
};

// TODO consider adding iat and exp
const createTokens = (currentUser, res) => {
  // iss: issuer id stored server-side; revokeable
  console.log(`======TOKENS CREATE START`);
  const { id, username, role, iss } = currentUser;

  const accessToken = jwt.sign({ id, username, role }, ACCESS_KEY, {
    expiresIn: '1m',
  });

  const refreshToken = jwt.sign({ id, username, role, iss }, REFRESH_KEY, {
    expiresIn: '7d',
  });

  res.cookie('refreshToken', refreshToken, refreshCookieOptions);

  console.log(`======TOKENS CREATE END`);

  return { accessToken, expiresIn: 60 * 60 * 1000 /* one hour */ };
};

export { refreshCookieOptions, createTokens };
