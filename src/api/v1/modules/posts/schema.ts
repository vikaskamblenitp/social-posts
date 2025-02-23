import z from "zod";

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
    })
}

export type TAddPostRequestBody = z.infer<typeof schema.addPosts>["body"]; 