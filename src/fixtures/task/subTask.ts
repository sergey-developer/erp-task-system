import times from 'lodash/times'

import { SubTaskModel } from 'modules/task/features/TaskView/models'

import { getTask } from './task'
import { getTaskWorkGroup } from './taskWorkGroup'

export const getSubTask = (): SubTaskModel => ({
  ...getTask(),
  workGroup: getTaskWorkGroup(),
})

export const getSubTaskList = (length: number = 1): Array<SubTaskModel> =>
  times(length, () => getSubTask())
