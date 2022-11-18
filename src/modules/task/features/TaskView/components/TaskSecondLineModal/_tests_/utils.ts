import {
  buttonTestUtils,
  getAllSelectOption,
  getSelect,
  getSelectOption,
  getSelectedOption,
  loadingStartedByButton,
  loadingStartedBySelect,
  modalTestUtils,
  querySelect,
  selectDisabled,
  userClickOption,
  userOpenSelect,
} from '_tests_/utils'
import { ByRoleOptions } from '@testing-library/dom/types/queries'
import { within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

const getContainer = modalTestUtils.getModal

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
const getSubmitButton = () =>
  buttonTestUtils.getButtonIn(getContainer(), /перевести заявку/i)

const userClickSubmitButton = async (user: UserEvent) => {
  const button = getSubmitButton()
  await user.click(button)
  return button
}

// cancel button
const getCancelButton = modalTestUtils.getCancelButtonFn(getContainer())

const userClickCancelButton = modalTestUtils.getUserClickCancelButtonFn(
  getContainer(),
)

// close button
const getCloseButton = buttonTestUtils.getCloseButtonFn(getContainer())

const userClickCloseButton = buttonTestUtils.getUserClickCloseButtonFn(
  getContainer(),
)

// loading
const loadingStarted = () => loadingStartedByButton(getSubmitButton())

const utils = {
  getContainer,
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
