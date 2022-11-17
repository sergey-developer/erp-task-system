import { UserEvent } from '@testing-library/user-event/setup/setup'

export const userClickOutOfModal = async (user: UserEvent) => {
  const element = document.querySelector('.ant-modal-wrap')
  element && (await user.click(element))
}
