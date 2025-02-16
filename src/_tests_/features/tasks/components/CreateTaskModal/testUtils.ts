import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { TestIdsEnum } from '_tests_/features/tasks/components/CreateTaskModal/constants'
import { selectTestUtils } from '_tests_/helpers'

const getContainer = () => screen.getByTestId(TestIdsEnum.Container)
const findContainer = () => screen.findByTestId(TestIdsEnum.Container)

// assignee
const getAssigneeFormItem = () => within(getContainer()).getByTestId(TestIdsEnum.AssigneeFormItem)

const setAssignee = selectTestUtils.clickSelectOption

const getSelectedAssignee = (value: string) => within(getAssigneeFormItem()).getByTitle(value)

const openAssigneeSelect = async (user: UserEvent) =>
  selectTestUtils.openSelect(user, getAssigneeFormItem())

// co executors
const getCoExecutorsFormItem = () =>
  within(getContainer()).getByTestId(TestIdsEnum.CoExecutorsFormItem)

const setCoExecutor = selectTestUtils.clickSelectOption

const getSelectedCoExecutor = (value: string) => within(getCoExecutorsFormItem()).getByTitle(value)

const openCoExecutorsSelect = async (user: UserEvent) =>
  selectTestUtils.openSelect(user, getCoExecutorsFormItem())

// observers
const getObserversFormItem = () => within(getContainer()).getByTestId(TestIdsEnum.ObserversFormItem)

const setObserver = selectTestUtils.clickSelectOption

const getSelectedObserver = (value: string) => within(getObserversFormItem()).getByTitle(value)

const openObserversSelect = async (user: UserEvent) =>
  selectTestUtils.openSelect(user, getObserversFormItem())

export const createTaskModalTestUtils = {
  getContainer,
  findContainer,

  setAssignee,
  getSelectedAssignee,
  openAssigneeSelect,

  setCoExecutor,
  getSelectedCoExecutor,
  openCoExecutorsSelect,

  setObserver,
  getSelectedObserver,
  openObserversSelect,
}
