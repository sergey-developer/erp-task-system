import { DurationFormatSettings } from 'moment'

import { TaskModel } from 'modules/task/models'
import getOlaStatusMap from 'modules/task/utils/getOlaStatusMap'

import { DATE_TIME_FORMAT } from 'shared/constants/dateTime'
import { formatDate, humanizeDuration } from 'shared/utils/date'
import { makeString } from 'shared/utils/string'

const settings: DurationFormatSettings = {
  template: 'Mмес Dд hhч mmмин',
  trim: 'all',
}

const getTaskRemainingTime = (value: number): string =>
  humanizeDuration(value, 'milliseconds', settings)

export const getCompleteAt = ({
  olaStatus,
  olaEstimatedTime,
  olaNextBreachTime,
}: Pick<
  TaskModel,
  'olaStatus' | 'olaNextBreachTime' | 'olaEstimatedTime'
>): string => {
  if (!olaNextBreachTime) return ''

  const olaStatusMap = getOlaStatusMap(olaStatus)

  const formattedOlaNextBreachTime = formatDate(
    olaNextBreachTime,
    DATE_TIME_FORMAT,
  )

  const taskRemainingTime = olaStatusMap.isHalfExpired
    ? getTaskRemainingTime(olaEstimatedTime)
    : null

  return makeString(' ', 'до', formattedOlaNextBreachTime, taskRemainingTime)
}
