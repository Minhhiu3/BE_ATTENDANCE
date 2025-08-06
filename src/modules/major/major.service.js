import { date, string, success } from "zod";
import Major from "./major.model.js";
import { createError } from "../../common/utils/create-error.js";
import { MAJORMESSAGE } from "./major.message.js";
import { generateSubjectCode } from "../../common/utils/code-generator.js";
import { queryBuilder } from "../../common/utils/query-builder.js";

export const createMajorService = async (majorData) => {
    const { name, description } = majorData;
    const majorCode = await generateSubjectCode();
    const exiting = await Major.findOne({
        $or: [
            {code: majorCode},{name}
        ],
        deletedAt: null,
    }).lean();
    if (exiting) {
        return createError(400,MAJORMESSAGE.MAJOR_ALREADY_EXISTS);
    }
    const newMajor = await Major.create({
        name,
        code: majorCode,
        description,
    });
    return {
        success: true,
        majorData: newMajor
    };
};

export const getAllMajorsService = async (query) => {
    const { includeDeleted = false, ...queryParams } = query;
    const dataService = await queryBuilder(Major, {
        ...queryParams,
        includeDeleted: includeDeleted === 'true',
        searchFields: ["name", "code", "description"],
    });
    return dataService;
};

export const getMajorByIdService = async (id) => {
    return await Major.findOne({ _id: id, deletedAt: null});
};

export const updateMajorService = async (id,data) => {
    const majorUpdate = await Major.findOneAndUpdate(
        {_id: id,deletedAt:null},
        {$set: data},
        {new: true, runValidators: true}
    );
    return majorUpdate;
};

export const softDeleteMajorService = async (id) => {
    return await Major.findByIdAndUpdate(
        {_id: id,deletedAt: { $ne: new Date() }},
        {$set: {deletedAt: null}},
        {new: true}
    );
};

export const restoreMajorService = async (id) => {
    return await Major.findByIdAndUpdate(
        {_id: id,deletedAt: { $ne: null }},
        {$set: {deletedAt: null}},
        {new: true}
    );
};

export const deleteMajorService = async (id) => {
	return await Major.findOneAndDelete({ _id: id, deletedAt: null });
};



