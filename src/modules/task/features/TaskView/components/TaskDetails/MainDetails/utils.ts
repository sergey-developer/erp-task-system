import { DurationFormatSettings } from 'moment'

import { TaskDetailsModel } from 'modules/task/features/TaskView/models'
import getOlaStatusMap from 'modules/task/utils/getOlaStatusMap'
import { DATE_TIME_FORMAT } from 'shared/constants/dateTime'
import formatDate from 'shared/utils/date/formatDate'
import humanizeDuration from 'shared/utils/date/humanizeDuration'
import makeString from 'shared/utils/string/makeString'

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
  TaskDetailsModel,
  'olaStatus' | 'olaNextBreachTime' | 'olaEstimatedTime'
>): string => {
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
