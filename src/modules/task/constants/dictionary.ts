import {
  FiscalAccumulatorFormatEnum,
  SuspendReasonEnum,
  TaskExtendedStatusEnum,
  TaskStatusEnum,
} from 'modules/task/constants'
import { BaseTaskModel } from 'modules/task/models'

import { StringMap } from 'shared/interfaces/utils'

export const taskStatusDict: Readonly<StringMap<TaskStatusEnum>> = {
  [TaskStatusEnum.New]: 'Новая',
  [TaskStatusEnum.InProgress]: 'В работе',
  [TaskStatusEnum.Awaiting]: 'В ожидании',
  [TaskStatusEnum.Completed]: 'Выполнена',
  [TaskStatusEnum.Closed]: 'Закрыта',
}

export const taskExtendedStatusDict: Readonly<
  Partial<StringMap<TaskExtendedStatusEnum>>
> = {
  [TaskExtendedStatusEnum.New]: 'Новые',
  [TaskExtendedStatusEnum.InProgress]: 'В работе',
  [TaskExtendedStatusEnum.Completed]: 'Выполнено',
  [TaskExtendedStatusEnum.Awaiting]: 'В ожидании',
  [TaskExtendedStatusEnum.InReclassification]: 'На переклассификации',
  [TaskExtendedStatusEnum.Returned]: 'Возврат заявителем',
  [TaskExtendedStatusEnum.Closed]: 'Закрытые',
}

export const taskImpactMap: Map<BaseTaskModel['initialImpact'], string> =
  new Map([
    [1, '1-всеохватывающее/широкое'],
    [2, '2-значительное/большое'],
    [3, '3-умеренное/ограниченное'],
    [4, '4-малое/локализованное'],
  ])

export const taskSeverityMap: Map<BaseTaskModel['severity'], string> = new Map([
  [1, '1-критическая'],
  [2, '2-высокая'],
  [3, '3-средняя'],
  [4, '4-низкая'],
])

export const taskPriorityMap: Map<BaseTaskModel['priorityCode'], string> =
  new Map([
    [1, '1-критический'],
    [2, '2-высокий'],
    [3, '3-средний'],
    [4, '4-низкий'],
  ])

/**
 Порядок значений имеет значение т.к. они отображаются с помощью `Object.values`
 */
export const suspendReasonDict: Readonly<StringMap<SuspendReasonEnum>> = {
  [SuspendReasonEnum.AwaitingInformation]:
    'Ожидание информации от пользователя',
  [SuspendReasonEnum.AwaitingInformationFromFirstLine]:
    'Ожидание информации от пользователя, уточнение через 1-ю линию',
  [SuspendReasonEnum.AwaitingInitiator]: 'Ожидание пользователя',
  [SuspendReasonEnum.AwaitingPurchase]: 'Ожидание закупки',
  [SuspendReasonEnum.AwaitingRelease]: 'Ожидание релиза',
  [SuspendReasonEnum.AwaitingNonItWork]:
    'Ожидание работ вне зоны ответственности ИТ',
}

export const fiscalAccumulatorFormatColorDict: Readonly<
  StringMap<FiscalAccumulatorFormatEnum>
> = {
  [FiscalAccumulatorFormatEnum.Dubbed]: '#6600ff',
  [FiscalAccumulatorFormatEnum.OutOfMemoryLess7]: '#F2994A',
  [FiscalAccumulatorFormatEnum.OutOfMemoryLess15]: '#EB5757',
  [FiscalAccumulatorFormatEnum.OutOfMemoryLess21]: '#F2994A',
}
