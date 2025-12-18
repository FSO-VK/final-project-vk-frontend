import { backendClient } from '../../client';
import * as z from 'zod/mini';

export interface GetInstructionOptions {
  medicationId: string;
}

export const GetInstructionDTO = z.object({
  diseases: z.array(
    z.object({
      code: z.string(),
      name: z.string(),
    }),
  ),
  clPhPointers: z.array(
    z.object({
      code: z.string(),
      name: z.string(),
    }),
  ),
  pharmInfluence: z.string(),
  pharmKinetics: z.string(),
  dosage: z.string(),
  overDosage: z.string(),
  interaction: z.string(),
  lactation: z.string(),
  sideEffects: z.string(),
  usingIndication: z.string(),
  usingCounterIndication: z.string(),
  specialInstruction: z.string(),
  renalInfluence: z.string(),
  hepaticInfluence: z.string(),
  elderlyUsage: z.string(),
  childUsage: z.string(),
});

export async function getInstruction(
  options: GetInstructionOptions,
): Promise<z.infer<typeof GetInstructionDTO>> {
  const body = await backendClient.get(
    `/medication/medication/${options.medicationId}/instruction`,
    { useCredentials: true },
  );
  return GetInstructionDTO.parse(body);
}

export async function getInstructionMock(
  _options: GetInstructionOptions,
): Promise<z.infer<typeof GetInstructionDTO>> {
  return await Promise.resolve({
    diseases: [
      {
        code: 'J03..',
        name: 'Острый тонзиллит',
      },
      {
        code: 'J35.0',
        name: 'Хронический тонзиллит',
      },
      {
        code: 'K05..',
        name: 'Гингивит и болезни пародонта',
      },
      {
        code: 'K12..',
        name: 'Стоматит и родственные поражения',
      },
      {
        code: 'Z29.8',
        name: 'Другие уточненные профилактические меры',
      },
    ],
    clPhPointers: [
      {
        code: '24.01.07',
        name: 'Антисептики для местного применения в оториноларингологии',
      },
      {
        code: '25.01.06',
        name: 'Антисептики для местного применения в стоматологии',
      },
      {
        code: '31.03',
        name: 'Антисептики для местного применения',
      },
    ],
    pharmInfluence:
      'Антисептическое средство для местного применения в ЛОР-практике и стоматологии. Оказывает бактериостатическое действие. Активен в отношении Streptococcus haemoliticus, Streptococcus viridans и Pneumococcus.',
    pharmKinetics: '',
    dosage: 'Взрослым - 30-50 мг/сут, в течение 3-4 дней. Детям от 3 до 7 лет - 30 мг/сут.',
    overDosage: '',
    interaction: '',
    lactation:
      'При беременности и в период грудного вскармливания применяют в случаях, когда ожидаемая польза терапии для матери превышает возможный риск для плода или грудного ребенка.',
    sideEffects: '<I>Возможны</I> аллергические реакции.',
    usingIndication:
      'Профилактика и лечение острых инфекционно-воспалительных заболеваний полости рта и гортани (тонзиллиты, стоматиты, гингивиты). Профилактика инфекционно-воспалительных заболеваний после удаления зубов.',
    usingCounterIndication: 'Повышенная чувствительность к амбазону.',
    specialInstruction:
      'После приема амбазона рекомендуется воздержаться от приема пищи и питья в течение 3 ч.',
    renalInfluence: 'Специальных предостережений не имеется.',
    hepaticInfluence: 'Специальных предостережений не имеется.',
    elderlyUsage: 'Специальных предостережений не имеется.',
    childUsage: '<P>Применяют у детей старше 3 лет.</P>',
  });
}
