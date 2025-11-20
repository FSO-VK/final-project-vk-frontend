import { Medication } from '../model/medication';

export const INITIAL_GAUGE_POSITION = 90;

export const getGaugeState = (medication: Medication | undefined | null) => {
  if (!medication) {
    return {
      fillPercentage: 0,
      displayPercentage: 0,
      strokeColor: '#000000',
      show: false,
    };
  }
  const expiresAt = medication.expirationDate.getTime();
  const producedAt = medication.releaseDate?.getTime();
  const currentTime = Date.now();
  if (producedAt === undefined) {
    return {
      fillPercentage: 0,
      displayPercentage: 0,
      strokeColor: '#000000',
      show: false,
    };
  }

  const fullInterval = expiresAt - producedAt;
  const remainsInterval = expiresAt - currentTime;

  const percentage = (remainsInterval / fullInterval) * 100;
  if (percentage < 0) {
    return {
      fillPercentage: 100,
      displayPercentage: 0,
      strokeColor: 'var(--clr-danger-5)',
      show: true,
    };
  }

  let strokeColor: string;

  if (percentage <= 30) {
    strokeColor = 'var(--clr-danger-5)';
  } else if (percentage <= 60) {
    strokeColor = 'var(--clr-warning-6)';
  } else {
    strokeColor = 'var(--clr-success-6)';
  }

  return {
    fillPercentage: percentage,
    displayPercentage: percentage,
    strokeColor,
    show: true,
  };
};
