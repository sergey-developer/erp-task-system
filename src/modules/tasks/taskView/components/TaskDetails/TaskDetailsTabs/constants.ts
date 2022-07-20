export enum TaskDetailsTabsEnum {
  Tasks = 'Tasks',
  Comments = 'Comments',
  Resolution = 'Resolution',
  Description = 'Description',
}

export const taskDetailsTabNames = {
  [TaskDetailsTabsEnum.Tasks]: 'Задания',
  [TaskDetailsTabsEnum.Comments]: 'Комментарии',
  [TaskDetailsTabsEnum.Resolution]: 'Решение',
  [TaskDetailsTabsEnum.Description]: 'Описание',
} as const
