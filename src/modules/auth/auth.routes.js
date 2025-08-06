import { Router } from "express";
import * as authController from "./auth.controller.js";
import validBodyRequest from "../../common/middleware/valid-body.middleware.js";
import { loginSchema, registerSchema, resertPasswordSchema } from "./auth.schema.js";
const routerAuth = Router()

routerAuth.post('/register', validBodyRequest(registerSchema),authController.registerUser);
routerAuth.post('/login',validBodyRequest(loginSchema), authController.loginUser);
routerAuth.post('/refresh-token', authController.refreshTokenUser);
routerAuth.post('/forgot-password', authController.forgotPassword);
routerAuth.post('/resert-password',validBodyRequest(resertPasswordSchema), authController.resertPassword);

export default routerAuth;