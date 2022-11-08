import { getButtonIn } from '_tests_/utils'
import { screen, within } from '@testing-library/react'

export const getModal = () => screen.getByTestId('modal-task-first-line')

export const queryModal = () => screen.queryByTestId('modal-task-first-line')

export const findModal = async () =>
  screen.findByTestId('modal-task-first-line')

export const getDescriptionField = () =>
  within(getModal()).getByRole('textbox', {
    name: 'Причина возврата',
  })

export const getDescriptionFieldContainer = () =>
  within(getModal()).getByTestId('field-description')

export const getSubmitButton = () => getButtonIn(getModal(), /Вернуть заявку/i)

export const getCancelButton = () => getButtonIn(getModal(), /Отменить/i)
