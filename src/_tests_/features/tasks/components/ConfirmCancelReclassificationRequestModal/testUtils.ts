import { screen } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { TestIdsEnum } from '_tests_/features/tasks/components/ConfirmCancelReclassificationRequestModal/constants'
import { buttonTestUtils } from '_tests_/helpers'

const getContainer = () => screen.getByTestId(TestIdsEnum.ConfirmCancelReclassificationRequestModal)
const findContainer = () =>
  screen.findByTestId(TestIdsEnum.ConfirmCancelReclassificationRequestModal)

const getConfirmButton = () => buttonTestUtils.getButtonIn(getContainer(), /ok/i)
const clickConfirmButton = async (user: UserEvent) => {
  const button = getConfirmButton()
  await user.click(button)
}

export const confirmCancelReclassificationRequestModalTestUtils = {
  getContainer,
  findContainer,

  getConfirmButton,
  clickConfirmButton,
}
