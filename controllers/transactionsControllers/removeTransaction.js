const { Transaction } = require("../../models");
const { NotFound } = require('http-errors')

const { lineBreak } = require("../../services");


//-----------------------------------------------------------------------------
const removeTransaction = async (req, res, next) => {
    const { transactionId } = req.params;
    // const contact = await Contact.findByIdAndRemove(transactionId);

    const { id: userId } = req.user //?

    //* =============================console===================================
    console.log("removeTransaction --> req.user:".bgYellow.red); //?
    // console.table(req.user); //?
    // console.table([req.user]);
    console.log(req.user);

    console.log("removeTransaction --> userId:".bgYellow.blue, userId); //?
    console.log("");
    //* =======================================================================


    //! ===========================console============================
    console.log("START-->DELETE/:id".red); //!
    lineBreak();
    //! ==============================================================


    const transaction = await Transaction.findOneAndRemove({ _id: transactionId, owner: userId });


    if (!transaction) {
        //! ===========================console============================
        console.log("Нет ТРАНЗАКЦИИ с таким ID:".yellow, transactionId.red); //!
        lineBreak();
        console.log("END-->DELETE/:id".red); //!
        //! ==============================================================
        throw new NotFound(`Transaction wiht id:'${transactionId}' not found`)
    }


    //! ===========================console============================
    console.log(`Эта ТРАНЗАКЦИЯ с ID: ${transactionId} УДАЛЕНА:`.bgRed.yellow); //!
    console.log(transaction); //!
    lineBreak();
    console.log("END-->DELETE/:id".red); //!
    lineBreak();
    //! ==============================================================


    res.status(200).json({ transactionId });

    //! OLD
    // res.status(200).json({
    //     status: "success",
    //     code: 204,
    //     message: `Transaction wiht id:'${transactionId}'was remove:`,
    //     data: { transaction }
    // });
};

module.exports = removeTransaction;