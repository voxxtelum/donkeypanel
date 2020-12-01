/**
 *
 * I hate users
 * (auth and tokens and stuff)
 */

import jwt from 'jsonwebtoken';

// TODO GET THIS OUT OF HERE
const ACCESS_KEY = 'NEEDTOMAKESECRET';
const REFRESH_KEY = 'KEYSBUTIAMLAZY';

const refreshCookieOptions = {
  maxAge: 7 * 24 * 60 * 60 * 1000, // one week in miliseconds
  httpOnly: true,
  sameSite: 'none',
  secure: true,
  path: '/',
};

// TODO consider adding iat and exp
const createTokens = (currentUser, res) => {
  // iss: issuer id stored server-side; revokeable
  const { id, username, role, iss } = currentUser;

  const accessToken = jwt.sign({ id, username, role }, ACCESS_KEY, {
    expiresIn: '1h',
  });

  const refreshToken = jwt.sign({ id, username, role, iss }, REFRESH_KEY, {
    expiresIn: '7d',
  });

  res.cookie('refreshToken', refreshToken, refreshCookieOptions);

  return { accessToken, expiresIn: 60 * 60 * 1000 /* one hour */ };
};

export { refreshCookieOptions, createTokens };
