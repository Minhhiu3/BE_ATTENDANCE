import { createError } from "../../common/utils/create-error.js";
import { createResponse } from "../../common/utils/create-response.js";
import handleAsync from "../../common/utils/handler-async.js";
import { AUTHMESSAGE } from "./auth.message.js";
import { forgotPasswordService, loginService, refreshTokenService, registerService, resertPasswordService } from "./auth.service.js";

// @route   POST /api/auth/register
export const registerUser = handleAsync(async (req,res,next) => {
    const newUser = await registerService(req.body);
    return res.status(201).json(createResponse(res,201,AUTHMESSAGE.REGISTER_SUCCESS,newUser))
});

// @route   POST /api/auth/login
export const loginUser = handleAsync(async (req,res,next) => {
    const loginData = await loginService(req.body);
    return createResponse(res,200,AUTHMESSAGE.LOGIN_SUCCESS,data);
})

// * @route POST /api/auth/refresh-token
export const refreshTokenUser = handleAsync(async (req,res,next) => {
    const data = await refreshTokenService(req);
    return createResponse(res,201,AUTHMESSAGE.REFRESH_TOKEN_SUCCESS,data);
})

// @route   POST /api/auth/forgot-password
export const forgotPassword = handleAsync(async (req,res,next) => {
    const isSendMail = await forgotPasswordService(req.body.email);
    if (!isSendMail) {
        return createError(400, AUTHMESSAGE.EMAIL_SEND_FAIL);
    }
    return createResponse(res,200,AUTHMESSAGE.EMAIL_SEND_SUCCESS);
});

export const resertPassword = handleAsync(async (req,res,next) => {
    const isResertPasswort = await resertPasswordService(req.body.resertToken, req.body.newPassword);
    if (!isResertPasswort) {
        return res.status(400).json(createError(400,AUTHMESSAGE.PASSWORD_CHANGE_FAIL));
    }
    return createResponse(res,200,AUTHMESSAGE.PASSWORD_CHANGE_SUCCESS);
});