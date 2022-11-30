import times from 'lodash/times'

import { generateId, generateWord } from '_tests_/utils'
import { SubTaskTemplateModel } from 'modules/task/features/TaskView/models'

export const getSubTaskTemplate = (): SubTaskTemplateModel => ({
  id: generateId(),
  title: generateWord(),
  code: generateWord(),
})

export const getSubTaskTemplateList = (
  length: number = 1,
): Array<SubTaskTemplateModel> => times(length, () => getSubTaskTemplate())
