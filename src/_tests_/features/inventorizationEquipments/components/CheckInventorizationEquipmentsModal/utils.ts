import { screen } from '@testing-library/react'

import { TestIdsEnum } from './constants'

const getContainer = () => screen.getByTestId(TestIdsEnum.Modal)
const findContainer = () => screen.findByTestId(TestIdsEnum.Modal)

export const checkInventorizationEquipmentsModalTestUtils = {
  getContainer,
  findContainer,
}
