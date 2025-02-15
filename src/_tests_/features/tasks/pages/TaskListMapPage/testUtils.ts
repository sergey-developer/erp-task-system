import { screen } from '@testing-library/react'

import { TestIdsEnum } from '_tests_/features/tasks/pages/TasksMapPage/constants'

const getContainer = () => screen.getByTestId(TestIdsEnum.TasksMapPage)

export const testUtils = {
  getContainer,
}
