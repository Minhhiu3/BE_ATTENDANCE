import { date, string, success } from "zod";
import { createError } from "../../common/utils/create-error.js";
import Subject from "./subject.model.js";
import { SUBJECTMESSAGE } from "./subject.message.js";
import { generateSubjectCode } from "../../common/utils/code-generator.js";
import { queryBuilder } from "../../common/utils/query-builder.js";

export const createSubjectService = async (subjectData) => {
    const { name, englishName, description } = subjectData;
    const subjectCode = await generateSubjectCode();
    const exiting = await Subject.findOne({
        $or: [
            {code: subjectCode},{name}, {englishName}
        ],
        deletedAt: null,
    }).lean();
    if (exiting) {
        return createError(400,SUBJECTMESSAGE.SUBJECT_ALREADY_EXISTS);
    }
    const newSubject = await Subject.create({
        name,
        englishName,
        code: subjectCode,
        description,
    });
    return {
        success: true,
        subjectData: newSubject
    };
};

export const getAllSubjectService = async (query) => {
    const { includeDeleted = false, ...queryParams } = query;
    const dataService = await queryBuilder(Subject, {
        ...queryParams,
        includeDeleted: includeDeleted === 'true',
        searchFields: ["name", "englishName", "code", "description"],
    });
    return dataService;
};

export const getSubjectByIdService = async (id) => {
    return await Subject.findOne({ _id: id, deletedAt: null});
};

export const updateSubjectService = async (id,data) => {
    const subjectUpdate = await Subject.findOneAndUpdate(
        {_id: id,deletedAt:null},
        {$set: data},
        {new: true, runValidators: true}
    );
    return subjectUpdate;
};

export const softDeleteSubjectService = async (id) => {
    return await Subject.findByIdAndUpdate(
        {_id: id,deletedAt: { $ne: new Date() }},
        {$set: {deletedAt: null}},
        {new: true}
    );
};

export const restoreSubjectService = async (id) => {
    return await Subject.findByIdAndUpdate(
        {_id: id,deletedAt: { $ne: null }},
        {$set: {deletedAt: null}},
        {new: true}
    );
};

export const deleteSubjectService = async (id) => {
	return await Subject.findOneAndDelete({ _id: id, deletedAt: null });
};



