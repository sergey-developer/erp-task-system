import { screen } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

export const getModal = () => screen.getByRole('dialog')

export const userClickOutOfModal = async (user: UserEvent) => {
  const element = document.querySelector('.ant-modal-wrap')
  element && (await user.click(element))
}
