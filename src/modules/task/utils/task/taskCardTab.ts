import { TaskCardTabsEnum } from 'modules/task/constants/task'

export const validateTaskCardTab = (key: string): boolean =>
  Object.values(TaskCardTabsEnum).some((tabKey) => tabKey === key)
