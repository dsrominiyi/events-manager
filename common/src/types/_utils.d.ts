type ObjectId = import('mongodb').ObjectId;

type JsonType<T> = OptionalsCanBeNull<BaseJsonType<T>>;

type BaseJsonType<T> = T extends (infer TElement)[]
  ? JsonType<TElement>[]
  : T extends Date | ObjectId
    ? string
    : T extends object
      ? ObjectJsonType<T>
      : T;

type ObjectJsonType<T> = {
  [K in keyof T]: BaseJsonType<T[K]>;
};

type OptionalsCanBeNull<T> = T extends (infer TElement)[]
  ? T extends undefined
    ? OptionalsCanBeNull<TElement>[] | null
    : OptionalsCanBeNull<TElement>[]
  : T extends object
    ? T extends undefined
      ? ObjectOptionalsCanBeNull<T> | null
      : ObjectOptionalsCanBeNull<T>
    : T extends undefined
      ? T | null
      : T;

type ObjectOptionalsCanBeNull<T> = {
  [K in keyof T]: OptionalsCanBeNull<T[K]>;
};
