import { z } from "zod";

export const pacoteSchema = z.object({
  nome: z.string().min(3, "Nome muito curto"),

  categoria_id: z
    .number()
    .int("Categoria inválida")
    .positive("Categoria é obrigatória"),

  data_inicio: z.string().optional(),

  preco: z.coerce.number().positive("Preço deve ser maior que zero"),

  moeda: z.enum(["EUR", "USD", "BRL", "GBP"]),

  texto_destaque: z.string().optional(),
  resumo: z.string().optional(),
  descricao: z.string().optional(),
});

export type PacoteFormData = z.infer<typeof pacoteSchema>;
