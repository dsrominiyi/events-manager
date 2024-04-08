import { ObjectId } from 'mongodb';

export type IdType = ObjectId | string;

export interface EntityRecord {
  _id: ObjectId;
  created: Date;
  modified: Date;
}

export type Recorded<TSchema> = TSchema & EntityRecord;

export type BaseSchema<TSchema> = Omit<TSchema, keyof EntityRecord>;
