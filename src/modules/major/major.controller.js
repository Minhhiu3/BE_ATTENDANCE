import {
    getAllMajorsService,
    getMajorByIdService,
    createMajorService,
    updateMajorService,
    softDeleteMajorService,
    restoreMajorService,
    deleteMajorService
} from './major.service.js';
import { createError } from '../../common/utils/create-error.js';
import { createResponse } from '../../common/utils/create-response.js';
import handleAsync from '../../common/utils/handler-async.js';
import { MAJORMESSAGE } from './major.message.js';

// @route   GET /api/major
export const getAllMajors = handleAsync(async (req, res, next) => {
    const majors = await getAllMajorsService();
    return createResponse(res, 200, MAJORMESSAGE.GET_ALL_MAJORS_SUCCESS, majors);
});

// @route   GET /api/major/:id
export const getMajorById = handleAsync(async (req, res, next) => {
    const major = await getMajorByIdService(req.params.id);
    if (!major) {
        return createError(404, MAJORMESSAGE.MAJOR_NOT_FOUND);
    }
    return createResponse(res, 200, MAJORMESSAGE.GET_MAJOR_SUCCESS, major);
});

// @route   POST /api/major
export const createMajor = handleAsync(async (req, res, next) => {
    const newMajor = await createMajorService(req.body);
    return res.status(201).json(createResponse(res, 201, MAJORMESSAGE.CREATE_MAJOR_SUCCESS, newMajor));
});

// @route   PUT /api/major/:id
export const updateMajor = handleAsync(async (req, res, next) => {
    const updatedMajor = await updateMajorService(req.params.id, req.body);
    if (!updatedMajor) {
        return createError(404, MAJORMESSAGE.MAJOR_NOT_FOUND);
    }
    return createResponse(res, 200, MAJORMESSAGE.UPDATE_MAJOR_SUCCESS, updatedMajor);
});

// @route   DELETE /api/major/:id
export const softDeleteMajor = handleAsync(async (req, res, next) => {
    const deletedMajor = await softDeleteMajorService(req.params.id);
    if (!deletedMajor) {
        return createError(404, MAJORMESSAGE.MAJOR_NOT_FOUND);
    }
    return createResponse(res, 200, MAJORMESSAGE.SOFT_DELETE_MAJOR_SUCCESS, deletedMajor);
});

// @route   POST /api/major/restore/:id
export const restoreMajor = handleAsync(async (req, res, next) => {
    const restoredMajor = await restoreMajorService(req.params.id);
    if (!restoredMajor) {
        return createError(404, MAJORMESSAGE.MAJOR_NOT_FOUND);
    }
    return createResponse(res, 200, MAJORMESSAGE.RESTORE_MAJOR_SUCCESS, restoredMajor);
});

// @route   DELETE /api/major/delete/:id
export const deleteMajor = handleAsync(async (req, res, next) => {
    const deletedMajor = await deleteMajorService(req.params.id);
    if (!deletedMajor) {
        return createError(404, MAJORMESSAGE.MAJOR_NOT_FOUND);
    }
    return createResponse(res, 200, MAJORMESSAGE.DELETE_MAJOR_SUCCESS, deletedMajor);
});
