const express = require('express')
const router = express.Router()

const {
    validation,
    controllerWrapper,
    authMiddleware,
    uploadMiddleware,
    resizeXandYbyJimpMiddleware
} = require("../../middlewares");

const { authControllers: ctrl } = require("../../controllers")

const {
    registerJoiSchema,
    loginJoiSchema,
    changeSubscriptionJoiSchema,
    verifyEmailJoiSchema,
} = require("../../models/userModel.js");

const validateMiddlewareRegister = validation(registerJoiSchema);
const validateMiddlewarelogin = validation(loginJoiSchema);
const validateMiddlewareChangeSubscription = validation(changeSubscriptionJoiSchema);
const validateMiddlewareVerifyEmail = validation(verifyEmailJoiSchema);

//-----------------------------------------------------------------------------
//! 1. Регистрация
router.post("/signup", validateMiddlewareRegister, controllerWrapper(ctrl.registrationController))


//! 2. Login
router.post('/login', validateMiddlewarelogin, controllerWrapper(ctrl.loginController))


//! 3-1. Проверка токена
// router.use(authMiddleware); //! 1-вариант

//! 3-2. Logout
// router.get('/logout', controllerWrapper(ctrl.logoutController)) //! 1-вариант
router.get('/logout', authMiddleware, controllerWrapper(ctrl.logoutController)) //! 2-вариант


//! 4. Текущий пользователь - получить данные юзера по токену
// router.get('/current', controllerWrapper(ctrl.getCurrentController)) //! 1-вариант
router.get('/current', authMiddleware, controllerWrapper(ctrl.getCurrentController)) //! 2-вариант


//! 5. Обновление подписки (subscription) пользователя
router.patch('/', authMiddleware, validateMiddlewareChangeSubscription, controllerWrapper(ctrl.updatePatchUserSubscription)) //! 2-вариант


//! 6. Обновление аватарки (avatarURL) пользователя
//!    PATCH -- > api/users/avatars
router.patch(
    "/avatars",
    authMiddleware,
    uploadMiddleware.single("avatar"),
    resizeXandYbyJimpMiddleware,
    controllerWrapper(ctrl.updateAvatar)
);


//! 7. Верификация email пользователя
//!    GET -- > api/users/verify/:verificationToken
router.get("/verify/:verificationToken", controllerWrapper(ctrl.verifyEmail));


//! 8. Добавление повторной отправки email пользователю с ссылкой для верификации
//!    POST -- > api/users/verify
// router.post("/verify", controllerWrapper(ctrl.resendVerifyEmail));
router.post(
    "/verify",
    validateMiddlewareVerifyEmail,
    controllerWrapper(ctrl.resendVerifyEmail)
);

//! 9. Получение balance ПОЛЬЗОВАТЕЛЯ 
// router.get("/", controllerWrapper(ctrl.getAllContacts));
router.get("/balance", authMiddleware, controllerWrapper(ctrl.getBalance));

// module.exports = { authRouter: router }
module.exports = router
