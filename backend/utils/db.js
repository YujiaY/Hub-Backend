const mongoose = require('mongoose');

exports.connectToDB = () => {
  const {DB_USER_NAME, DB_PASSWORD, DB_CLUSTER_NAME, DB_DATABASE} = process.env;

  const connectionString = `mongodb+srv://${DB_USER_NAME}:${DB_PASSWORD}@${DB_CLUSTER_NAME}/${DB_DATABASE}?retryWrites=true&w=majority`;

  return mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
}
