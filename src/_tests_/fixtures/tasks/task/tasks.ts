import {
  TaskExtendedStatusEnum,
  TaskOlaStatusEnum,
  TaskStatusEnum,
  TaskTypeEnum,
} from 'features/tasks/api/constants'
import { GetTasksResponse, TaskDTO } from 'features/tasks/api/dto'
import times from 'lodash/times'

import commonFixtures from '_tests_/fixtures/common'
import supportGroupFixtures from '_tests_/fixtures/supportGroups'
import taskFixtures from '_tests_/fixtures/tasks'
import { fakeDateString, fakeId, fakeIdStr, fakeInteger, fakeWord } from '_tests_/utils'

export const taskListItem = (
  props?: Partial<
    Pick<TaskDTO, 'status' | 'extendedStatus' | 'olaStatus' | 'type' | 'olaNextBreachTime'>
  >,
): TaskDTO => ({
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

export const tasks = (length: number = 1): TaskDTO[] => times(length, () => taskListItem())

export const getTasksResponse = (list: GetTasksResponse['results']): GetTasksResponse =>
  commonFixtures.paginatedListResponse(list)
