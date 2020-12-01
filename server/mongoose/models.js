/**
 * MONGOOSE MODELS
 *
 */

import { model } from 'mongoose';

import { configSchema, userSchema } from './schemas';

const models = {};

models.ConfigModel = model('Config', configSchema, 'configs');

// USER
models.UserModel = model('User', userSchema, 'users');

// EXPORTS
export default models;
