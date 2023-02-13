const { User } = require("../../models/userModel.js");
const { Unauthorized } = require("http-errors");


//-----------------------------------------------------------------------------
const getBalance = async (req, res) => {




    res.status(200).json({
        status: "success getBalance --> transactionsControllers",
        code: 200,
    })
};


module.exports = getBalance
