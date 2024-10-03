import { screen } from '@testing-library/react'

import { TestIdsEnum } from '_tests_/features/tasks/components/UserShortInfo/constants'

const findContainer = () => screen.findByTestId(TestIdsEnum.UserShortInfo)

export const userShortInfoTestUtils = {
  findContainer,
}
