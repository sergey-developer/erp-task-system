import pick from 'lodash/pick'

import { TaskModel } from 'features/task/models'

import { ChangeInfrastructurePageLocationState } from './types'

export const getChangeInfrastructurePageLocationState = (
  task: TaskModel,
): ChangeInfrastructurePageLocationState => ({
  task: pick(task, 'infrastructureProject', 'workType', 'recordId', 'id', 'assignee'),
})
