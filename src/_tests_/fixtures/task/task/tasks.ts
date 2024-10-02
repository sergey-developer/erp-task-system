import times from 'lodash/times'

import {
  TaskExtendedStatusEnum,
  TaskOlaStatusEnum,
  TaskStatusEnum,
  TaskTypeEnum,
} from 'modules/task/constants/task'
import { GetTasksSuccessResponse, TaskListItemModel } from 'modules/task/models'

import commonFixtures from '_tests_/fixtures/common'
import supportGroupFixtures from '_tests_/fixtures/supportGroup'
import taskFixtures from '_tests_/fixtures/task'
import { fakeDateString, fakeId, fakeIdStr, fakeInteger, fakeWord } from '_tests_/utils'

export const taskListItem = (
  props?: Partial<
    Pick<
      TaskListItemModel,
      'status' | 'extendedStatus' | 'olaStatus' | 'type' | 'olaNextBreachTime'
    >
  >,
): TaskListItemModel => ({
  status: props?.status || TaskStatusEnum.New,
  extendedStatus: props?.extendedStatus || TaskExtendedStatusEnum.New,
  olaStatus: props?.olaStatus || TaskOlaStatusEnum.NotExpired,
  type: props?.type || TaskTypeEnum.Request,
  olaNextBreachTime: props?.olaNextBreachTime || fakeDateString(),

  responseTime: null,
  id: fakeId(),
  assignee: taskFixtures.assignee(),
  lastComment: fakeWord(),
  createdAt: fakeDateString(),
  recordId: fakeIdStr(),
  workGroup: taskFixtures.workGroup(),
  supportGroup: supportGroupFixtures.supportGroup(),
  title: fakeWord(),
  name: fakeWord(),
  subtasksCounter: { all: fakeInteger(), completed: fakeInteger() },
})

export const tasks = (length: number = 1): TaskListItemModel[] =>
  times(length, () => taskListItem())

export const getTasksResponse = (
  list: GetTasksSuccessResponse['results'],
): GetTasksSuccessResponse => commonFixtures.paginatedListResponse(list)
