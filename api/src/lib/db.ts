import { HttpException, HttpStatus } from '@nestjs/common';
import { omit } from 'lodash';
import { ObjectId } from 'mongodb';

import { BaseSchema } from '~/types/database';

type ItemUpdateFields = { _id: string; created?: string; modified?: string };

type DbItemUpdate<TItem extends ItemUpdateFields> = BaseSchema<TItem> & { _id: ObjectId };

export const ensureObjectId = (id: string | ObjectId) => {
  try {
    return new ObjectId(id);
  } catch {
    throw new HttpException('Invalid ID format', HttpStatus.BAD_REQUEST);
  }
};

export const sanitiseItemUpdates = <TItem extends ItemUpdateFields>(items: TItem[]) =>
  items.map<DbItemUpdate<TItem>>(({ _id, created: _0, modified: _1, ...item }) => ({
    _id: ensureObjectId(_id),
    ...item,
  }));

export const baseSchemaFields = <TItem extends object>(item: TItem) =>
  <BaseSchema<TItem>>omit(item, ['_id', 'created', 'modified']);
