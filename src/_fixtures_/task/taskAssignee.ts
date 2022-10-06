import { generateEmail, generateId, generateWord } from '_tests_/utils'
import { TaskAssigneeModel } from 'modules/task/models'
import { UserRolesEnum } from 'shared/constants/roles'

export const getTaskAssignee = (
  props?: Partial<Pick<TaskAssigneeModel, 'role'>>,
): TaskAssigneeModel => ({
  id: generateId(),
  firstName: generateWord(),
  lastName: generateWord(),
  middleName: generateWord(),
  email: generateEmail(),
  role: props?.role || UserRolesEnum.FirstLineSupport,
})
