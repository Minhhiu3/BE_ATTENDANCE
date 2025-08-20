import { z } from "zod";
import { ShiftEnum } from "../../common/constants/enum.js";
import { CLASSMESSAGE } from "./class.message.js";

export const createClassSchema = z
  .object({
    subjectId: z.string(),
    majorId: z.string(),
    name: z.string().min(1, CLASSMESSAGE.CLASS_REQUIRED_NAME),
    teacherId: z.string(),
    studentIds: z.array(z.string()).optional(),
    startDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: CLASSMESSAGE.CLASS_INVALID_START_DATE,
    }),
    totalSessions: z.number().int().min(1, CLASSMESSAGE.CLASS_INVALID_TOTAL_SESIONS),
    shift: z.enum(Object.values(ShiftEnum), {
      errorMap: () => ({ message: CLASSMESSAGE.CLASS_INVALID_SHIFT }),
    }),
    linkOnline: z.string().optional(),
    room: z.string().optional(),
    deletedAt: z.date().optional().nullable(),
    description: z.string().optional(),
    maxStudents: z
      .number()
      .int()
      .min(1, "Số lượng sinh viên tối thiểu là 1")
      .max(100, "Số lượng sinh viên tối đa không được vượt quá 100")
      .optional(),
    room: z.string().optional(),
    daysOfWeek: z.array(z.number().min(0).max(6)),
  })
  .strict();

export const updateClassSchema = z
  .object({
    subjectId: z.string().optional(),
    majorId: z.string().optional(),
    name: z.string().min(1, CLASSMESSAGE.CLASS_REQUIRED_NAME).optional(),
    teacherId: z.string().optional(),
    studentIds: z.array(z.string()).optional(),
    startDate: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), {
        message: CLASSMESSAGE.CLASS_INVALID_START_DATE,
      })
      .optional(),
    totalSessions: z
      .number()
      .int()
      .min(1, CLASSMESSAGE.CLASS_INVALID_TOTAL_SESIONS)
      .optional(),
    shift: z
      .enum(Object.values(ShiftEnum), {
        errorMap: () => ({ message: CLASSMESSAGE.CLASS_INVALID_SHIFT }),
      })
      .optional(),
    deletedAt: z.date().optional().nullable(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: CLASSMESSAGE.CLASS_INVALID_UPDATE_REQUIRED,
  });