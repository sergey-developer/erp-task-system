import {
  TaskExtendedStatusEnum,
  TaskOlaStatusEnum,
  TaskStatusEnum,
} from 'features/tasks/api/constants'
import { TaskTableItem } from 'features/tasks/components/TaskTable/types'
import times from 'lodash/times'

import supportGroupsFixtures from '_tests_/fixtures/api/data/supportGroups'
import tasksFixtures from '_tests_/fixtures/api/data/tasks/index'
import { fakeDateString, fakeId, fakeIdStr, fakeInteger, fakeName, fakeWord } from '_tests_/helpers'

export const tasksTableItem = (
  props?: Partial<
    Pick<TaskTableItem, 'status' | 'extendedStatus' | 'olaStatus' | 'olaNextBreachTime'>
  >,
): TaskTableItem => ({
  status: props?.status || TaskStatusEnum.New,
  extendedStatus: props?.extendedStatus || TaskExtendedStatusEnum.New,
  olaStatus: props?.olaStatus || TaskOlaStatusEnum.NotExpired,
  olaNextBreachTime: props?.olaNextBreachTime || fakeDateString(),

  id: fakeId(),
  name: fakeName(),
  title: fakeWord(),
  workGroup: tasksFixtures.taskWorkGroup(),
  supportGroup: supportGroupsFixtures.supportGroup(),
  createdAt: fakeDateString(),
  recordId: fakeIdStr(),
  lastComment: fakeWord(),
  assignee: tasksFixtures.taskAssignee(),
  subtasksCounter: { all: fakeInteger(), completed: fakeInteger() },
  responseTime: tasksFixtures.taskResponseTime(),
})

export const tasksTableItems = (length: number = 1): TaskTableItem[] =>
  times(length, () => tasksTableItem())
