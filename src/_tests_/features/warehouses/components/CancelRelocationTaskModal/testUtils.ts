import { screen } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { TestIdsEnum } from '_tests_/features/warehouses/components/CancelRelocationTaskModal/constants'
import { buttonTestUtils } from '_tests_/helpers'

const getContainer = () => screen.getByTestId(TestIdsEnum.CancelRelocationTaskModal)
const findContainer = () => screen.findByTestId(TestIdsEnum.CancelRelocationTaskModal)

// confirm button
const getConfirmButton = () => buttonTestUtils.getButtonIn(getContainer(), /Отменить заявку/)
const clickConfirmButton = async (user: UserEvent) => {
  const button = getConfirmButton()
  await user.click(button)
}

// cancel button
const getCancelButton = () => buttonTestUtils.getButtonIn(getContainer(), 'Отменить')
const clickCancelButton = async (user: UserEvent) => {
  const button = getCancelButton()
  await user.click(button)
}

export const cancelRelocationTaskModalTestUtils = {
  getContainer,
  findContainer,

  getConfirmButton,
  clickConfirmButton,

  getCancelButton,
  clickCancelButton,

  expectLoadingStarted: () => buttonTestUtils.expectLoadingStarted(getConfirmButton()),
  expectLoadingFinished: () => buttonTestUtils.expectLoadingFinished(getConfirmButton()),
}
