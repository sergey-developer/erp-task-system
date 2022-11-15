import { getButtonIn } from '_tests_/utils'
import { screen, within } from '@testing-library/react'

const getModal = () => screen.getByTestId('modal-task-first-line')
const findModal = async () => screen.findByTestId('modal-task-first-line')

const getDescriptionField = () =>
  within(getModal()).getByRole('textbox', {
    name: 'Причина возврата',
  })

const getDescriptionFieldContainer = () =>
  within(getModal()).getByTestId('field-description')

const getSubmitButton = () => getButtonIn(getModal(), /вернуть заявку/i)

const getCancelButton = () => getButtonIn(getModal(), /отменить/i)

const utils = {
  getModal,
  findModal,
  getDescriptionField,
  getDescriptionFieldContainer,
  getSubmitButton,
  getCancelButton,
}

export default utils
