import { generateId, generateWord } from '_tests_/utils'
import { getTaskWorkGroup } from 'fixtures/task'
import { getWorkGroupList } from 'fixtures/workGroup'
import {
  TaskExtendedStatusEnum,
  TaskStatusEnum,
} from 'modules/task/constants/common'

import { WorkGroupProps } from '../index'

export const requiredProps: Omit<WorkGroupProps, 'workGroup'> = {
  id: generateId(),
  recordId: generateWord(),
  status: TaskStatusEnum.New,
  extendedStatus: TaskExtendedStatusEnum.New,
  workGroupList: getWorkGroupList(),
  workGroupListIsLoading: false,
  transferTaskToFirstLine: jest.fn(),
  transferTaskToFirstLineIsLoading: false,
  transferTaskToSecondLine: jest.fn(),
  transferTaskToSecondLineIsLoading: false,
  hasReclassificationRequest: false,
}

export const firstLineButtonProps: Pick<
  WorkGroupProps,
  'workGroup' | 'status'
> = {
  workGroup: getTaskWorkGroup(),
  status: TaskStatusEnum.New,
}
