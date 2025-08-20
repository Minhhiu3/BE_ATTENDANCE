import { generateSessionDates } from "./class.utils.js";
import mongoose from "mongoose";
import Class from "./class.model.js";
import { queryBuilder } from "../../common/utils/query-builder.js";
import Session from "../session/session.model.js";
import { createError } from "../../common/utils/create-error.js";

//create class
export const createClassService = async (classData) => {
    // Sử dụng transaction để đảm bảo tính toàn vẹn dữ liệu
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        //validate input'
        const { totalSessions, startDate, daysOfWeek } = classData;
        if (!totalSessions || !startDate || !daysOfWeek) {
            throw createError(400, "Thiếu totalSessions, startDate hoặc daysOfWeek");
        }

        //create class
        const classInstance = await Class.create([classData], {session});
        const createClass = classInstance[0];
        console.log("🧪 daysOfWeek type:", typeof daysOfWeek, daysOfWeek);
        const datesOfWeek = Array.isArray(daysOfWeek)? daysOfWeek.map(Number): String(daysOfWeek).split(",").map(Number);


        //tạo các buổi học trong sesions
        const sessionDates = generateSessionDates(
            new Date(startDate),
            totalSessions,
            datesOfWeek,
        );

        const sessions = sessionDates.map((sessionDate) => ({
            classId: createClass._id,
            sessionDate,
            note: "", 
        }));

        //tao cac document trong sessions
        await Session.insertMany(sessions, { session });

        //commit transaction

        await session.commitTransaction();
        session.endSession();

        return classInstance[0];

    } catch (error) {
        //rollback transaction neu co loi
        await session.abortTransaction();
        session.endSession();
        throw createError(error.status || 500, error.message || "Lỗi khi tạo lớp học");
    }
};

export const getAllCLassService = async (query) => {
    const { includeDeleted = false, ...queryParams } = query;
    const data = await queryBuilder(
        Class,
        {
            ...queryParams,
            includeDeleted: includeDeleted === 'true',
            searchFields: ['name', 'teacherId', 'subjectId', 'majorId'],
        },
        {
            populate: [
                { path: 'teacherId', select: 'name' },
                { path: 'subjectId', select: 'name' },
                { path: 'majorId', select: 'name' },
            ]
        }
    );
    console.log(data);
    
    return data;
}