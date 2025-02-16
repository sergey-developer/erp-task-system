import { screen } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { buttonTestUtils } from '_tests_/helpers'

import { TestIdsEnum } from './constants'

const getContainer = () => screen.getByTestId(TestIdsEnum.ConfirmDeleteInfrastructureWorkTypeModal)
const findContainer = () =>
  screen.findByTestId(TestIdsEnum.ConfirmDeleteInfrastructureWorkTypeModal)

const getConfirmButton = () => buttonTestUtils.getButtonIn(getContainer(), 'Удалить')
const clickConfirmButton = async (user: UserEvent) => {
  const button = getConfirmButton()
  await user.click(button)
}

export const confirmDeleteInfrastructureWorkTypeModalTestUtils = {
  getContainer,
  findContainer,

  clickConfirmButton,
}
