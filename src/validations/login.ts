import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.email("Insira um login válido"),
  password: z.string({ error: "Digite a senha" }).min(6, "Insira a senha")
});

export type loginForm = z.infer<typeof loginFormSchema>;
