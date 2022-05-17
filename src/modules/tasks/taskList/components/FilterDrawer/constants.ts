import { TaskStatusEnum } from 'modules/tasks/taskList/components/TaskListPage/constants'

export const taskStatusDictionary = {
  [TaskStatusEnum.Appointed]: 'В ожидании',
  [TaskStatusEnum.Closed]: 'Возврат с II линии',
  [TaskStatusEnum.Completed]: 'Выполнено',
  [TaskStatusEnum.InProgress]: 'В работе',
  [TaskStatusEnum.New]: 'Ожидает выполнения',
  [TaskStatusEnum.Reclassified]: 'На переклассификации',
}