import { screen } from '@testing-library/react'

import { TestIdsEnum } from '_tests_/features/tasks/components/FastFilters/constants'

const getContainer = () => screen.getByTestId(TestIdsEnum.FastFilters)

export const testUtils = {
  getContainer,
}
