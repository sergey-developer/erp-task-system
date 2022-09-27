import { StringMap } from 'shared/interfaces/utils'

export enum TaskDetailsTabsEnum {
  Tasks = 'Tasks',
  Comments = 'Comments',
  Resolution = 'Resolution',
  Description = 'Description',
  Journal = 'Journal',
}

export const taskDetailsTabNamesDict: Readonly<StringMap<TaskDetailsTabsEnum>> =
  {
    [TaskDetailsTabsEnum.Tasks]: 'Задания',
    [TaskDetailsTabsEnum.Comments]: 'Комментарии',
    [TaskDetailsTabsEnum.Resolution]: 'Решение',
    [TaskDetailsTabsEnum.Description]: 'Описание',
    [TaskDetailsTabsEnum.Journal]: 'Журнал',
  }
