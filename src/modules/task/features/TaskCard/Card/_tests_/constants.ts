import taskFixtures from 'fixtures/task'

import { TaskCardProps } from '../index'

export const requiredProps: TaskCardProps = {
  details: taskFixtures.getTask(),
  closeTaskCard: jest.fn(),

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

  reclassificationRequest: null,
  reclassificationRequestIsLoading: false,
  createReclassificationRequest: jest.fn(),
  createReclassificationRequestIsLoading: false,

  onExpandAdditionalInfo: jest.fn(),
  additionalInfoExpanded: false,
}
