import { StringMap } from 'shared/interfaces/utils'

export enum TaskDetailsTabsEnum {
  TaskList = 'TaskList',
  CommentList = 'CommentList',
  Resolution = 'Resolution',
  Description = 'Description',
  Journal = 'Journal',
}

export const taskDetailsTabNamesDict: Readonly<StringMap<TaskDetailsTabsEnum>> =
  {
    [TaskDetailsTabsEnum.TaskList]: 'Задания',
    [TaskDetailsTabsEnum.CommentList]: 'Комментарии',
    [TaskDetailsTabsEnum.Resolution]: 'Решение',
    [TaskDetailsTabsEnum.Description]: 'Описание',
    [TaskDetailsTabsEnum.Journal]: 'Журнал',
  }
