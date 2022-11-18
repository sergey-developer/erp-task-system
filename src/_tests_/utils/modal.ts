import { screen } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { buttonTestUtils } from './index'

const getModal = () => screen.getByRole('dialog')
const findModal = () => screen.findByRole('dialog')

const userClickOutOfModal = async (user: UserEvent) => {
  const element = document.querySelector('.ant-modal-wrap')
  element && (await user.click(element))
}

const getCancelButtonFn = (container: HTMLElement) => () =>
  buttonTestUtils.getButtonIn(container, /отменить/i)

const getUserClickCancelButtonFn =
  (buttonContainer: HTMLElement) => async (user: UserEvent) => {
    const getButton = getCancelButtonFn(buttonContainer)
    const button = getButton()
    await user.click(button)
    return button
  }

const utils = {
  getModal,
  findModal,

  userClickOutOfModal,

  getCancelButtonFn,
  getUserClickCancelButtonFn,
}

export default utils
