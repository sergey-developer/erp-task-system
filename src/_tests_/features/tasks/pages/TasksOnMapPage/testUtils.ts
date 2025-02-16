import { screen } from '@testing-library/react'

import { TestIdsEnum } from '_tests_/features/tasks/pages/TasksOnMapPage/constants'

const getContainer = () => screen.getByTestId(TestIdsEnum.TasksOnMapPage)

export const testUtils = {
  getContainer,
}
