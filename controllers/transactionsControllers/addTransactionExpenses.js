const { Transaction } = require("../../models");

const { lineBreak } = require("../../services");


//-----------------------------------------------------------------------------
const addTransactionExpenses = async (req, res, next) => {
    // const transaction = await Transaction.create(req.body);

    const { id: userId } = req.user //?

    //* =============================console===================================
    console.log("addTransactionExpenses --> req.user:".bgYellow.red); //?
    // console.table(req.user); //?
    // console.table([req.user]);
    console.log(req.user);

    console.log("addTransactionExpenses --> userId:".bgYellow.blue, userId.bgGreen.blue); //?
    console.log("");

    console.log("addTransactionExpenses --> req.body:".bgYellow.red); //?
    // console.table(req.user); //?
    // console.table([req.user]);
    console.log(req.body);
    //* =======================================================================


    // const transaction = await Transaction.create({ transactionsType: expenses, ...req.body, owner: userId, }); //?
    const transaction = await Transaction.create({ ...req.body, owner: userId, }); //?


    //! ===========================console============================
    console.log("START-->POST".yellow); //!
    lineBreak();
    console.log(`НОВАЯ TransactionExpenses с ID: ${transaction.id}:`.bgYellow.blue); //!
    // console.table([contact]); //!
    console.log(transaction); //!
    lineBreak();
    console.log("END-->POST".yellow); //!
    lineBreak();
    //! ==============================================================


    res.status(201).json({ transaction });
};

module.exports = addTransactionExpenses;