import { screen } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { TestIdsEnum } from '_tests_/features/warehouses/components/InventorizationDetails/constants'
import { buttonTestUtils, spinnerTestUtils } from '_tests_/helpers'

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
