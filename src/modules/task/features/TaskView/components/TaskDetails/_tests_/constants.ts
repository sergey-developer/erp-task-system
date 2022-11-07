import { getTask } from 'fixtures/task'

import { TaskDetailsProps } from '../index'

export const requiredProps: TaskDetailsProps = {
  details: getTask(),
  closeTaskDetails: jest.fn(),

  taskIsLoading: false,
  isGetTaskError: false,

  workGroupList: [],
  workGroupListIsLoading: false,

  deleteWorkGroup: jest.fn(),
  deleteWorkGroupIsLoading: false,

  updateWorkGroup: jest.fn(),
  updateWorkGroupIsLoading: false,

  updateAssignee: jest.fn(),
  updateAssigneeIsLoading: false,

  resolveTask: jest.fn(),
  isTaskResolving: false,

  takeTask: jest.fn(),
  takeTaskIsLoading: false,

  createReclassificationRequest: jest.fn(),
  createReclassificationRequestIsLoading: false,
  reclassificationRequest: null,

  onExpandAdditionalInfo: jest.fn(),
  additionalInfoExpanded: false,
}
