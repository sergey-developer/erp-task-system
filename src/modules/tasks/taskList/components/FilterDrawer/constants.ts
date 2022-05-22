import { TaskStatusEnum } from 'modules/tasks/constants'

export const taskStatusDictionary: Record<TaskStatusEnum, string> = {
  [TaskStatusEnum.Appointed]: 'В ожидании',
  [TaskStatusEnum.Awaiting]: 'В ожидании (Awaiting?)',
  [TaskStatusEnum.Closed]: 'Возврат с II линии',
  [TaskStatusEnum.Completed]: 'Выполнено',
  [TaskStatusEnum.InProgress]: 'В работе',
  [TaskStatusEnum.InReclassification]:
    'На переклассификации (InReclassification?)',
  [TaskStatusEnum.New]: 'Ожидает выполнения',
  [TaskStatusEnum.Reclassified]: 'На переклассификации',
}
