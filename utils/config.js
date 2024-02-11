const {
  PORT = 3000,
  NODE_ENV = 'production',
  JWT_SECRET = 'a2388f0352b41243908dd4f0f46f13348618e1e5476ff59ec4ffe05844fd5d86',
  MONGO_URL = 'mongodb://localhost:27017/bitfilmsdb',
} = process.env;

module.exports = {
  PORT,
  NODE_ENV,
  JWT_SECRET,
  MONGO_URL,
};
