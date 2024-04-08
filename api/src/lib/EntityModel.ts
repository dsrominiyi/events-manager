import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import {
  AnyBulkWriteOperation,
  Collection,
  Db,
  Filter,
  FindOptions,
  MatchKeysAndValues,
  ObjectId,
  OptionalUnlessRequiredId,
} from 'mongodb';

import { BaseSchema, EntityRecord } from '~/types/database';

export default class EntityModel<TSchema extends EntityRecord> {
  protected collection: Collection<TSchema>;

  public constructor(
    protected db: Db,
    protected collectionName: string,
    protected logger: Logger,
  ) {
    this.collection = db.collection(collectionName);
  }

  private addDateFields(items: BaseSchema<TSchema>[]) {
    const now = new Date();

    return <OptionalUnlessRequiredId<TSchema>[]>items.map((item) => ({
      ...item,
      created: now,
      modified: now,
    }));
  }

  public find(filter: Filter<TSchema> = {}, options?: FindOptions<TSchema>) {
    this.logger.debug('find', { filter, ...options });

    return this.collection.find(filter, options).toArray();
  }

  public findOne(filter: Filter<TSchema> = {}) {
    this.logger.debug('findOne', { filter });

    return this.collection.findOne(filter);
  }

  public distinct<TValue>(field: string, filter: Filter<TSchema> = {}) {
    this.logger.debug('distinct', { field, filter });

    return this.collection.distinct(field, filter) as Promise<TValue[]>;
  }

  public async insertOne(item: BaseSchema<TSchema>) {
    const [datedItem] = this.addDateFields([item]);
    const result = await this.collection.insertOne(datedItem);

    this.logger.debug('insertOne', result);

    return result;
  }

  public async insertMany(items: BaseSchema<TSchema>[]) {
    const result = await this.collection.insertMany(this.addDateFields(items));

    this.logger.debug('insertMany', result);

    const insertedIdsArray = items.map((_item, index) => result.insertedIds[index]);

    return insertedIdsArray;
  }

  public async updateOne(filter: Filter<TSchema>, update: Partial<TSchema>) {
    this.logger.debug('updateOne', { filter });

    update.modified = new Date();

    const result = await this.collection.updateOne(filter, { $set: update });

    if (result.matchedCount === 0) {
      throw new HttpException(`Failed to update. Item not found`, HttpStatus.NOT_FOUND);
    }

    return <TSchema>(await this.findOne(filter))!;
  }

  public async updateList(items: (Partial<BaseSchema<TSchema>> & { _id: ObjectId })[]) {
    const now = new Date();

    const operations: AnyBulkWriteOperation<TSchema>[] = items.map(({ _id, ...updateFields }) => ({
      updateOne: {
        filter: <Filter<TSchema>>{ _id },
        update: {
          $set: <MatchKeysAndValues<TSchema>>{ ...updateFields, modified: now },
        },
      },
    }));

    const { ok, modifiedCount } = await this.collection.bulkWrite(operations);

    if (!ok) {
      throw Error('Failed to update one or more items');
    }
    this.logger.debug('updateList', { modifiedCount });
  }

  public async deleteOne(filter: Filter<TSchema>) {
    const result = await this.collection.deleteOne(filter);

    this.logger.debug('deleteOne', result);
  }

  public async deleteMany(filter: Filter<TSchema>) {
    const result = await this.collection.deleteMany(filter);

    this.logger.debug('deleteMany', result);
  }
}
