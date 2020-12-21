/**
 * MONGOOSE MODELS
 *
 */

import { model } from 'mongoose';

import { configSchema, userSchema, memberSchema } from './schemas';

const models = {};

models.ConfigModel = model('Config', configSchema, 'configs');

// USER
models.UserModel = model('User', userSchema, 'users');

// MEMBER
models.MemberModel = model('Member', memberSchema, 'members');

// EXPORTS
export default models;
