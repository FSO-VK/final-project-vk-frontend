import { Medication } from '@/entities/medication';
import { PlanDayPeriod, PlanDraft } from '@/entities/plan';

export interface PlanFormDraft {
  medication: Medication;
  period: PlanDayPeriod;
  intakeStart: Date;
  intakeEnd: Date;
  intakeDaysInterval: number;
  dosage: number;
  timeOfIntake: string[];
}

export function adaptPlanFormDraft(pfd: PlanFormDraft): PlanDraft {
  let recurrenceRulePrefix: string;

  switch (pfd.period) {
    case PlanDayPeriod.EveryDay:
      recurrenceRulePrefix = 'FREQ=DAILY;';
      break;
    case PlanDayPeriod.EveryXDays:
      recurrenceRulePrefix = `FREQ=DAILY;INTERVAL=${pfd.intakeDaysInterval};`;
      break;
  }

  const recurrenceRule = pfd.timeOfIntake.map((time) => {
    const [hour, min] = time.split(':');
    return recurrenceRulePrefix + `BYHOUR=${hour};BYMINUTE=${min}`;
  });

  return {
    medicationId: pfd.medication.id,
    amount: {
      value: pfd.dosage,
      unit: pfd.medication.amount.unit,
    },
    condition: `Пора принять ${pfd.medication.name}`,
    startDate: new Date(pfd.intakeStart),
    endDate: new Date(pfd.intakeEnd),
    recurrenceRule: recurrenceRule,
  };
}
