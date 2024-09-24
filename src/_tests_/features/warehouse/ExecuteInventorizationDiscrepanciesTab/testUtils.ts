import { screen } from '@testing-library/react'

import { TestIdsEnum } from './constants'

const getContainer = () => screen.getByTestId(TestIdsEnum.ExecuteInventorizationDiscrepanciesTab)

export const executeInventorizationDiscrepanciesTabTestUtils = {
  getContainer,
}
