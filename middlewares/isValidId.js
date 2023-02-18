const { isValidObjectId } = require("mongoose");
const { RequestError } = require("../helpers")

const isValidId = (req, res, next) => {
    let id = null;
    id = req.params.contactId;
    if (!id) {
        id = req.params.transactionId;
    };
    const isCorrectId = isValidObjectId(id);
    if (!isCorrectId) {
        const error = RequestError(400, `${id} is not corrent id format`);
        next(error);
    }
    next();
};

module.exports = isValidId;