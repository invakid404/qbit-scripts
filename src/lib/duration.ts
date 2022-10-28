import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export const parseDuration = (
  durationStr: string,
): duration.Duration | null => {
  const value = durationStr.slice(0, -1);
  const unit = durationStr.at(-1);

  const parsedDuration = dayjs.duration(
    Number(value),
    unit as duration.DurationUnitType,
  );

  if (Number.isNaN(parsedDuration.asMilliseconds())) {
    return null;
  }

  return parsedDuration;
};
