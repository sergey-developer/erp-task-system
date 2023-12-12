import { TaskDetailsTabsEnum } from 'modules/task/constants/task'

export const taskDetailsTabExist = (key: string): boolean =>
  Object.values(TaskDetailsTabsEnum).some((tabKey) => tabKey === key)
