import { screen } from '@testing-library/react'

import { TestIdsEnum } from '_tests_/features/tasks/pages/TaskListMapPage/constants'

const getContainer = () => screen.getByTestId(TestIdsEnum.TaskListMapPage)

export const testUtils = {
  getContainer,
}
