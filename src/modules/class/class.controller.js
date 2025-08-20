import handleAsync from "../../common/utils/handler-async.js";
import { createClassService, getAllCLassService } from "./class.service.js";
import { createResponse } from "../../common/utils/create-response.js";
import { CLASSMESSAGE } from "./class.message.js";
export const createClass = handleAsync(async (req, res, next) => {
    // Logic to create a class
    const classInstance = await createClassService(req.body);
    return createResponse(res,201,CLASSMESSAGE.CLASS_CREATE_SUCCESS, classInstance);
});

export const getAllClass = handleAsync(async (req,res,next) => {
    const classList = await getAllCLassService();
    return createResponse(res,201,CLASSMESSAGE.CLASS_SUCCESS_GETALL, classList);
})