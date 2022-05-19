import moment from 'moment'

import { Assignee } from 'modules/tasks/models'
import { DATE_TIME_FORMAT } from 'shared/constants/dateTime'
import { MaybeNull } from 'shared/interfaces/utils'

export const getDateTimeString = (value: string): string | false => {
  const momentTime = moment(value)
  return momentTime.isValid() && momentTime.format(DATE_TIME_FORMAT)
}

export const getFIOString = (value: MaybeNull<Assignee>): string | null =>
  value &&
  `${value.lastName} ${value.firstName.charAt(0)}.${
    value?.middleName ? value.middleName.charAt(0) + '.' : ''
  }`
