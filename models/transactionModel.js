const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleSchemaValidationErrors } = require("../helpers");


//-----------------------------------------------------------------------------
const transactionsSchema = Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
        default: "new@i.ua",
    },
    phone: {
        type: String,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
    favorite: {
        type: Boolean,
        default: false,
    },
}, { versionKey: false, timestamps: true });


//! Правильный код ошибки transactionsSchema
transactionsSchema.post("save", handleSchemaValidationErrors)


//* ++++++++++++++++++++++ Схемы ВАЛИДАЦИИ Joi +++++++++++++++++++++++++
const transactionJoiSchemaPut = Joi.object({
    name: Joi.string()
        // .alphanum()
        .min(3)
        .max(30)
        .required(),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ua', 'org',] } })
        // .required()
        .optional(),

    phone: Joi.string()
        // .alphanum()
        .min(5)
        .max(14)
        .required(),

    owner: Joi.string(),
    // .required(),

    favorite: Joi.bool()
        .optional(),
});

//--------------------------------------------------------------------
const transactionJoiSchemaPatch = Joi.object({
    name: Joi.string()
        // .alphanum()
        .min(3)
        .max(30)
        .optional(),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ua', 'org',] } })
        .optional(),

    phone: Joi.string()
        // .alphanum()
        .min(5)
        .max(14)
        .optional(),

    favorite: Joi.bool()
        .optional(),
});

//* _______________________ Схемы ВАЛИДАЦИИ Joi _______________________


//? Создаем МОДЕЛЬ:
const Transaction = model("transaction", transactionsSchema); //! DB_HOST



module.exports = {
    Transaction,
    transactionJoiSchemaPut,
    transactionJoiSchemaPatch,
};

