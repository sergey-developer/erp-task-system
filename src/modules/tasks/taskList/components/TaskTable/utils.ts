import moment from 'moment'

import { Assignee } from 'modules/tasks/models'
import { DATE_TIME_FORMAT } from 'shared/constants/dateTime'
import { MaybeNull } from 'shared/interfaces/utils'

export const getDateTimeString = (value: string): string => {
  const momentTime = moment(value)
  return momentTime.isValid()
    ? momentTime.format(DATE_TIME_FORMAT)
    : 'Некорректная дата'
}

export const getFIOString = (value: MaybeNull<Assignee>): string =>
  value
    ? `${value.lastName} ${value.firstName.charAt(0)}.${
        value?.middleName ? value.middleName.charAt(0) + '.' : ''
      }`
    : ''
