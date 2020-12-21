/**
 * MONGOOSE SCHEMA
 *
 * Defines how data looks in db
 */

import { Schema } from 'mongoose';

const configSchema = new Schema({
  key: String,
  value: String | Number | Boolean,
});

// USER
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, 'Username required'],
      trim: true,
      index: { locale: 'en', strength: 2 },
    },
    password: {
      type: String,
      required: true,
    },
    role: { type: String, default: 'basic', lowercase: true },
    iss: String,
  },
  { timestamps: true }
);

// MEMEBER
const memberSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, 'Username required.'],
      trim: true,
      index: { locale: 'en', strength: 2 },
    },
    class: String,
    spec: String,
    role: String,
    isMain: {
      type: Boolean,
      default: true,
    },
    main: Schema.Types.ObjectId,
    alts: [Schema.Types.ObjectId],
    raider: Boolean,
    team: [String],
    guildRank: {
      type: Number,
      default: 10,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// EXPORTS
export { configSchema, userSchema, memberSchema };
