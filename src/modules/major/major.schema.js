import {z} from "zod";

export const majorSchema = z.object({
    name: z.string().min(1, "Major name is required"),
    description: z.string().optional(),
});
