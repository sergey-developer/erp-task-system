import moment from 'moment'

import { DATE_TIME_FORMAT } from 'shared/constants/dateTime'

export const getDateTimeString = (value: string): string | false => {
  const momentTime = moment(value)
  return momentTime.isValid() && momentTime.format(DATE_TIME_FORMAT)
}
