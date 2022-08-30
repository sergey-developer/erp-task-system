import { StringMap } from 'shared/interfaces/utils'

import { TaskStatusEnum } from './enums'

export const taskStatusDict: Partial<StringMap<TaskStatusEnum>> = {
  [TaskStatusEnum.New]: 'Ожидает выполнения',
  [TaskStatusEnum.Appointed]: 'Назначено',
  [TaskStatusEnum.InProgress]: 'В работе',
  [TaskStatusEnum.Completed]: 'Выполнено',
  [TaskStatusEnum.Awaiting]: 'В ожидании',
  [TaskStatusEnum.InReclassification]: 'На переклассификации',
  [TaskStatusEnum.Returned]: 'Возврат заявителем',
}
