import {
  TaskExtendedStatusEnum,
  TaskOlaStatusEnum,
  TaskStatusEnum,
} from 'features/tasks/api/constants'
import { TaskTableItem } from 'features/tasks/components/TaskTable/types'
import times from 'lodash/times'

import supportGroupsFixtures from '_tests_/fixtures/supportGroups'
import taskFixtures from '_tests_/fixtures/tasks'
import { fakeDateString, fakeId, fakeIdStr, fakeInteger, fakeName, fakeWord } from '_tests_/helpers'

export const taskTableItem = (
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
  workGroup: taskFixtures.workGroup(),
  supportGroup: supportGroupsFixtures.supportGroup(),
  createdAt: fakeDateString(),
  recordId: fakeIdStr(),
  lastComment: fakeWord(),
  assignee: taskFixtures.assignee(),
  subtasksCounter: { all: fakeInteger(), completed: fakeInteger() },
  responseTime: taskFixtures.taskResponseTime(),
})

export const taskTableItems = (length: number = 1): TaskTableItem[] =>
  times(length, () => taskTableItem())
