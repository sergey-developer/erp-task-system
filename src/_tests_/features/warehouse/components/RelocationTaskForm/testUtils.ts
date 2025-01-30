import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { TestIdsEnum } from '_tests_/features/warehouse/components/RelocationTaskForm/constants'
import { buttonTestUtils, selectTestUtils } from '_tests_/utils'

const getContainer = () => screen.getByTestId(TestIdsEnum.RelocationTaskForm)

// deadline at field
const getDeadlineAtFormItem = () =>
  within(getContainer()).getByTestId(TestIdsEnum.DeadlineAtFormItem)
const getDeadlineAtTitle = () => within(getDeadlineAtFormItem()).getByTitle('Срок выполнения')

const getDeadlineAtDateFormItem = () =>
  within(getDeadlineAtFormItem()).getByTestId(TestIdsEnum.DeadlineAtDateFormItem)

const getDeadlineAtDateField = (): HTMLInputElement =>
  within(getDeadlineAtDateFormItem()).getByPlaceholderText('Выберите дату')

const findDeadlineAtDateError = (text: string) =>
  within(getDeadlineAtDateFormItem()).findByText(text)

const setDeadlineAtDate = async (user: UserEvent, value: string) => {
  const field = getDeadlineAtDateField()
  await user.type(field, value)
  await user.tab()
  return field
}

const clearDeadlineAtDate = async (user: UserEvent) => {
  const formItem = getDeadlineAtDateFormItem()
  await buttonTestUtils.clickCloseButtonIn(formItem, user)
}

const getDeadlineAtTimeFormItem = () =>
  within(getDeadlineAtFormItem()).getByTestId(TestIdsEnum.DeadlineAtTimeFormItem)

const getDeadlineAtTimeField = (): HTMLInputElement =>
  within(getDeadlineAtTimeFormItem()).getByPlaceholderText('Время')

const findDeadlineAtTimeError = (text: string) =>
  within(getDeadlineAtTimeFormItem()).findByText(text)

const setDeadlineAtTime = async (user: UserEvent, value: string) => {
  const field = getDeadlineAtTimeField()
  await user.type(field, value)
  await user.tab()
  return field
}

const clearDeadlineAtTime = async (user: UserEvent) => {
  const formItem = getDeadlineAtTimeFormItem()
  await buttonTestUtils.clickCloseButtonIn(formItem, user)
}

// executor field
const getExecutorFormItem = () => within(getContainer()).getByTestId(TestIdsEnum.ExecutorsFormItem)
const getExecutorSelectInput = () => selectTestUtils.getSelect(getExecutorFormItem())
const setExecutor = selectTestUtils.clickSelectOption
const findExecutorError = (text: string) => within(getExecutorFormItem()).findByText(text)

const openExecutorSelect = (user: UserEvent) =>
  selectTestUtils.openSelect(user, getExecutorFormItem())

const getSelectedExecutor = (title: string) =>
  selectTestUtils.getSelectedOptionByTitle(getExecutorFormItem(), title)

const querySelectedExecutor = (title: string) =>
  selectTestUtils.querySelectedOptionByTitle(getExecutorFormItem(), title)

const getExecutorOption = (name: string | RegExp) =>
  selectTestUtils.getSelectOption(name, screen.getByTestId(TestIdsEnum.ExecutorsSelectDropdown))

const queryExecutorOption = (name: string | RegExp) =>
  selectTestUtils.querySelectOption(name, screen.getByTestId(TestIdsEnum.ExecutorsSelectDropdown))

const expectExecutorsLoadingFinished = () =>
  selectTestUtils.expectLoadingFinished(getControllerFormItem())

// controller field
const getControllerFormItem = () =>
  within(getContainer()).getByTestId(TestIdsEnum.ControllerFormItem)
const getControllerSelectInput = () => selectTestUtils.getSelect(getControllerFormItem())
const setController = selectTestUtils.clickSelectOption
const findControllerError = (text: string) => within(getControllerFormItem()).findByText(text)

const openControllerSelect = (user: UserEvent) =>
  selectTestUtils.openSelect(user, getControllerFormItem())

const getSelectedController = (title: string) =>
  selectTestUtils.getSelectedOptionByTitle(getControllerFormItem(), title)

const querySelectedController = (title: string) =>
  selectTestUtils.querySelectedOptionByTitle(getControllerFormItem(), title)

const getControllerOption = (name: string | RegExp) =>
  selectTestUtils.getSelectOption(name, screen.getByTestId(TestIdsEnum.ControllerSelectDropdown))

const queryControllerOption = (name: string | RegExp) =>
  selectTestUtils.querySelectOption(name, screen.getByTestId(TestIdsEnum.ControllerSelectDropdown))

const expectControllersLoadingFinished = () =>
  selectTestUtils.expectLoadingFinished(getControllerFormItem())

