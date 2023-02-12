const express = require('express')
const router = express.Router()

const multer = require('multer')
const path = require('path')
const { v4: uuidV4 } = require('uuid')

const {
    controllerWrapper,
    authMiddleware,
    resizeXandYbyJimpMiddleware
} = require("../../middlewares")

const { filesControllers: ctrl } = require("../../controllers")

//todo --> Вызов ф-ции-Middleware Jimp
// const { resizeAvatarJimp } = require("../../helpers")


//----------------------------------------------------------------------------
//! 0. Проверка токена
// router.use(authMiddleware);

//! ----------------------------- uploadMiddleware -----------------------------
const FILE_DIR = path.resolve("./public/output")
console.log("ПОЛНЫЙ путь к временной папке для всех файлов-аватарок -> FILE_DIR:".bgCyan.black, FILE_DIR.cyan); //!;
console.log("");

let avatarTempURL = "";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, FILE_DIR)
    },
    filename: (req, file, cb) => {
        //! так можно перезаписать файл при повторной загруке одного и того же файла
        // const [filename, extension] = file.originalname.split(".");
        // cb(null, `${filename}.${extension}`);
        //! чтобы избежать одинаковые названия файлов при повторной загруке одного и того же файла
        const [filename, extension] = file.originalname.split(".");
        const avatarNewName = `${filename + "_" + uuidV4()}.${extension}`
        const avatarNewJimpName = `Jimp_250x250_${avatarNewName}`;
        console.log("avatarNewJimpName:".bgBlue, avatarNewJimpName.blue); //!;

        //! ПОЛНЫЙ путь к новому Jimp-файлу аватара во временной папке tmp
        avatarTempURL = path.join(FILE_DIR, avatarNewJimpName);
        console.log("ПОЛНЫЙ путь к новому Jimp-файлу аватара во временной папке output -> avatarTempURL:".bgRed, avatarTempURL.bgBlue); //!;
        console.log("");


        //! Вызов ф-ции Jimp
        // async () => {
        //     console.log("ПОЛНЫЙ путь к новому Jimp-файлу аватара во временной папке output -> avatarTempURL:".bgWhite.black, avatarTempURL.bgBlue); //!;
        //     await resizeAvatarJimp(avatarTempURL)
        // };


        // cb(null, `${filename + "_" + uuidV4()}.${extension}`);
        cb(null, avatarNewJimpName);
    },
    limits: {
        // fileSize: 11048576,
    },
});

const uploadMiddleware = multer({ storage });
//! ______________________________ uploadMiddleware ______________________________


//todo --> Вызов ф-ции-Middleware  - Jimp
// const resize250Qual60GreyByJimpMiddleware = async (req, res, next) => {
//     console.log("ПОЛНЫЙ путь к новому Jimp-файлу аватара во временной папке output -> avatarTempURL:".bgWhite.black, avatarTempURL.bgBlue); //!;
//     console.log("");

//     const { path: tempUpload, destination, originalname } = req.file;

//     console.log("ОБЪЕКТ -> req.file:".red, req.file); //!;
//     console.log("");
//     console.log("ПОЛНЫЙ путь к временной папке tmp -> destination:".bgYellow.black, destination.yellow); //!;
//     console.log("");
//     console.log("ПОЛНЫЙ путь к ориг. файлу аватара во временной папке tmp -> tempUpload:".bgBlue, tempUpload.red); //!;
//     console.log("");
//     // await resizeAvatarJimp(avatarTempURL);
//     await resizeAvatarJimp(tempUpload);
//     next();
// };


//! 1. POST --> api/files/upload
//? content-type: multipart/form-data
router.post(
    "/upload",
    uploadMiddleware.single("avatar"),
    resizeXandYbyJimpMiddleware,
    controllerWrapper(ctrl.uploadController)
)

//! 2. use --> api/files/download
// router.get("/download", express.static(FILE_DIR)) //! так НЕ РАБОТАЕТ!!! --> "Route not found"
router.use("/download", express.static(FILE_DIR))



// module.exports = { authRouter: router }
module.exports = router
