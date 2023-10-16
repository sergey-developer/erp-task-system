import moment, { DurationFormatSettings } from 'moment-timezone'
// import dayjs from 'dayjs'
// import durationPlugin from 'dayjs/plugin/duration'
// import relativeTimePlugin from 'dayjs/plugin/relativeTime'

// dayjs.extend(durationPlugin)
// dayjs.extend(relativeTimePlugin)

export const humanizeDuration = (
  // duration: moment.DurationInputArg1,
  duration: number,
  unit: moment.unitOfTime.DurationConstructor,
  // unit: string,
  settings: DurationFormatSettings,
): string =>
  moment.duration(duration, unit).format(settings)
  // dayjs.duration(duration, 'milliseconds').format('D[д] H[ч] m[мин]')
