import {
  TaskExtendedStatusEnum,
  TaskStatusEnum,
} from 'modules/task/constants/common'
import { BaseTaskModel } from 'modules/task/models'
import { StringMap } from 'shared/interfaces/utils'

export const taskExtendedStatusToTaskStatus: Partial<
  Record<TaskExtendedStatusEnum, TaskStatusEnum>
> = {
  [TaskExtendedStatusEnum.Awaiting]: TaskStatusEnum.Awaiting,
  [TaskExtendedStatusEnum.Returned]: TaskStatusEnum.Returned,
  [TaskExtendedStatusEnum.InReclassification]:
    TaskStatusEnum.InReclassification,
}

export const taskStatusDict: Readonly<Partial<StringMap<TaskStatusEnum>>> = {
  [TaskStatusEnum.New]: 'Новая',
  [TaskStatusEnum.InProgress]: 'В работе',
  [TaskStatusEnum.Completed]: 'Выполнено',
  [TaskStatusEnum.Awaiting]: 'В ожидании',
  [TaskStatusEnum.InReclassification]: 'На переклассификации',
  [TaskStatusEnum.Returned]: 'Возврат заявителем',
  [TaskStatusEnum.Closed]: 'Закрытые',
}

export const taskStatusExtendedFilterDict = { ...taskStatusDict }
delete taskStatusExtendedFilterDict.NEW

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
