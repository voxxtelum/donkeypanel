/**
 * APOLLO resolvers
 *
 * Defines queries
 * Points to datasources
 */

import userResolvers from './user';
import memberReslovers from './member';

const resolvers = [userResolvers, memberReslovers];

export default resolvers;
