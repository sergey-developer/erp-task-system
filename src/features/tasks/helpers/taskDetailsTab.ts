import { TaskDetailsTabsEnum } from 'features/tasks/constants'

export const taskDetailsTabExist = (key: string): boolean =>
  Object.values(TaskDetailsTabsEnum).some((tabKey) => tabKey === key)
