import { screen } from '@testing-library/react'

import { TestIdsEnum } from './constants'

const findContainer = () => screen.findByTestId(TestIdsEnum.UserShortInfo)

export const userShortInfoTestUtils = {
  findContainer,
}
