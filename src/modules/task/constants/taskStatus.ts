import { TaskStatusEnum } from './enums'

export const taskStatusDictionary: Record<TaskStatusEnum, string> = {
  [TaskStatusEnum.New]: 'Ожидает выполнения',
  [TaskStatusEnum.Appointed]: 'Назначено',
  [TaskStatusEnum.InProgress]: 'В работе',
  [TaskStatusEnum.Completed]: 'Выполнено',
  [TaskStatusEnum.Awaiting]: 'В ожидании',
  [TaskStatusEnum.InReclassification]: 'На переклассификации',
  [TaskStatusEnum.Returned]: 'Возврат заявителем',
  [TaskStatusEnum.Closed]: '',
}
