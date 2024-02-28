import { BlockProps } from 'antd/es/typography/Base'
import isNumber from 'lodash/isNumber'
import { DurationFormatSettings } from 'moment-timezone'

import { TaskModel, TaskResponseTimeModel } from 'modules/task/models'
import { checkOlaStatusHalfExpired } from 'modules/task/utils/task'

import { MaybeNull, Nullable } from 'shared/types/utils'
import { formatDate, humanizeDuration } from 'shared/utils/date'
import { makeString } from 'shared/utils/string'

const taskRemainingTimeDurationSettings: DurationFormatSettings = {
  template: 'Mмес Dд hhч mmмин',
  trim: 'all',
}

const getTaskRemainingTime = (value: number): string =>
  humanizeDuration(value, 'milliseconds', taskRemainingTimeDurationSettings)

export const getTaskCompleteAtDate = ({
  olaStatus,
  olaEstimatedTime,
  olaNextBreachTime,
}: Partial<Pick<TaskModel, 'olaStatus' | 'olaNextBreachTime' | 'olaEstimatedTime'>>): string => {
  if (!olaNextBreachTime) return ''

  const taskRemainingTime =
    olaStatus && isNumber(olaEstimatedTime) && checkOlaStatusHalfExpired(olaStatus)
      ? getTaskRemainingTime(olaEstimatedTime)
      : null

  return makeString(' ', 'до', formatDate(olaNextBreachTime), taskRemainingTime)
}

const responseTimeDurationSettings: DurationFormatSettings = {
  template: 'Dд hhч mmмин ssсек',
  trim: 'all',
}

export const humanizeResponseTime = (responseTime: TaskResponseTimeModel): string =>
  humanizeDuration(responseTime.timedelta, 'milliseconds', responseTimeDurationSettings)

export const parseResponseTime = (
  responseTime: Nullable<TaskModel['responseTime']>,
  workGroup: Nullable<TaskModel['workGroup']>,
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
