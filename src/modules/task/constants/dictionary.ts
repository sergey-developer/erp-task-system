import {
  TaskExtendedStatusEnum,
  TaskExtraStatusEnum,
  TaskStatusEnum,
} from 'modules/task/constants/common'
import { StringMap } from 'shared/interfaces/utils'

import { FastFilterEnum } from '../features/TaskList/constants/common'

export const taskExtendedStatusToTaskStatus: Partial<
  Record<TaskExtendedStatusEnum, TaskStatusEnum>
> = {
  [TaskExtendedStatusEnum.Awaiting]: TaskStatusEnum.Awaiting,
  [TaskExtendedStatusEnum.Returned]: TaskStatusEnum.Returned,
  [TaskExtendedStatusEnum.InReclassification]:
    TaskStatusEnum.InReclassification,
}

export const taskStatusDict: Readonly<Partial<StringMap<TaskStatusEnum>>> = {
  [TaskStatusEnum.InProgress]: 'В работе',
  [TaskStatusEnum.Completed]: 'Выполнено',
  [TaskStatusEnum.Awaiting]: 'В ожидании',
  [TaskStatusEnum.InReclassification]: 'На переклассификации',
  [TaskStatusEnum.Returned]: 'Возврат заявителем',
  [TaskStatusEnum.Closed]: 'Закрытые',
}

export const taskExtraStatusDict: Readonly<StringMap<TaskExtraStatusEnum>> = {
  [TaskExtraStatusEnum.Assigned]: 'Есть назначенный',
  [TaskExtraStatusEnum.NotAssigned]: 'Без назначенного',
}

export const taskFilterStatusDict: Readonly<StringMap<FastFilterEnum.Overdue>> =
  {
    [FastFilterEnum.Overdue]: 'Просроченные',
  }

export const taskImpactMap = new Map([
  [1, '1-всеохватывающее/широкое'],
  [2, '2-значительное/большое'],
  [3, '3-умеренное/ограниченное'],
  [4, '4-малое/локализованное'],
])

export const taskSeverityMap = new Map([
  [1, '1-критическая'],
  [2, '2-высокая'],
  [3, '3-средняя'],
  [4, '4-низкая'],
])

export const taskPriorityMap = new Map([
  [1, '1-критический'],
  [2, '2-высокий'],
  [3, '3-средний'],
  [4, '4-низкий'],
])
