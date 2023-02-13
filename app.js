const express = require('express')
const logger = require('morgan')
const cors = require('cors')
require("dotenv").config()
require("colors");
const path = require('path')

const authRouter = require('./routes/api/authRouter.js');
const contactsRouter = require('./routes/api/contactsRouter.js');
const transactionsRouter = require('./routes/api/transactionsRouter.js');


//----------------------------------------------------------------
const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'
app.use(logger(formatsLogger))

// app.use(logger("dev")) //! возможно для деплоя
app.use(cors())
app.use(express.json())
app.use(express.static("public")); //! Чтобы Express мог раздавать статические файлы из папки "/public"


//!++++++++++++++++++++++++++ static ++++++++++++++++++++++++++++++
// const FILE_DIR = path.resolve("./public/output")
app.use("/public", express.static("public")); //! мой
//!+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


app.use('/api/users', authRouter);
app.use('/api/contacts', contactsRouter);
app.use('/api/transactions', transactionsRouter);



app.use((req, res) => {
  console.log("!!! ОШИБКА !!!:".bgRed.white) //!
  console.log('Такой маршрут не найден...'.bgYellow.red) //!
  res.status(404).json({ message: 'Route not found' })
})


app.use((err, req, res, next) => {
  const { status = 500, message = "Server ERROR" } = err;
  //! ===========================console============================
  console.log("!!! ОШИБКА !!!:".bgRed.white);
  console.error(err.message.red);
  console.log("");
  //! ==============================================================
  res.status(status).json({ message: err.message });
})


module.exports = app
