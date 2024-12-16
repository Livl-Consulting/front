import { z } from "zod";

export type FormState<T> = {
    success: boolean;
    errors?: z.ZodFormattedError<T>;
    message?: string;
}