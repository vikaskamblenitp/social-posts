import z from "zod";
import { Express } from "express";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

export const schema = {
    addPosts: z.object({
        body: z.object({
            title: z.string().nonempty(),
            desc: z.string().optional(),
        }),
        file: z.custom<Express.Multer.File>()
                .refine(file => !(file instanceof String), "File is required")
                .refine(file => file.size <= MAX_FILE_SIZE, `File size should be less than 5mb.`)
                .refine(file => file.mimetype.startsWith("image/"), "Only images are allowed")
                .optional()
    }),
    getPosts: z.object({
        query: z.object({
            page: z.coerce.number().min(1).positive().optional(),
            limit: z.coerce.number().min(1).positive().optional(),
            sort: z.object({
                created_at: z.enum(["asc", "desc"])
            }).optional(),
            filter: z.object({
                keyword: z.string().optional(),
                tag: z.string().optional()
            }).strict().optional()
        })
    })
}

export type TAddPostRequestBody = z.infer<typeof schema.addPosts>["body"];
export type TGetPostsQuery = z.infer<typeof schema.getPosts>["query"];