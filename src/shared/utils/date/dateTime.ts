import { Moment } from 'moment-timezone'

export const mergeDateTime = (date: Moment, time: Moment): Moment =>
  date
    .set('hours', time.get('hours'))
    .set('minutes', time.get('minutes'))
    .set('seconds', time.get('seconds'))
    .set('milliseconds', time.get('milliseconds'))
