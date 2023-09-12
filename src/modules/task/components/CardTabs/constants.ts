import { StringMap } from 'shared/types/utils'

export enum TaskCardTabsEnum {
  SubTaskList = 'SubTaskList',
  CommentList = 'CommentList',
  Resolution = 'Resolution',
  Description = 'Description',
  Journal = 'Journal',
}

export const taskCardTabNamesDict: Readonly<StringMap<TaskCardTabsEnum>> = {
  [TaskCardTabsEnum.SubTaskList]: 'Задания',
  [TaskCardTabsEnum.CommentList]: 'Комментарии',
  [TaskCardTabsEnum.Resolution]: 'Решение',
  [TaskCardTabsEnum.Description]: 'Описание',
  [TaskCardTabsEnum.Journal]: 'Журнал',
}
