import { TaskWorkGroupModel } from 'modules/task/models'

import { generateId, generateWord } from '_tests_/utils'

export const getWorkGroup = (
  props?: Partial<Pick<TaskWorkGroupModel, 'id'>>,
): TaskWorkGroupModel => ({
  id: props?.id || generateId(),
  name: generateWord(),
})
