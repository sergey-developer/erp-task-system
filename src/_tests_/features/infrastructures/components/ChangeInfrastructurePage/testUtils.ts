import { screen } from '@testing-library/react'

import { TestIdsEnum } from './constants'

const getContainer = () =>
  screen.getByTestId(TestIdsEnum.ChangeInfrastructureOrderFormTableContainer)

export const changeInfrastructureOrderFormTableTestUtils = {
  getContainer,
}
