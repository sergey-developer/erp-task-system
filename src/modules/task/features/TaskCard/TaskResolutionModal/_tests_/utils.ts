import { getButtonIn, loadingStartedByButton } from '_tests_/utils'
import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

const getContainer = () => screen.getByTestId('task-resolution-modal')
const getChildByText = (text: string) => within(getContainer()).getByText(text)

// close button
const getCloseButton = () => getButtonIn(getContainer(), /close/i)

const userClickCloseButton = async (user: UserEvent) => {
  const button = getCloseButton()
  await user.click(button)
  return button
}

// cancel button
const getCancelButton = () => getButtonIn(getContainer(), /отменить/i)

const userClickCancelButton = async (user: UserEvent) => {
  const button = getCancelButton()
  await user.click(button)
  return button
}

// submit button
const getSubmitButton = () => getButtonIn(getContainer(), /выполнить заявку/i)

const userClickSubmitButton = async (user: UserEvent) => {
  const button = getSubmitButton()
  await user.click(button)
  return button
}

// tech resolution
const getTechResolutionBlock = () =>
  within(getContainer()).getByTestId('tech-resolution')

const getTechResolutionTitle = () =>
  within(getTechResolutionBlock()).getByTitle('Техническое решение')

const getTechResolutionField = () =>
  within(getContainer()).getByPlaceholderText('Расскажите о работах на объекте')

const findTechResolutionError = (text: string) =>
  within(getTechResolutionBlock()).findByText(text)

const userSetTechResolution = async (user: UserEvent, value: string) => {
  const field = getTechResolutionField()
  await user.type(field, value)
  return field
}

// user resolution
const getUserResolutionBlock = () =>
  within(getContainer()).getByTestId('user-resolution')

const getUserResolutionTitle = () =>
  within(getUserResolutionBlock()).getByTitle('Решение для пользователя')

const getUserResolutionField = () =>
  within(getUserResolutionBlock()).getByPlaceholderText(
    'Расскажите заявителю о решении',
  )

const queryUserResolutionField = () =>
  within(getContainer()).queryByRole('textbox', {
    name: 'Решение для пользователя',
  })

const findUserResolutionError = (text: string) =>
  within(getUserResolutionBlock()).findByText(text)

const userSetUserResolution = async (user: UserEvent, value: string) => {
  const field = getUserResolutionField()
  await user.type(field, value)
  return field
}

// loading
const loadingStarted = () => loadingStartedByButton(getSubmitButton())

const utils = {
  getContainer,
  getChildByText,

  getCloseButton,
  userClickCloseButton,

  getCancelButton,
  userClickCancelButton,

  getSubmitButton,
  userClickSubmitButton,

  getTechResolutionBlock,
  getTechResolutionTitle,
  getTechResolutionField,
  findTechResolutionError,
  userSetTechResolution,

  getUserResolutionBlock,
  getUserResolutionTitle,
  getUserResolutionField,
  queryUserResolutionField,
  findUserResolutionError,
  userSetUserResolution,

  loadingStarted,
}

export default utils
