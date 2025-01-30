import { TaskOlaStatusEnum } from 'features/task/constants/task'

import { getOlaStatusTextType } from './getOlaStatusTextType'

describe('Возвращается корректное значение, если "olaStatus" имеет значение', () => {
  test(`${TaskOlaStatusEnum.Expired}`, () => {
    const type = getOlaStatusTextType(TaskOlaStatusEnum.Expired)
    expect(type).toBe('danger')
  })

  test(`${TaskOlaStatusEnum.HalfExpired}`, () => {
    const type = getOlaStatusTextType(TaskOlaStatusEnum.HalfExpired)
    expect(type).toBe('warning')
  })

  test(`${TaskOlaStatusEnum.NotExpired}`, () => {
    const type = getOlaStatusTextType(TaskOlaStatusEnum.NotExpired)
    expect(type).toBeUndefined()
  })
})
