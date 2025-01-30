import { TaskOlaStatusEnum } from 'features/task/constants/task'

import { getOlaStatusMap } from './checkOlaStatus'

describe('Корректно работает если "olaStatus" имеет значение', () => {
  test(`${TaskOlaStatusEnum.Expired}`, () => {
    const status = getOlaStatusMap(TaskOlaStatusEnum.Expired)
    expect(status.isExpired).toBe(true)
    expect(status.isNotExpired).toBe(false)
    expect(status.isHalfExpired).toBe(false)
  })

  test(`${TaskOlaStatusEnum.NotExpired}`, () => {
    const status = getOlaStatusMap(TaskOlaStatusEnum.NotExpired)
    expect(status.isNotExpired).toBe(true)
    expect(status.isExpired).toBe(false)
    expect(status.isHalfExpired).toBe(false)
  })

  test(`${TaskOlaStatusEnum.HalfExpired}`, () => {
    const status = getOlaStatusMap(TaskOlaStatusEnum.HalfExpired)
    expect(status.isHalfExpired).toBe(true)
    expect(status.isNotExpired).toBe(false)
    expect(status.isExpired).toBe(false)
  })
})