// type field
const getTypeFormItem = () => within(getContainer()).getByTestId(TestIdsEnum.TypeFormItem)
const getTypeSelectInput = () => selectTestUtils.getSelect(getTypeFormItem())
const openTypeSelect = (user: UserEvent) => selectTestUtils.openSelect(user, getTypeFormItem())
const setType = selectTestUtils.clickSelectOption
const getSelectedType = () => selectTestUtils.getSelectedOption(getTypeFormItem())
const findTypeError = async (text: string) => within(getTypeFormItem()).findByText(text)

// relocate from field
const getRelocateFromFormItem = () =>
  within(getContainer()).getByTestId(TestIdsEnum.RelocateFromFormItem)
const getRelocateFromSelectInput = () => selectTestUtils.getSelect(getRelocateFromFormItem())
const findRelocateFromError = (text: string) => within(getRelocateFromFormItem()).findByText(text)

const setRelocateFrom = (user: UserEvent, name: string) =>
  selectTestUtils.clickSelectOption(user, name, undefined, 'relocate-from-select-dropdown')

const openRelocateFromSelect = (user: UserEvent) =>
  selectTestUtils.openSelect(user, getRelocateFromFormItem())

const getSelectedRelocateFrom = (title: string) =>
  selectTestUtils.getSelectedOptionByTitle(getRelocateFromFormItem(), title)

const querySelectedRelocateFrom = (title: string) =>
  selectTestUtils.querySelectedOptionByTitle(getRelocateFromFormItem(), title)

const expectRelocateFromLoadingStarted = () =>
  selectTestUtils.expectLoadingStarted(getRelocateFromFormItem())

const expectRelocateFromLoadingFinished = () =>
  selectTestUtils.expectLoadingFinished(getRelocateFromFormItem())

// relocate to field
const getRelocateToFormItem = () =>
  within(getContainer()).getByTestId(TestIdsEnum.RelocateToFormItem)
const getRelocateToSelectInput = () => selectTestUtils.getSelect(getRelocateToFormItem())

const setRelocateTo = (user: UserEvent, name: string) =>
  selectTestUtils.clickSelectOption(user, name, undefined, 'relocate-to-select-dropdown')

const openRelocateToSelect = (user: UserEvent) =>
  selectTestUtils.openSelect(user, getRelocateToFormItem())

const getSelectedRelocateTo = (title: string) =>
  selectTestUtils.getSelectedOptionByTitle(getRelocateToFormItem(), title)

const querySelectedRelocateTo = (title: string) =>
  selectTestUtils.querySelectedOptionByTitle(getRelocateToFormItem(), title)

const expectRelocateToLoadingFinished = () =>
  selectTestUtils.expectLoadingFinished(getRelocateToFormItem())

// comment field
const getCommentFormItem = () => within(getContainer()).getByTestId(TestIdsEnum.CommentFormItem)
const getCommentTitle = () => within(getCommentFormItem()).getByTitle('Комментарий')
const findCommentError = (text: string) => within(getCommentFormItem()).findByText(text)

const getCommentField = () =>
  within(getCommentFormItem()).getByPlaceholderText('Добавьте комментарий')

const setComment = async (user: UserEvent, value: string) => {
  const field = getCommentField()
  await user.type(field, value)
  return field
}

// attachments
const getAttachmentsBlock = () => within(getContainer()).getByTestId(TestIdsEnum.Attachments)
const queryAttachmentsBlock = () => within(getContainer()).queryByTestId(TestIdsEnum.Attachments)

export const relocationTaskFormTestUtils = {
  getContainer,

  getTypeSelectInput,
  openTypeSelect,
  setType,
  findTypeError,
  getSelectedType,

  getDeadlineAtTitle,
  getDeadlineAtDateFormItem,
  getDeadlineAtDateField,
  findDeadlineAtDateError,
  setDeadlineAtDate,
  clearDeadlineAtDate,

  getDeadlineAtTimeField,
  findDeadlineAtTimeError,
  setDeadlineAtTime,
  clearDeadlineAtTime,

  getRelocateFromSelectInput,
  openRelocateFromSelect,
  setRelocateFrom,
  getSelectedRelocateFrom,
  querySelectedRelocateFrom,
  findRelocateFromError,
  expectRelocateFromLoadingStarted,
  expectRelocateFromLoadingFinished,

  getRelocateToSelectInput,
  openRelocateToSelect,
  setRelocateTo,
  getSelectedRelocateTo,
  querySelectedRelocateTo,
  expectRelocateToLoadingFinished,

  getExecutorSelectInput,
  openExecutorSelect,
  setExecutor,
  getSelectedExecutor,
  querySelectedExecutor,
  findExecutorError,
  getExecutorOption,
  queryExecutorOption,
  expectExecutorsLoadingFinished,

  getControllerSelectInput,
  setController,
  findControllerError,
  openControllerSelect,
  getSelectedController,
  querySelectedController,
  getControllerOption,
  queryControllerOption,
  expectControllersLoadingFinished,

  getCommentTitle,
  getCommentField,
  findCommentError,
  setComment,

  getAttachmentsBlock,
  queryAttachmentsBlock,
}
