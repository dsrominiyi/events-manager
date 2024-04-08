const dbPort = '33031';

process.env.DB_PORT = dbPort;
process.env.DB_URL = `mongodb://127.0.0.1:${dbPort}/`;
