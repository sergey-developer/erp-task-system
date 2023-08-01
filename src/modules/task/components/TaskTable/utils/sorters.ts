import { taskStatusDict } from 'modules/task/constants'

import { TaskTableListItem } from '../types'

export const statusSorter = (
  { status: statusA }: TaskTableListItem,
  { status: statusB }: TaskTableListItem,
): 1 | -1 | 0 =>
  taskStatusDict[statusA] < taskStatusDict[statusB]
    ? -1
    : taskStatusDict[statusA] > taskStatusDict[statusB]
    ? 1
    : 0
