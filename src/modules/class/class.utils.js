import { createError } from "../../common/utils/create-error.js";
import { CLASSMESSAGE } from "./class.message.js";

// Hàm tính toán ngày cho các buổi học dựa trên daysOfWeek
/* * @param {Date} startDate - Ngày bắt đầu của lớp học
 * @param {number} totalSessions - Tổng số buổi học
 * @param {Array<number>} daysOfWeek - Mảng các ngày trong tuần (0-6, với 0 là Chủ nhật)
 * @returns {Array<Date>} - Mảng các ngày của buổi học
 */

export const generateSessionDates = (startDate, totalSessions, daysOfWeek = [1]) =>{
    if (!daysOfWeek || daysOfWeek.length === 0) {
        throw createError(400, CLASSMESSAGE.DAYS_OF_WEEK_INVALID);
    }

// sessionDates: Một mảng rỗng để lưu trữ các ngày của buổi sát.
// sessionCount: Theo dõi số lượng buổi học đã được lập lịch (bắt đầu từ 0).
// currentWeek: Theo dõi số tuần kể từ ngày bắt đầu (bắt đầu từ 0).
    const sessionDates = [];
    let sessionCount = 0;
    let currentWeek = 0;

    while( sessionCount < totalSessions ) {
        for(const day of daysOfWeek){
            if (sessionCount >= totalSessions) {
                break;
            }
            const nextDate = new Date(startDate);
            //tính ngày dựa trên ngày bắt đầu và ngày được chọn trong tuần
            nextDate.setDate(
                startDate.getDate() + ((day - startDate.getDay() + 7) % 7) + currentWeek * 7
            );
        sessionDates.push(nextDate);
        sessionCount++
        };

    }
    currentWeek++ ;
    return sessionDates.sort((a,b) => (a - b));
}