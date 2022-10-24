import { getButtonIn, screen, within } from '_tests_/utils'

export const getModal = () => screen.getByTestId('modal-task-first-line')

export const getDescription = () =>
  within(getModal()).getByRole('textbox', {
    name: 'Причина возврата',
  })

export const getSubmitButton = () => getButtonIn(getModal(), /Вернуть заявку/i)
export const getCancelButton = () => getButtonIn(getModal(), /Отменить/i)
