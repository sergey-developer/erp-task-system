import { screen, within } from '@testing-library/react'

import { TestIdsEnum } from '_tests_/features/tasks/components/TaskAssignee/constants'

const getContainer = () => screen.getByTestId(TestIdsEnum.TaskAssignee)
const getContainerIn = (container: HTMLElement) =>
  within(container).getByTestId(TestIdsEnum.TaskAssignee)

const getAllContainerIn = (container: HTMLElement) =>
  within(container).getAllByTestId(TestIdsEnum.TaskAssignee)

const queryContainerIn = (container: HTMLElement) =>
  within(container).queryByTestId(TestIdsEnum.TaskAssignee)

export const taskAssigneeTestUtils = {
  getContainer,
  getContainerIn,
  getAllContainerIn,
  queryContainerIn,
}
