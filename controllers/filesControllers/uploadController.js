const { User } = require("../../models/userModel.js");
const { Unauthorized } = require("http-errors");


//-----------------------------------------------------------------------------
const uploadController = async (req, res) => {

    //! Вызов ф-ции Jimp
    // async () => {
    //     console.log("ПОЛНЫЙ путь к новому Jimp-файлу аватара во временной папке tmp -> avatarTempURL:".bgWhite.black, avatarTempURL.bgBlue); //!;
    //     await resizeAvatarJimp(avatarTempURL)
    // };


    res.status(200).json({
        status: "success filesController",
        code: 200,
    })
};


module.exports = uploadController
