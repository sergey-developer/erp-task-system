import times from 'lodash/times'

import { generateId, generateWord } from '_tests_/utils'
import { SubTaskModel } from 'modules/task/features/TaskView/models'

import { getTask } from './task'

export const getSubTask = (): SubTaskModel => ({
  ...getTask(),
  workGroup: generateWord(),
  parentId: generateId(),
})

export const getSubTaskList = (length: number = 1): Array<SubTaskModel> =>
  times(length, () => getSubTask())
