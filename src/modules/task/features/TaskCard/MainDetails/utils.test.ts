import setupMoment from 'lib/moment/setup'
import { TaskOlaStatusEnum } from 'modules/task/constants/common'

import { getCompleteAt } from '../utils'

beforeAll(() => {
  setupMoment()
})

test('Корректный результат для не просроченной заявки', () => {
  const result = getCompleteAt({
    olaNextBreachTime: new Date(2024, 3, 3, 3, 3, 3).toISOString(),
    olaEstimatedTime: 5353455,
    olaStatus: TaskOlaStatusEnum.NotExpired,
  })

  expect(result).toMatch('до 03.04.2024, 03:03:03')
})

test('Корректный результат для просроченной заявки', () => {
  const result = getCompleteAt({
    olaNextBreachTime: new Date(2023, 2, 2, 2, 2, 2).toISOString(),
    olaEstimatedTime: 5353455,
    olaStatus: TaskOlaStatusEnum.Expired,
  })

  expect(result).toMatch('до 02.03.2023, 02:02:02')
})

test('Корректный результат для заявки у которой прошло более половины времени', () => {
  const result = getCompleteAt({
    olaNextBreachTime: new Date(2022, 1, 1, 1, 1, 1).toISOString(),
    olaEstimatedTime: 13926399226,
    olaStatus: TaskOlaStatusEnum.HalfExpired,
  })

  expect(result).toMatch('до 01.02.2022, 01:01:01 5мес 9д 04ч 27мин')
})
