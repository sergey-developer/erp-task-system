import moment, { Moment } from 'moment-timezone'

import { DATE_TIME_FORMAT } from 'shared/constants/dateTime'

export const formatDate = (
  date: moment.MomentInput,
  format: string = DATE_TIME_FORMAT,
): ReturnType<Moment['format']> => {
  if (!date) return ''
  const momentDate = moment(date)
  return momentDate.isValid() ? momentDate.format(format) : 'Некорректная дата'
}
