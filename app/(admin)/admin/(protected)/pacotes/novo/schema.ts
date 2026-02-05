import { z } from "zod";

export const pacoteSchema = z.object({
  nome: z.string().min(3, "Nome muito curto"),

  categoria_id: z.number().int().positive("Categoria é obrigatória"),

  data_inicio: z.string().optional(),

  preco: z.coerce.number().positive("Preço deve ser maior que zero"),

  moeda: z.enum(["EUR", "USD", "BRL", "GBP"]).optional(),

  texto_destaque: z.string().nullable().optional(),
  resumo: z.string().nullable().optional(),
  descricao: z.string().optional(),
  destaque: z.boolean().optional(),
});

export const pacotePatchSchema = z.object({
  nome: z.string().min(3),
  categoria_id: z.number(),
  data_inicio: z.string().optional(),
  preco: z.number().positive(),
  texto_destaque: z.string().optional(),
  resumo: z.string().optional(),
  descricao: z.string().optional(),
  destaque: z.boolean().optional(),
});

export type PacoteFormData = z.infer<typeof pacoteSchema>;
