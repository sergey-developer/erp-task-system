import { SuspendReasonEnum, TaskExtendedStatusEnum, TaskStatusEnum } from '../api/constants'
import {
  suspendReasonDict,
  taskExtendedStatusDict,
  taskImpactMap,
  taskPriorityMap,
  taskSeverityMap,
  taskStatusDict,
} from './dict'

test('task status', () => {
  expect(taskStatusDict[TaskStatusEnum.New]).toBe('Новая')
  expect(taskStatusDict[TaskStatusEnum.InProgress]).toBe('В работе')
  expect(taskStatusDict[TaskStatusEnum.Awaiting]).toBe('В ожидании')
  expect(taskStatusDict[TaskStatusEnum.Completed]).toBe('Выполнена')
  expect(taskStatusDict[TaskStatusEnum.Closed]).toBe('Закрыта')
})

test('task extended status', () => {
  expect(taskExtendedStatusDict[TaskExtendedStatusEnum.New]).toBe('Новые')
  expect(taskExtendedStatusDict[TaskExtendedStatusEnum.InProgress]).toBe('В работе')
  expect(taskExtendedStatusDict[TaskExtendedStatusEnum.Completed]).toBe('Выполнено')
  expect(taskExtendedStatusDict[TaskExtendedStatusEnum.Awaiting]).toBe('В ожидании')
  expect(taskExtendedStatusDict[TaskExtendedStatusEnum.InReclassification]).toBe(
    'На переклассификации',
  )
  expect(taskExtendedStatusDict[TaskExtendedStatusEnum.Returned]).toBe('Возврат заявителем')
  expect(taskExtendedStatusDict[TaskExtendedStatusEnum.Closed]).toBe('Закрытые')
})

test('task impact', () => {
  expect(taskImpactMap.get(1)).toBe('1-всеохватывающее/широкое')
  expect(taskImpactMap.get(2)).toBe('2-значительное/большое')
  expect(taskImpactMap.get(3)).toBe('3-умеренное/ограниченное')
  expect(taskImpactMap.get(4)).toBe('4-малое/локализованное')
})

test('task severity', () => {
  expect(taskSeverityMap.get(1)).toBe('1-критическая')
  expect(taskSeverityMap.get(2)).toBe('2-высокая')
  expect(taskSeverityMap.get(3)).toBe('3-средняя')
  expect(taskSeverityMap.get(4)).toBe('4-низкая')
})

test('task priority', () => {
  expect(taskPriorityMap.get(1)).toBe('1-критический')
  expect(taskPriorityMap.get(2)).toBe('2-высокий')
  expect(taskPriorityMap.get(3)).toBe('3-средний')
  expect(taskPriorityMap.get(4)).toBe('4-низкий')
})

test('task suspend reason', () => {
  expect(suspendReasonDict[SuspendReasonEnum.AwaitingInformation]).toBe(
    'Ожидание информации от пользователя',
  )
  expect(suspendReasonDict[SuspendReasonEnum.AwaitingNonItWork]).toBe(
    'Ожидание работ вне зоны ответственности ИТ',
  )
  expect(suspendReasonDict[SuspendReasonEnum.AwaitingInitiator]).toBe('Ожидание пользователя')
  expect(suspendReasonDict[SuspendReasonEnum.AwaitingRelease]).toBe('Ожидание релиза/доработки')
  expect(suspendReasonDict[SuspendReasonEnum.AwaitingPurchase]).toBe('Ожидание закупки')
  expect(suspendReasonDict[SuspendReasonEnum.AwaitingInformationFromFirstLine]).toBe(
    'Ожидание информации от пользователя, уточнение через 1-ю линию',
  )
})
