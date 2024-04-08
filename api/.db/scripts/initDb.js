/* eslint-disable no-undef */
db = db.getSiblingDB('em');

db.createUser({
  user: 'em_api',
  pwd: '1234',
  roles: ['readWrite', 'dbAdmin'],
});

db.tickets.createIndex({ eventId: 1, _id: 1 });

db.events.insertMany([
  {
    _id: ObjectId('6612b9fe9181ae84b4d08948'),
    name: "Raver's Special",
    date: ISODate('2024-04-22T20:00:00Z'),
    description: 'Old school ravers only',
    created: ISODate(),
    modified: ISODate(),
  },
  {
    _id: ObjectId('6612be25b634cdf45a18b6b7'),
    name: 'Magic Show',
    date: ISODate('2024-06-15T18:00:00Z'),
    description: 'Be amazed!',
    created: ISODate(),
    modified: ISODate(),
  },
  {
    _id: ObjectId('6612c22da90ae6f342198357'),
    name: 'Concert of the Century',
    date: ISODate('2024-08-15T19:00:00Z'),
    description: 'All your favourites',
    created: ISODate(),
    modified: ISODate(),
  },
]);

db.tickets.insertMany([
  {
    _id: ObjectId('6612cedb99bf6b82a00f63dd'),
    eventId: ObjectId('6612b9fe9181ae84b4d08948'),
    name: 'Early Release',
    type: 'ADULT',
    price: 49.99,
    bookingFee: 4.99,
    inStock: true,
    created: ISODate(),
    modified: ISODate(),
  },
  {
    _id: ObjectId('6612cff499bf6b82a00f63df'),
    eventId: ObjectId('6612b9fe9181ae84b4d08948'),
    name: 'Group Saver',
    type: 'FAMILY',
    price: 149.99,
    bookingFee: 4.99,
    inStock: true,
    created: ISODate(),
    modified: ISODate(),
  },
  {
    _id: ObjectId('6613caab18cf7106e0a7a56f'),
    name: 'Regular Ticket',
    type: 'ADULT',
    price: 9,
    bookingFee: 1.99,
    inStock: true,
    eventId: ObjectId('6612be25b634cdf45a18b6b7'),
    created: ISODate(),
    modified: ISODate(),
  },
]);
