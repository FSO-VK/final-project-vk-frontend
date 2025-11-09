import * as z from 'zod/mini';

export const BaseDTO = z.object({
  id: z.uuid(),
  name: z.string(),
  internationalName: z.optional(z.string()),
  amount: z.object({
    value: z.number(),
    unit: z.string(),
  }),
  releaseForm: z.string(),
  group: z.optional(z.array(z.string())),
  producer: z.optional(
    z.object({
      name: z.string(),
      country: z.string(),
    }),
  ),
  activeSubstance: z.optional(
    z.array(
      z.object({
        name: z.string(),
        value: z.number(),
        unit: z.string(),
      }),
    ),
  ),
  expirationDate: z.pipe(
    z.iso.date(),
    z.transform((val) => new Date(val)),
  ),
  releaseDate: z.optional(
    z.pipe(
      z.iso.date(),
      z.transform((val) => new Date(val)),
    ),
  ),
});
