const mongoose = require('mongoose');
mongoose.set('strictQuery', false); //!!!!!

const app = require('./app');


// ----------------------------------------------------------------

const { DB_HOST, PORT = 3033 } = process.env;



//! 3-вариант NEW
// async function main() {
(async () => {
  try {
    await mongoose.connect(DB_HOST);
    app.listen(PORT);
    console.log(`Server is running on the port: ${PORT} `.bgGreen.red);
    console.log(`Start Pet-project: My Digital Life (Backend) `.bgRed.green);
    console.log('Database connection successful '.bgBlue.yellow);
    console.log('---------------------------------------'.yellow);
  } catch (error) {
    console.log(error.message);
    process.exit(1); //? закрыть все неиспользуемые процессы
  }
})();
