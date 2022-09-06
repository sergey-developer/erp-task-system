import { generateId } from '_tests_/utils'
import { TaskAssigneeModel } from 'modules/task/models'
import { UserRolesEnum } from 'shared/constants/roles'

export const getTaskAssignee = (): TaskAssigneeModel => ({
  id: generateId(),
  firstName: 'Assignee',
  lastName: 'Assignee',
  middleName: '',
  email: '',
  role: UserRolesEnum.Engineer,
})
