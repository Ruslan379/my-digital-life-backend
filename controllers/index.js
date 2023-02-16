//! MAIN
const contactsControllers = require("./contactsControllers");
const authControllers = require("./authControllers")
// const usersControllers = require("./usersControllers")
const transactionsControllers = require("./transactionsControllers")

module.exports = {
    contactsControllers,
    authControllers,
    // usersControllers
    transactionsControllers,
}