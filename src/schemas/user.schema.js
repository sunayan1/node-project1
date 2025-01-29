import {z} from "zod"

const GenderEnum= z.enum(["Male", "Female", "Other"]);

const creatUserSchema = z.object({
    fullName: z.string(),
    email: z.string(),
    password: z.string(),
    gender: GenderEnum,
    
});