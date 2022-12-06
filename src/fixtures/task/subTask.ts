import times from 'lodash/times'

import { generateWord } from '_tests_/utils'
import { SubTaskModel } from 'modules/task/features/TaskView/models'

import { getTask } from './task'

export const getSubTask = (): SubTaskModel => ({
  ...getTask(),
  workGroup: generateWord(),
})

export const getSubTaskList = (length: number = 1): Array<SubTaskModel> =>
  times(length, () => getSubTask())
