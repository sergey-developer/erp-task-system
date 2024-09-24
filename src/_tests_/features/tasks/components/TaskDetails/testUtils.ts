import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { buttonTestUtils, spinnerTestUtils } from '_tests_/utils/index'

import { TestIdsEnum } from './constants'

const findContainer = () => screen.findByTestId(TestIdsEnum.TaskDetails)
const getContainer = () => screen.getByTestId('task-details')

// change infrastructure
const getChangeInfrastructureButton = () =>
  buttonTestUtils.getButtonIn(getContainer(), 'Изменение инфраструктуры')

const queryChangeInfrastructureButton = () =>
  buttonTestUtils.queryButtonIn(getContainer(), 'Изменение инфраструктуры')

const clickChangeInfrastructureButton = async (user: UserEvent) =>
  user.click(getChangeInfrastructureButton())

// support manager block
const getSupportManagerBlock = () =>
  within(getContainer()).getByTestId(TestIdsEnum.SupportManagerBlock)

const getAssigneeOnMeButton = () =>
  buttonTestUtils.getButtonIn(getSupportManagerBlock(), /Назначить на себя/)

const queryAssigneeOnMeButton = () =>
  buttonTestUtils.queryButtonIn(getSupportManagerBlock(), /Назначить на себя/)

const clickAssigneeOnMeButton = async (user: UserEvent) => user.click(getAssigneeOnMeButton())

const assigneeOnMeLoadingFinished = () =>
  buttonTestUtils.expectLoadingFinished(getAssigneeOnMeButton())

// task loading
const expectTaskLoadingStarted = spinnerTestUtils.expectLoadingStarted('task-loading')
const expectTaskLoadingFinished = spinnerTestUtils.expectLoadingFinished('task-loading')

// task reclassification request loading
const expectReclassificationRequestLoadingStarted = spinnerTestUtils.expectLoadingStarted(
  'task-reclassification-request-loading',
)
const expectReclassificationRequestLoadingFinished = spinnerTestUtils.expectLoadingFinished(
  'task-reclassification-request-loading',
)

export const taskDetailsTestUtils = {
  getContainer,
  findContainer,

  getChangeInfrastructureButton,
  queryChangeInfrastructureButton,
  clickChangeInfrastructureButton,

  getSupportManagerBlock,
  getAssigneeOnMeButton,
  queryAssigneeOnMeButton,
  clickAssigneeOnMeButton,
  assigneeOnMeLoadingFinished,

  expectTaskLoadingStarted,
  expectTaskLoadingFinished,
  expectReclassificationRequestLoadingStarted,
  expectReclassificationRequestLoadingFinished,
}
