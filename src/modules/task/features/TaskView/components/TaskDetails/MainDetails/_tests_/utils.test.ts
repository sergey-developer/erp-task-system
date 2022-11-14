import { generateDateString } from '_tests_/utils'
import { TaskOlaStatusEnum } from 'modules/task/constants/common'

import { getCompleteAt } from '../utils'

const baseArgs: Omit<Parameters<typeof getCompleteAt>[0], 'olaStatus'> = {
  olaNextBreachTime: generateDateString(),
  olaEstimatedTime: 5353455,
}

export const baseDateTimeRegexp =
  /^до\s\d{1,2}\.\d{1,2}\.\d{1,4},\s(?:\d{1,2}:\d{1,2}:\d{1,2})$/

const halfExpiredDateTimeRegexp =
  /^до\s\d{1,2}\.\d{1,2}\.\d{1,4},\s\d{1,2}:\d{1,2}:\d{1,2}\s(?:\d{1,2}мес\s)?(?:\d{1,2}д\s)?(?:\d{1,2}ч\s)?(?:\d{1,2}мин)$/

test('Корректный результат для не просроченной заявки', () => {
  const result = getCompleteAt({
    ...baseArgs,
    olaStatus: TaskOlaStatusEnum.NotExpired,
  })

  expect(result).toMatch(baseDateTimeRegexp)
})

test('Корректный результат для просроченной заявки', () => {
  const result = getCompleteAt({
    ...baseArgs,
    olaStatus: TaskOlaStatusEnum.Expired,
  })

  expect(result).toMatch(baseDateTimeRegexp)
})

test('Корректный результат для заявки у которой прошло более половины времени', () => {
  const result = getCompleteAt({
    ...baseArgs,
    olaStatus: TaskOlaStatusEnum.HalfExpired,
  })

  expect(result).toMatch(halfExpiredDateTimeRegexp)
})
