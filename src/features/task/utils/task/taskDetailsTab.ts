import { TaskDetailsTabsEnum } from 'features/task/constants/task'

export const taskDetailsTabExist = (key: string): boolean =>
  Object.values(TaskDetailsTabsEnum).some((tabKey) => tabKey === key)
