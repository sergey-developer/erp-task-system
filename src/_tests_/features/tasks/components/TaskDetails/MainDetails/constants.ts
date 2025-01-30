import { MainDetailsProps } from 'features/task/components/TaskDetails/MainDetails/index'
import { TaskOlaStatusEnum, TaskStatusEnum } from 'features/task/constants/task/index'

import { fakeDateString, fakeIdStr, fakeWord } from '_tests_/utils'

export const props: Readonly<MainDetailsProps> = {
  name: fakeWord(),
  title: fakeWord(),
  recordId: fakeIdStr(),
  status: TaskStatusEnum.New,
  createdAt: fakeDateString(),
  contactService: fakeWord(),
  olaEstimatedTime: Date.now(),
  olaStatus: TaskOlaStatusEnum.NotExpired,
  olaNextBreachTime: fakeWord(),
  previousOlaNextBreachTime: null,
  isOlaNextBreachTimeChanged: false,
  createdBy: null,
  address: null,
  contactPhone: null,
  portablePhone: null,
  responseTime: null,
  workGroup: null,
  assignee: null,
}

export enum TestIdsEnum {
  TaskDetailsMainDetails = 'task-details-main-details',
}
