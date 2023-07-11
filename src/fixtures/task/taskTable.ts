import times from 'lodash/times'

import {
  TaskExtendedStatusEnum,
  TaskOlaStatusEnum,
  TaskStatusEnum,
} from 'modules/task/constants'
import { TaskTableListItem } from 'modules/task/features/TaskTable/interfaces'

import commonFixtures from 'fixtures/common'
import taskFixtures from 'fixtures/task'
import workGroupFixtures from 'fixtures/workGroup'

import {
  fakeDateString,
  fakeId,
  fakeIdStr,
  fakeInteger,
  fakeName,
  fakeWord,
} from '_tests_/utils'

export const taskTableItem = (
  props?: Partial<
    Pick<TaskTableListItem, 'status' | 'extendedStatus' | 'olaStatus'>
  >,
): TaskTableListItem => ({
  status: props?.status || TaskStatusEnum.New,
  extendedStatus: props?.extendedStatus || TaskExtendedStatusEnum.New,
  olaStatus: props?.olaStatus || TaskOlaStatusEnum.NotExpired,

  id: fakeId(),
  name: fakeName(),
  title: fakeWord(),
  workGroup: workGroupFixtures.workGroup(),
  supportGroup: commonFixtures.supportGroup(),
  createdAt: fakeDateString(),
  recordId: fakeIdStr(),
  lastComment: fakeWord(),
  assignee: taskFixtures.assignee(),
  olaNextBreachTime: fakeDateString(),
  subtasksCounter: { all: fakeInteger(), completed: fakeInteger() },
  responseTime: taskFixtures.taskResponseTime(),
})

export const taskTableItems = (
  length: number = 1,
): Array<TaskTableListItem> => times(length, () => taskTableItem())
