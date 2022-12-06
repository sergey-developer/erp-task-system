import {
  findButtonIn,
  getButtonIn,
  loadingStartedByButton,
  queryButtonIn,
} from '_tests_/utils'
import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

const getContainer = () => screen.getByTestId('task-work-group')
const getChildByText = (text: string) => within(getContainer()).getByText(text)

// first line button
const getFirstLineButton = () =>
  getButtonIn(getContainer(), /вернуть на I линию/i)

const findFirstLineButton = () =>
  findButtonIn(getContainer(), /вернуть на I линию/i)

const queryFirstLineButton = () =>
  queryButtonIn(getContainer(), /вернуть на I линию/i)

const userClickFirstLineButton = async (user: UserEvent) => {
  const button = getFirstLineButton()
  await user.click(button)
  return button
}

const firstLineLoadingStarted = async () => {
  await loadingStartedByButton(getFirstLineButton())
}

// second line button
const getSecondLineButton = () =>
  getButtonIn(getContainer(), /перевести на II линию/i)

const querySecondLineButton = () =>
  queryButtonIn(getContainer(), /перевести на II линию/i)

const userClickSecondLineButton = async (user: UserEvent) => {
  const button = getSecondLineButton()
  await user.click(button)
  return button
}

const secondLineLoadingStarted = async () => {
  await loadingStartedByButton(getSecondLineButton())
}

const utils = {
  getContainer,
  getChildByText,

  getFirstLineButton,
  findFirstLineButton,
  queryFirstLineButton,
  userClickFirstLineButton,
  firstLineLoadingStarted,

  getSecondLineButton,
  querySecondLineButton,
  userClickSecondLineButton,
  secondLineLoadingStarted,
}

export default utils
