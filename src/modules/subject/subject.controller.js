import { createError } from "../../common/utils/create-error.js";
import { createResponse } from "../../common/utils/create-response.js";
import handleAsync from "../../common/utils/handler-async.js";
import { SUBJECTMESSAGE } from "./subject.message.js";
import { 
    createSubjectService,
    getAllSubjectService,
    getSubjectByIdService,
    updateSubjectService, 
    softDeleteSubjectService, 
    deleteSubjectService, 
    restoreSubjectService } from "./subject.service.js";

    export const createSubject = handleAsync(async (req,res,next) => {
        const subject = await createSubjectService(req.body);
        return createResponse(res,201,SUBJECTMESSAGE.SUBJECT_SUCCESS_CREATE, subject)
    });
export const getAllSubject = handleAsync(async (req, res, next) => {
    const subjects = await getAllSubjectService(req.query);
    if (!subjects) {
       throw createError(404, SUBJECTMESSAGE.SUBJECT_NOT_FOUND);
    }
    return createResponse(res, 200, SUBJECTMESSAGE.SUBJECT_SUCCESS_GETALL, subjects.data, subjects.meta);
});

export const getSubjectById = handleAsync(async (req,res,next) => {
    const subject = await getSubjectByIdService(req.params.id);
    if (!subject) {
        throw createError(404, SUBJECTMESSAGE.SUBJECT_NOT_FOUND);
    }
    return createResponse(res,200,SUBJECTMESSAGE.SUBJECT_SUCCESS_GETID,subject);
});

export const updateSubject = handleAsync(async (req,res,next) => {
    const subjectEdit = await updateSubjectService(req.params.id, req.body);
    if (!subjectEdit) {
        throw createError(404, SUBJECTMESSAGE.SUBJECT_NOT_FOUND);
    }
    return createResponse(res,200,SUBJECTMESSAGE.SUBJECT_SUCCESS_EDIT,subjectEdit);
})
export const softDeleteSubject = handleAsync(async (req,res,next) => {
    const subjectDelete = await softDeleteSubjectService(req.params.id);
    if (!subjectDelete) {
        throw createError(404, SUBJECTMESSAGE.SUBJECT_NOT_FOUND);
    }
    return createResponse(res, 200, SUBJECTMESSAGE.SUBJECT_SUCCESS_DELETE, subjectDelete);
});
export const restoreSubject = handleAsync(async (req,res,next) => {
    const subjectRestore = await restoreSubjectService(req.params.id);
    if (!subjectRestore) {
        throw createError(404, SUBJECTMESSAGE.SUBJECT_NOT_FOUND);
    }
    return createResponse(res, 200, SUBJECTMESSAGE.SUBJECT_SUCCESS_RESTORE, subjectRestore);
});
export const deleteSubject = handleAsync(async (req, res, next) => {
    const subjectDelete = await deleteSubjectService(req.params.id);
    if (!subjectDelete) {
        throw createError(404, SUBJECTMESSAGE.SUBJECT_NOT_FOUND);
    }
    return createResponse(res, 200, SUBJECTMESSAGE.SUBJECT_SUCCESS_DELETE, subjectDelete);
});