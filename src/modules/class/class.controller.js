import handleAsync from "../../common/utils/handler-async";

export const createClass = handleAsync(async (req, res, next) => {
    // Logic to create a class
    const newClass = await classService.createClass(req.body);
    return res.status(201).json(createResponse(res, 201, CLASSMESSAGE.CLASS_CREATE_SUCCESS, newClass));
});