import {
  getSelect,
  getSelectedOption,
  loadingStartedBySelect,
  selectDisabled,
} from '_tests_/utils'
import { ByRoleOptions } from '@testing-library/dom/types/queries'
import { screen, within } from '@testing-library/react'

const getContainer = () => screen.getByTestId('task-second-line-modal')

const getChildByText = (text: string | RegExp) =>
  within(getContainer()).getByText(text)

// work group
const getWorkGroup = () => within(getContainer()).getByTestId('work-group')

const getWorkGroupSelectInput = (opts?: ByRoleOptions) =>
  getSelect(getWorkGroup(), opts)

const getSelectedWorkGroup = () => getSelectedOption(getWorkGroup())

const workGroupLoadingStarted = () => loadingStartedBySelect(getWorkGroup())

const workGroupDisabled = () => selectDisabled(getWorkGroup())

const utils = {
  getContainer,
  getChildByText,

  getWorkGroupSelectInput,
  getSelectedWorkGroup,

  workGroupDisabled,

  workGroupLoadingStarted,
}

export default utils
