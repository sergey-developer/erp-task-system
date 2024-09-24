import { screen } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { buttonTestUtils, spinnerTestUtils } from '_tests_/utils/index'

import { TestIdsEnum } from './constants'

const getContainer = () => screen.getByTestId(TestIdsEnum.InventorizationDetails)
const findContainer = () => screen.findByTestId(TestIdsEnum.InventorizationDetails)

const expectLoadingFinished = spinnerTestUtils.expectLoadingFinished(
  'inventorization-details-loading',
)

const getExecuteInventorizationButton = () =>
  buttonTestUtils.getButtonIn(getContainer(), 'Провести инвентаризацию')
const clickExecuteInventorizationButton = async (user: UserEvent) => {
  const button = getExecuteInventorizationButton()
  await user.click(button)
}

export const inventorizationDetailsTestUtils = {
  getContainer,
  findContainer,

  expectLoadingFinished,

  getExecuteInventorizationButton,
  clickExecuteInventorizationButton,
}
