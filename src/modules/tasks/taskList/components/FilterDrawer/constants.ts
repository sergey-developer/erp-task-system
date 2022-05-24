import { SearchQueries, TaskStatusEnum } from 'modules/tasks/models'

export const searchQueriesDictionary: Record<keyof SearchQueries, string> = {
  searchByTitle: 'Тема',
  searchByName: 'Объект',
  searchByAssignee: 'Исполнитель',
}

export const taskStatusDictionary: Record<TaskStatusEnum, string> = {
  [TaskStatusEnum.Appointed]: 'Назначено',
  [TaskStatusEnum.Awaiting]: 'В ожидании',
  [TaskStatusEnum.Closed]: 'Возврат с II линии',
  [TaskStatusEnum.Completed]: 'Выполнено',
  [TaskStatusEnum.InProgress]: 'В работе',
  [TaskStatusEnum.InReclassification]: 'На переклассификации',
  [TaskStatusEnum.New]: 'Ожидает выполнения',
  [TaskStatusEnum.Reclassified]: 'Переклассифицировано',
}
