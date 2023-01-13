import { generateId, generateWord } from '_tests_/utils'
import { TaskWorkGroupModel } from 'modules/task/models'

export const getTaskWorkGroup = (
  props?: Partial<Pick<TaskWorkGroupModel, 'id'>>,
): TaskWorkGroupModel => ({
  id: props?.id || generateId(),
  name: generateWord(),
})
