//service quan li thao tac voi db 
import { createError } from "../../common/utils/create-error.js";
import User from "../user/user.model.js";
import {hashPassword} from '../../common/utils/handler-password.js'
import { generateStudentId, generateUsername } from "../../common/utils/code-generator.js";
import jwt from "jsonwebtoken";
import { AUTHMESSAGE } from "./auth.message.js";
import { signToken,verifyToken } from "../../common/utils/jwt.js";
import { FRONTEND_URL } from "../../common/configs/enviroment.js";
import { sendMailForgotPassword, sendMailRegister } from "../../common/utils/email-sender.js";
import {emailChangePasswordSuccess, emailConfirmTemplate} from "../../common/utils/email-template.js";
import { create } from "domain";

export const registerService = async (dataRegister) => {
	const { email, password, fullname, role } = dataRegister;

	if (!fullname || typeof fullname !== "string") {
		throw createError(400, "Họ tên không được để trống");
	}
	if (!email || typeof email !== "string") {
		throw createError(400, "Email không hợp lệ");
	}
	if (!password || typeof password !== "string") {
		throw createError(400, "Mật khẩu không hợp lệ");
	}

	// Kiểm tra email đã tồn tại chưa
	const exitingUser = await User.findOne({ email });
	if (exitingUser) {
		throw createError(400, AUTHMESSAGE.EMAIL_ALREADY_EXISTS);
	}

	const passwordHash = await hashPassword(password);

	const username = await generateUsername(fullname);
	let studentId = undefined;

	if (role === "student") {
		studentId = await generateStudentId();
	}

	const newUser = await User.create({
		...dataRegister,
		password: passwordHash,
		username, // đúng tên field trong Mongoose
		studentId,
	});

	newUser.password = undefined;
	return newUser;
};


// @route POST /api/auth/register
export const loginService = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw createError(404, AUTHMESSAGE.USER_NOT_FOUND || "Không tìm thấy người dùng");
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw createError(400, AUTHMESSAGE.INVALID_CREDENTIALS || "Mật khẩu không đúng");
  }

  const accessToken = signToken({ id: user._id }, "1d");
  const refreshToken = signToken({ id: user._id }, "30d");

  user.password = undefined;

  return {
    user,
    accessToken,
    refreshToken,
  };
};

export const refreshTokenService = async (req) => {
    //uu tien lay token tu body,header,cookie
    const refreshToken = req.body.refreshToken || req.headers["x-refresh-token"] || req.cookies.refreshToken;
    
    if (!refreshToken) {
        return createError(401,AUTHMESSAGE.INVALID_REFRESH_TOKEN);
    }
    const {valid,decoded} = verifyToken(refreshToken);
	if (!valid) {
		return createError(401,AUTHMESSAGE.INVALID_REFRESH_TOKEN);
	}
    if (valid) {
        const accessToken = signToken({id:decoded.id}, '1d');
        const newRefreshToken = signToken({id:decoded.id}, '30d');
        return {accessToken,refreshToken:newRefreshToken};
    }
};

export const forgotPasswordService = async (email) => {
	const user = await User.findOne({email});
	if (!user) {
		return next(createError(404,AUTHMESSAGE.INVALID_EMAIL));
	}
	//gưi link chứa mã bí mật trỏ tới fe
	const resertToken = signToken({ id: user.id, role: user.role}, "5m" );
    const titleEmail = "đổi lại mật khẩu";
	const resertLink = `${FRONTEND_URL}/resert-password/${resertToken}`;
	const emailContent = emailConfirmTemplate(user.fullname, user.username, resertLink, titleEmail);
	await sendMailRegister(user.email,AUTHMESSAGE.EMAIL_SEND_SUCCESS,emailContent);
	return true;
};

export const resertPasswordService = async (resertToken, newPassword) => {
	const decoded = verifyToken(resertToken);
	const emailContent = emailChangePasswordSuccess(user.fullname, user.username);
	console.log(decoded);
	const user = await User.findOne({email});
	console.log(user);
	if (!user) {
		return next(createError(404,AUTHMESSAGE.INVALID_EMAIL));
	}

	user.password = await hashPassword(newPassword);
	await user.save();
	await sendMailRegister(user.email, AUTHMESSAGE.EMAIL_SEND_SUCCESS,emailContent);
	return true;
}
