import { TaskDetailDTO } from 'features/tasks/api/dto'
import pick from 'lodash/pick'

import { ChangeInfrastructurePageLocationState } from './types'

export const getChangeInfrastructurePageLocationState = (
  task: TaskDetailDTO,
): ChangeInfrastructurePageLocationState => ({
  task: pick(task, 'infrastructureProject', 'workType', 'recordId', 'id', 'assignee'),
})
