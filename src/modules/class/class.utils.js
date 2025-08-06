import { createError } from "../../common/utils/create-error";
import { CLASSMESSAGE } from "./class.message";

// Hàm tính toán ngày cho các buổi học dựa trên daysOfWeek
/* * @param {Date} startDate - Ngày bắt đầu của lớp học
 * @param {number} totalSessions - Tổng số buổi học
 * @param {Array<number>} daysOfWeek - Mảng các ngày trong tuần (0-6, với 0 là Chủ nhật)
 * @returns {Array<Date>} - Mảng các ngày của buổi học
 */

export const generateClassDates = (startDate, totalSessions, daysOfWeek = [1]) =>{
    if (!daysOfWeek || daysOfWeek.length === 0) {
        throw createError(400, CLASSMESSAGE.DAYS_OF_WEEK_INVALID);
    }

    const sessionDates = [];
    let sessionCount = 0;
    let currentWeek = 0;

    while( sessionCount < totalSessions ) {
        for(const day of daysOfWeek){
            if (sessionCount >= totalSessions) {
                break;
            }
        }
    }
}