import { screen } from '@testing-library/react'

import { TestIdsEnum } from '_tests_/features/warehouses/components/ExecuteInventorizationDiscrepanciesTab/constants'

const getContainer = () => screen.getByTestId(TestIdsEnum.ExecuteInventorizationDiscrepanciesTab)

export const executeInventorizationDiscrepanciesTabTestUtils = {
  getContainer,
}
