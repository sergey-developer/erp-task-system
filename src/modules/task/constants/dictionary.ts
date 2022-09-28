import {
  TaskExtraStatusEnum,
  TaskStatusEnum,
} from 'modules/task/constants/common'
import { StringMap } from 'shared/interfaces/utils'

export const taskStatusDict: Readonly<
  Partial<StringMap<TaskStatusEnum | TaskExtraStatusEnum>>
> = {
  [TaskExtraStatusEnum.Assigned]: 'Есть назначенный',
  [TaskExtraStatusEnum.NotAssigned]: 'Без назначенного',
  [TaskStatusEnum.InProgress]: 'В работе',
  [TaskStatusEnum.Completed]: 'Выполнено',
  [TaskStatusEnum.Awaiting]: 'В ожидании',
  [TaskStatusEnum.InReclassification]: 'На переклассификации',
  [TaskStatusEnum.Returned]: 'Возврат заявителем',
  [TaskStatusEnum.Closed]: 'Закрытые',
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
