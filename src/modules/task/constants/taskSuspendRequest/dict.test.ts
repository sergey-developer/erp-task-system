import { SuspendReasonEnum } from 'modules/task/constants/taskSuspendRequest'

import { suspendReasonDict } from './dict'

test('task suspend reason', () => {
  expect(suspendReasonDict[SuspendReasonEnum.AwaitingInformation]).toBe(
    'Ожидание информации от пользователя',
  )
  expect(suspendReasonDict[SuspendReasonEnum.AwaitingNonItWork]).toBe(
    'Ожидание работ вне зоны ответственности ИТ',
  )
  expect(suspendReasonDict[SuspendReasonEnum.AwaitingInitiator]).toBe('Ожидание пользователя')
  expect(suspendReasonDict[SuspendReasonEnum.AwaitingRelease]).toBe('Ожидание релиза')
  expect(suspendReasonDict[SuspendReasonEnum.AwaitingPurchase]).toBe('Ожидание закупки')
  expect(suspendReasonDict[SuspendReasonEnum.AwaitingInformationFromFirstLine]).toBe(
    'Ожидание информации от пользователя, уточнение через 1-ю линию',
  )
})
