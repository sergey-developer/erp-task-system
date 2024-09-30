import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { buttonTestUtils } from '_tests_/utils/index'

const getContainer = () => screen.getByTestId('task-work-group')
const getChildByText = (text: string | RegExp) => within(getContainer()).getByText(text)

// first line button
const getFirstLineButton = () => buttonTestUtils.getButtonIn(getContainer(), /вернуть на I линию/i)

const findFirstLineButton = () =>
  buttonTestUtils.findButtonIn(getContainer(), /вернуть на I линию/i)

const queryFirstLineButton = () =>
  buttonTestUtils.queryButtonIn(getContainer(), /вернуть на I линию/i)

const clickFirstLineButton = async (user: UserEvent) => user.click(getFirstLineButton())

const expectFirstLineLoadingStarted = async () =>
  buttonTestUtils.expectLoadingStarted(getFirstLineButton())

// second line button
const getSecondLineButton = () =>
  buttonTestUtils.getButtonIn(getContainer(), /перевести на II линию/i)

const querySecondLineButton = () =>
  buttonTestUtils.queryButtonIn(getContainer(), /перевести на II линию/i)

const clickSecondLineButton = async (user: UserEvent) => user.click(getSecondLineButton())

const expectSecondLineLoadingStarted = async () => {
  await buttonTestUtils.expectLoadingStarted(getSecondLineButton())
}

export const workGroupBlockTestUtils = {
  getContainer,
  getChildByText,

  getFirstLineButton,
  findFirstLineButton,
  queryFirstLineButton,
  clickFirstLineButton,
  expectFirstLineLoadingStarted,

  getSecondLineButton,
  querySecondLineButton,
  clickSecondLineButton,
  expectSecondLineLoadingStarted,
}
