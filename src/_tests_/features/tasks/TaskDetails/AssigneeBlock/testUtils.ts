import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { buttonTestUtils, selectTestUtils } from '_tests_/utils/index'

import { TestIdsEnum } from './constants'

const getContainer = () => screen.getByTestId(TestIdsEnum.TaskAssigneeBlock)
const getChildByText = (text: string | RegExp) => within(getContainer()).getByText(text)

// take task
const getTakeTaskButton = () => buttonTestUtils.getButtonIn(getContainer(), /в работу/i)

const clickTakeTaskButton = async (user: UserEvent) => {
  const button = getTakeTaskButton()
  await user.click(button)
}

const takeTaskExpectLoadingStarted = () => buttonTestUtils.expectLoadingStarted(getTakeTaskButton())

// assign on me button
const getAssignOnMeButton = () => buttonTestUtils.getButtonIn(getContainer(), /назначить на себя$/i)

const clickAssignOnMeButton = async (user: UserEvent) => {
  const button = getAssignOnMeButton()
  await user.click(button)
}

const assignOnMeExpectLoadingStarted = () =>
  buttonTestUtils.expectLoadingStarted(getAssignOnMeButton())

const assignOnMeExpectLoadingFinished = () =>
  buttonTestUtils.expectLoadingFinished(getAssignOnMeButton())

// assign button
const getAssignButton = () => buttonTestUtils.getButtonIn(getContainer(), /назначить$/i)

const queryAssignButton = () => buttonTestUtils.queryButtonIn(getContainer(), /назначить$/i)

const clickAssignButton = async (user: UserEvent) => {
  const button = getAssignButton()
  await user.click(button)
  return button
}

const assignExpectLoadingStarted = () => buttonTestUtils.expectLoadingStarted(getAssignButton())

// refuse task
const getRefuseTaskButton = () =>
  buttonTestUtils.getButtonIn(getContainer(), /отказаться от заявки/i)

const userClickRefuseTaskButton = async (user: UserEvent) => {
  const button = getRefuseTaskButton()
  await user.click(button)
  return button
}

const refuseTaskExpectLoadingStarted = () =>
  buttonTestUtils.expectLoadingStarted(getRefuseTaskButton())

// assignee select
const getAssigneeSelect = () => selectTestUtils.getSelect(getContainer())
const queryAssigneeSelect = () => selectTestUtils.querySelect(getContainer())
const findAssigneeSelect = () => selectTestUtils.findSelect(getContainer())
const getSelectedAssignee = () => selectTestUtils.getSelectedOption(getContainer())
const openAssigneeSelect = (user: UserEvent) => selectTestUtils.openSelect(user, getContainer())
const selectAssignee = selectTestUtils.clickSelectOption
const getAssigneeOption = selectTestUtils.getSelectOptionById
const getAllAssigneeOption = selectTestUtils.getAllSelectOption

const expectAssigneeSelectLoadingStarted = () =>
  selectTestUtils.expectLoadingStarted(getContainer())

const expectAssigneeSelectDisabled = () => selectTestUtils.selectDisabledIn(getContainer())
const expectAssigneeSelectNotDisabled = () => selectTestUtils.selectNotDisabledIn(getContainer())

export const assigneeBlockTestUtils = {
  getContainer,
  getChildByText,

  getTakeTaskButton,
  clickTakeTaskButton,
  takeTaskExpectLoadingStarted,

  getAssignButton,
  queryAssignButton,
  clickAssignButton,
  assignExpectLoadingStarted,

  getAssignOnMeButton,
  clickAssignOnMeButton,
  assignOnMeExpectLoadingStarted,
  assignOnMeExpectLoadingFinished,

  getRefuseTaskButton,
  userClickRefuseTaskButton,
  refuseTaskExpectLoadingStarted,

  getAssigneeSelect,
  queryAssigneeSelect,
  findAssigneeSelect,
  getSelectedAssignee,
  openAssigneeSelect,
  selectAssignee,
  getAssigneeOption,
  getAllAssigneeOption,
  expectAssigneeSelectLoadingStarted,
  expectAssigneeSelectDisabled,
  expectAssigneeSelectNotDisabled,
}
