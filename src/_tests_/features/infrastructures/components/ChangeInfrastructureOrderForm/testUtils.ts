import { screen } from '@testing-library/react'

import { TestIdsEnum } from './constants'

const getContainer = () => screen.getByTestId(TestIdsEnum.ChangeInfrastructureOrderFormContainer)

export const changeInfrastructureOrderFormTestUtils = {
  getContainer,
}
