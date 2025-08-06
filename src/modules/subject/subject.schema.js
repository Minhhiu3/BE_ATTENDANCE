import {z} from "zod";

const subjectSchema = z.object({
    name: z.string().min(2).max(100),
    description: z.string().min(2).max(500).optional(),
    englishName: z.string().min(2).max(100),
});

export default subjectSchema;
