import moment, { DurationFormatSettings } from 'moment'

export const humanizeDuration = (
  duration: moment.DurationInputArg1,
  unit: moment.unitOfTime.DurationConstructor,
  settings: DurationFormatSettings,
): string => moment.duration(duration, unit).format(settings)
