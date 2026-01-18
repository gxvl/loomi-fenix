import { z } from "zod";

export const ticketFormSchema = z.object({
  name: z.string("Insira um nome válido"),
  email: z.email("Insira um email válido"),
  priority: z.string("Selecione uma prioridade"),
  responsible: z.string("Insira um responsável"),
  subject: z
    .string("Insira um assunto")
    .min(5, "O assunto deve ter ao menos 5 caracteres")
});

export type ticketForm = z.infer<typeof ticketFormSchema>;
