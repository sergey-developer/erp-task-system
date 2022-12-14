import {
  getAllSelectOption,
  getButtonIn,
  getSelect,
  getSelectOption,
  getSelectedOption,
  loadingStartedByButton,
  loadingStartedBySelect,
  querySelect,
  selectDisabled,
  userClickOption,
  userOpenSelect,
} from '_tests_/utils'
import { ByRoleOptions } from '@testing-library/dom/types/queries'
import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

const getContainer = () => screen.getByTestId('task-second-line-modal')
const findContainer = () => screen.findByTestId('task-second-line-modal')

const getChildByText = (text: string | RegExp) =>
  within(getContainer()).getByText(text)

// work group
const getWorkGroup = () => within(getContainer()).getByTestId('work-group')

const getWorkGroupSelect = (opts?: ByRoleOptions) =>
  getSelect(getWorkGroup(), opts)

const queryWorkGroupSelect = (opts?: ByRoleOptions) =>
  querySelect(getWorkGroup(), opts)

const getSelectedWorkGroup = () => getSelectedOption(getWorkGroup())

const getWorkGroupOption = getSelectOption
const getAllWorkGroupOptions = getAllSelectOption

const workGroupLoadingStarted = () => loadingStartedBySelect(getWorkGroup())

const workGroupSelectDisabled = () => selectDisabled(getWorkGroup())

const userOpenWorkGroup = async (user: UserEvent) => {
  await userOpenSelect(user, getWorkGroup())
}

const userSelectWorkGroup = userClickOption

// submit button
const getSubmitButton = () => getButtonIn(getContainer(), /перевести заявку/i)

const userClickSubmitButton = async (user: UserEvent) => {
  const button = getSubmitButton()
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

// close button
const getCloseButton = () => getButtonIn(getContainer(), /close/i)

const userClickCloseButton = async (user: UserEvent) => {
  const button = getCloseButton()
  await user.click(button)
  return button
}

// loading
const loadingStarted = () => loadingStartedByButton(getSubmitButton())

const utils = {
  getContainer,
  findContainer,
  getChildByText,

  getWorkGroupSelect,
  queryWorkGroupSelect,
  getSelectedWorkGroup,
  getWorkGroupOption,
  getAllWorkGroupOptions,
  workGroupSelectDisabled,
  workGroupLoadingStarted,
  userOpenWorkGroup,
  userSelectWorkGroup,

  getSubmitButton,
  userClickSubmitButton,

  getCancelButton,
  userClickCancelButton,

  getCloseButton,
  userClickCloseButton,

  loadingStarted,
}

export default utils
