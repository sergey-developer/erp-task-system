import { TaskStatusEnum } from 'modules/task/constants/enums'
import { StringMap } from 'shared/interfaces/utils'

export const taskStatusDict: Partial<StringMap<TaskStatusEnum>> = {
  [TaskStatusEnum.New]: 'Ожидает выполнения',
  [TaskStatusEnum.Appointed]: 'Назначено',
  [TaskStatusEnum.InProgress]: 'В работе',
  [TaskStatusEnum.InReclassification]: 'На переклассификации',
  [TaskStatusEnum.Awaiting]: 'В ожидании',
  [TaskStatusEnum.Returned]: 'Возврат заявителем',
  [TaskStatusEnum.Completed]: 'Выполнено',
  [TaskStatusEnum.Closed]: 'Закрыта',
  [TaskStatusEnum.Overdue]: 'Просроченные',
}

export const taskExtendedStatusDict: Partial<StringMap<TaskStatusEnum>> = {
  [TaskStatusEnum.New]: 'Новая',
  [TaskStatusEnum.Appointed]: 'Назначена',
  [TaskStatusEnum.InProgress]: 'В работе',
  [TaskStatusEnum.InReclassification]: 'На переклассификации',
  [TaskStatusEnum.Awaiting]: 'В ожидании',
  [TaskStatusEnum.Returned]: 'Возвращена',
  [TaskStatusEnum.Completed]: 'Выполнена',
  [TaskStatusEnum.Closed]: 'Закрыта',
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
