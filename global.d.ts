import mongoose from 'mongoose';

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // Declare a custom global mongoose cache
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

export {};