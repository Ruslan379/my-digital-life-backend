const mongoose = require('mongoose');
mongoose.set('strictQuery', false); //!!!!!
const moment = require('moment');

const app = require('./app');
const x = require('uniqid');


// ----------------------------------------------------------------
const { DB_HOST, PORT = 3033 } = process.env;
// const currentDate = moment().format("DD-MM-YYYY hh:mm:ss");
// const currentDate = moment().format("x");
const currentDate = moment().format("YYYYMMDDhhmmss");


(async () => {
  try {
    await mongoose.connect(DB_HOST);
    app.listen(PORT);
    console.log(`Server is running on the port: ${PORT} `.bgGreen.red);
    console.log(`Start Pet-project: My Digital Life (Backend) `.bgRed.green);
    console.log('Database connection successful '.bgBlue.yellow);
    console.log("Date & Time:".bgYellow.blue, currentDate.yellow);
    console.log('---------------------------------------'.yellow);
  } catch (error) {
    console.log(error.message);
    process.exit(1); //? закрыть все неиспользуемые процессы
  }
})();
