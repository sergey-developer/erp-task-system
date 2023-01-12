import times from 'lodash/times'

import {
  generateDateString,
  generateId,
  generateName,
  generateWord,
} from '_tests_/utils'
import commonFixtures from 'fixtures/common'
import {
  TaskExtendedStatusEnum,
  TaskOlaStatusEnum,
  TaskStatusEnum,
} from 'modules/task/constants/common'
import { TaskTableListItem } from 'modules/task/features/TaskTable/interfaces'

import workGroupFixtures from '../workGroup'
import taskFixtures from './index'

export const getTaskTableItem = (
  props?: Partial<
    Pick<TaskTableListItem, 'status' | 'extendedStatus' | 'olaStatus'>
  >,
): TaskTableListItem => ({
  id: generateId(),
  name: generateName(),
  title: generateWord(),
  workGroup: workGroupFixtures.getWorkGroup(),
  supportGroup: commonFixtures.getSupportGroup(),
  createdAt: generateDateString(),
  recordId: generateWord(),
  lastComment: generateWord(),
  status: props?.status || TaskStatusEnum.New,
  extendedStatus: props?.extendedStatus || TaskExtendedStatusEnum.New,
  olaStatus: props?.olaStatus || TaskOlaStatusEnum.NotExpired,
  assignee: taskFixtures.getTaskAssignee(),
  olaNextBreachTime: generateDateString(),
})

export const getTaskTableItems = (
  length: number = 1,
): Array<TaskTableListItem> => times(length, () => getTaskTableItem())
