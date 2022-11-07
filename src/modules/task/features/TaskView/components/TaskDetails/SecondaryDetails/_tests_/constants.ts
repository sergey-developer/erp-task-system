import { generateId, generateIdStr } from '_tests_/utils'
import {
  TaskExtendedStatusEnum,
  TaskStatusEnum,
} from 'modules/task/constants/common'

import { SecondaryDetailsProps } from '../index'

export const requiredProps: Omit<SecondaryDetailsProps, 'workGroup'> = {
  id: generateId(),
  recordId: generateIdStr(),
  status: TaskStatusEnum.New,
  extendedStatus: TaskExtendedStatusEnum.New,
  workGroupList: [],
  workGroupListIsLoading: false,
  hasReclassificationRequest: false,
  transferTaskToSecondLine: jest.fn(),
  transferTaskToSecondLineIsLoading: false,
  transferTaskToFirstLine: jest.fn(),
  transferTaskToFirstLineIsLoading: false,
  assignee: null,
  takeTask: jest.fn(),
  takeTaskIsLoading: false,
  updateAssignee: jest.fn(),
  updateAssigneeIsLoading: false,
}
