import { UserEvent } from '@testing-library/user-event/setup/setup'

const userClickOutOfModal = async (user: UserEvent) => {
  const element = document.querySelector('.ant-modal-wrap')
  element && (await user.click(element))
}

const utils = {
  userClickOutOfModal,
}

export default utils
