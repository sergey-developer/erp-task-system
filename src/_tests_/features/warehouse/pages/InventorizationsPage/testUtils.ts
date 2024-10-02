import { screen } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { buttonTestUtils } from '_tests_/utils/index'

import { TestIdsEnum } from './constants'

const getContainer = () => screen.getByTestId(TestIdsEnum.InventorizationsPage)

// filter button
const getFilterButton = () => buttonTestUtils.getFilterButtonIn(getContainer())
const clickFilterButton = (user: UserEvent) =>
  buttonTestUtils.clickFilterButtonIn(getContainer(), user)

export const inventorizationsPageTestUtils = {
  getContainer,

  getFilterButton,
  clickFilterButton,
}
