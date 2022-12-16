import { getButtonIn } from '_tests_/utils'
import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

const getModal = () => screen.getByTestId('modal-task-first-line')
const findModal = () => screen.findByTestId('modal-task-first-line')

const getDescriptionField = () =>
  within(getModal()).getByRole('textbox', {
    name: 'Причина возврата',
  })

const getDescriptionFieldContainer = () =>
  within(getModal()).getByTestId('field-description')

const userSetDescription = async (user: UserEvent, value: string) => {
  const field = getDescriptionField()
  await user.type(field, value)
  return field
}

const getSubmitButton = () => getButtonIn(getModal(), /вернуть заявку/i)
const userClickSubmitButton = async (user: UserEvent) => {
  const button = getSubmitButton()
  await user.click(button)
  return button
}
const getCancelButton = () => getButtonIn(getModal(), /отменить/i)

const utils = {
  getModal,
  findModal,

  getDescriptionField,
  getDescriptionFieldContainer,
  userSetDescription,

  getSubmitButton,
  userClickSubmitButton,

  getCancelButton,
}

export default utils
