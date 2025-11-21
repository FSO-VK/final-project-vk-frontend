import { Medication } from '../model/medication';

export const INITIAL_GAUGE_POSITION = 90;

const HIGH_EXPIRATION_LEVEL_COLOR = 'var(--clr-danger-5)';
const MEDIUM_EXPIRATION_LEVEL_COLOR = 'var(--clr-warning-6)';
const LOW_EXPIRATION_LEVEL_COLOR = 'var(--clr-brand-6)';
const EXPIRED_COLOR = 'var(--clr-danger-5)';

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
      strokeColor: EXPIRED_COLOR,
      show: true,
    };
  }

  let strokeColor: string;

  if (percentage <= 30) {
    strokeColor = HIGH_EXPIRATION_LEVEL_COLOR;
  } else if (percentage <= 60) {
    strokeColor = MEDIUM_EXPIRATION_LEVEL_COLOR;
  } else {
    strokeColor = LOW_EXPIRATION_LEVEL_COLOR;
  }

  return {
    fillPercentage: percentage,
    displayPercentage: percentage,
    strokeColor,
    show: true,
  };
};
