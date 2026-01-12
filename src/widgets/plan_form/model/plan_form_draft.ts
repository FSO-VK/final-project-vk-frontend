import { Medication } from '@/entities/medication';
import { PlanDayPeriod, PlanDraft } from '@/entities/plan';

// Some common js module import magic.
import * as rrule from 'rrule';
const { RRule, datetime } = rrule;

export interface PlanFormDraft {
  medication: Medication;
  period: PlanDayPeriod;
  intakeStart: Date;
  intakeEnd: Date;
  intakeDaysInterval: number;
  dosage: number;
  timeOfIntake: string[];
}

const jsDateToDatetime = (jsD: Date) => {
  return datetime(
    jsD.getUTCFullYear(),
    jsD.getUTCMonth(),
    jsD.getUTCDay(),
    jsD.getUTCHours(),
    jsD.getUTCMinutes(),
    jsD.getUTCSeconds(),
  );
};

export function adaptPlanFormDraft(pfd: PlanFormDraft): PlanDraft {
  const recurrenceRule = pfd.timeOfIntake.map((time) => {
    const [hour, min] = time.split(':');
    const actualStart = new Date(pfd.intakeStart);
    actualStart.setHours(Number(hour), Number(min));

    let singleRule: rrule.RRule;

    switch (pfd.period) {
      case PlanDayPeriod.EveryDay:
        singleRule = new RRule({
          freq: RRule.DAILY,
          dtstart: jsDateToDatetime(actualStart),
        });
        break;
      case PlanDayPeriod.EveryXDays:
        singleRule = new RRule({
          freq: RRule.DAILY,
          interval: pfd.intakeDaysInterval,
          dtstart: jsDateToDatetime(actualStart),
        });
        break;
    }

    return singleRule.toString();
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
