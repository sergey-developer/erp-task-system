import { Moment } from 'moment-timezone'

export const setTimeToDate = (date: Moment, time: Moment): Moment =>
  date.set('hours', time.get('hours')).set('minutes', time.get('minutes'))
