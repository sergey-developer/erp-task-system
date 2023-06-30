import { BlockProps } from 'antd/es/typography/Base'
import { DurationFormatSettings } from 'moment-timezone'

import {
  BaseTaskModel,
  TaskModel,
  TaskResponseTimeModel,
} from 'modules/task/models'
import getOlaStatusMap from 'modules/task/utils/getOlaStatusMap'

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

  const formattedOlaNextBreachTime = formatDate(olaNextBreachTime)

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

  const isExpired = responseTime.progress === 1
  const isExpiredMoreThanHalf = responseTime.progress > 0.5

  const humanizedValue = humanizeResponseTime(responseTime)
  let value = humanizedValue

  const daysRegexpResult = /(\d+д)/g.exec(humanizedValue)
  const daysString = daysRegexpResult?.[0]
  const days = daysString?.split('д')[0]
  const parsedDays = days ? parseInt(days) : 0
  const moreOrEqualFiveDays = parsedDays >= 5
  const lessThanFiveDays = parsedDays < 5

  let type: BlockProps['type']

  if (isExpired) {
    if (lessThanFiveDays) {
      type = 'danger'
    } else if (moreOrEqualFiveDays) {
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
