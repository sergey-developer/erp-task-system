import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import { InfrastructureStatusEnum } from 'features/infrastructures/api/constants'
import { infrastructureStatusDict } from 'features/infrastructures/constants'

import { buttonTestUtils, iconTestUtils, selectTestUtils, spinnerTestUtils } from '_tests_/helpers'

const getContainer = () => screen.getByTestId('change-infrastructure-page')

// loading
const expectLoadingStarted = spinnerTestUtils.expectLoadingStarted('infrastructure-loading')
const expectLoadingFinished = spinnerTestUtils.expectLoadingFinished('infrastructure-loading')

// executor
const getExecutorBlock = () => within(getContainer()).getByTestId('executor')

// manager
const getManagerBlock = () => within(getContainer()).getByTestId('manager')

const getAssigneeOnMeButton = () =>
  buttonTestUtils.getButtonIn(getManagerBlock(), /Назначить на себя/)

const queryAssigneeOnMeButton = () =>
  buttonTestUtils.queryButtonIn(getManagerBlock(), /Назначить на себя/)

const clickAssigneeOnMeButton = async (user: UserEvent) => user.click(getAssigneeOnMeButton())

const assigneeOnMeLoadingFinished = () =>
  buttonTestUtils.expectLoadingFinished(getAssigneeOnMeButton())

// status
const getStatusBlock = () => within(getContainer()).getByTestId('status')

const clickEditStatusHistory = async (user: UserEvent) =>
  user.click(buttonTestUtils.getButtonIn(getStatusBlock(), 'edit'))

const openStatusSelect = async (user: UserEvent) =>
  selectTestUtils.openSelect(user, getStatusBlock())

const setStatus = async (user: UserEvent, status: InfrastructureStatusEnum) =>
  selectTestUtils.clickSelectOption(user, infrastructureStatusDict[status])

const clickSaveStatus = async (user: UserEvent) =>
  user.click(buttonTestUtils.getButtonIn(getStatusBlock(), 'check'))

const openStatusHistoryModal = async (user: UserEvent) =>
  user.click(iconTestUtils.getIconByNameIn(getStatusBlock(), 'search'))

// go back button
const getGoBackButton = () => buttonTestUtils.getButtonIn(getContainer(), 'Вернуться')
const clickGoBackButton = async (user: UserEvent) => user.click(getGoBackButton())

export const changeInfrastructurePageTestUtils = {
  getContainer,

  getExecutorBlock,

  getManagerBlock,
  getAssigneeOnMeButton,
  queryAssigneeOnMeButton,
  clickAssigneeOnMeButton,
  assigneeOnMeLoadingFinished,

  getStatusBlock,
  openStatusSelect,
  setStatus,
  clickSaveStatus,
  openStatusHistoryModal,
  clickEditStatusHistory,

  getGoBackButton,
  clickGoBackButton,

  expectLoadingStarted,
  expectLoadingFinished,
}
