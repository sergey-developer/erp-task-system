import {
  generateWord,
  getButtonIn,
  loadingStartedByButton,
} from '_tests_/utils'
import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

const getContainer = () => screen.getByRole('dialog')
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
  screen.getByRole('roww', { name: 'Техническое решение' })

const getTechResolutionField = () =>
  screen.getByRole('textbox', {
    name: 'Техническое решение',
  })

const queryTechResolutionField = () =>
  screen.queryByRole('textbox', {
    name: 'Техническое решение',
  })

const userSetTechResolution = async (user: UserEvent) => {
  const value = generateWord()
  const field = getTechResolutionField()
  await user.type(field, value)
  return { field, value }
}

// user resolution
const getUserResolutionField = () =>
  screen.getByRole('textbox', {
    name: 'Решение для пользователя',
  })

const queryUserResolutionField = () =>
  screen.queryByRole('textbox', {
    name: 'Решение для пользователя',
  })

const userSetUserResolution = async (user: UserEvent) => {
  const value = generateWord()
  const field = getUserResolutionField()
  await user.type(field, value)
  return { field, value }
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
  getTechResolutionField,
  queryTechResolutionField,
  userSetTechResolution,

  getUserResolutionField,
  queryUserResolutionField,
  userSetUserResolution,

  loadingStarted,
}

export default utils
