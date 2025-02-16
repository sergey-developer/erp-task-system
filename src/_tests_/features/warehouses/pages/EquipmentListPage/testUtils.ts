import { screen } from '@testing-library/react'

import { TestIdsEnum } from './constants'

const getContainer = () => screen.getByTestId(TestIdsEnum.EquipmentsPage)

export const equipmentListPageTestUtils = {
  getContainer,
}
