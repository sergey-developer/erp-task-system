import { BlockProps } from 'antd/es/typography/Base'
import { DurationFormatSettings } from 'moment'

import {
  BaseTaskModel,
  TaskModel,
  TaskResponseTimeModel,
} from 'modules/task/models'
import getOlaStatusMap from 'modules/task/utils/getOlaStatusMap'

import { DATE_TIME_FORMAT } from 'shared/constants/dateTime'
import { MaybeNull } from 'shared/interfaces/utils'
import { formatDate, humanizeDuration } from 'shared/utils/date'
import { makeString } from 'shared/utils/string'

const taskRemainingTimeDurationSettings: DurationFormatSettings = {
  template: 'Mмес Dд hhч mmмин',
  trim: 'all',
}

const getTaskRemainingTime = (value: number): string =>
  humanizeDuration(value, 'milliseconds', taskRemainingTimeDurationSettings)

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

const responseTimeDurationSettings: DurationFormatSettings = {
  template: 'Dд hhч mmмин ssсек',
  trim: 'all',
}

export const humanizeResponseTime = (
  responseTime: TaskResponseTimeModel,
): string =>
  humanizeDuration(
    responseTime.timedelta,
    'milliseconds',
    responseTimeDurationSettings,
  )

export const parseResponseTime = (
  responseTime: BaseTaskModel['responseTime'],
  workGroup: BaseTaskModel['workGroup'],
): MaybeNull<{ type: BlockProps['type']; value: string }> => {
  if (!responseTime || !!workGroup) return null

  const parsedProgress = Number(responseTime.progress.toFixed(1))
  const isExpired = parsedProgress === 1
  const isExpiredMoreThanHalf = parsedProgress > 0.5

  const humanizedValue = humanizeResponseTime(responseTime)
  let value = humanizedValue

  const daysRegexpResult = /(\dд)/g.exec(humanizedValue)
  const daysString = daysRegexpResult?.[0]
  const days = daysString?.split('д')[0]
  const parsedDays = days ? parseInt(days) : 0
  const moreThanFiveDays = parsedDays > 5
  const lessOrEqualFiveDays = parsedDays <= 5

  let type: BlockProps['type']

  if (isExpired) {
    if (lessOrEqualFiveDays) {
      type = 'danger'
    } else if (moreThanFiveDays) {
      type = 'danger'
      value = 'более 5 дней'
    }
  } else {
    if (isExpiredMoreThanHalf) {
      type = 'warning'
    } else {
      type = 'success'
    }
  }

  return { value, type }
}
