const mongoose = require('mongoose');

exports.connectToDB = () => {
  const {DB_USER_NAME, DB_PASSWORD, DB_CLUSTER_NAME} = process.env;

  const connectionString = `mongodb+srv://${DB_USER_NAME}:${DB_PASSWORD}@${DB_CLUSTER_NAME}-elfwa.mongodb.net/hulu_property?retryWrites=true&w=majority`;

  return mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
}
