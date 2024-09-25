import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { CreateSubTaskFormFields } from 'modules/task/components/CreateSubTaskModal/types'

import { buttonTestUtils, selectTestUtils } from '_tests_/utils/index'

import { TestIdsEnum } from '_tests_/features/tasks/components/CreateSubTaskModal/constants'

const getContainer = () => screen.getByTestId(TestIdsEnum.CreateSubTaskModal)
const findContainer = () => screen.findByTestId(TestIdsEnum.CreateSubTaskModal)
const getChildByText = (text: string | RegExp) => within(getContainer()).getByText(text)

// support group field
const getSupportGroupFormItem = () =>
  within(getContainer()).getByTestId(TestIdsEnum.SupportGroupFormItem)
const getSupportGroupSelect = () => selectTestUtils.getSelect(getSupportGroupFormItem())
const querySupportGroupSelect = () => selectTestUtils.querySelect(getSupportGroupFormItem())

const getSupportGroupSelectPlaceholder = () =>
  within(getSupportGroupFormItem()).getByText('Доступные группы')

const getSupportGroupLabel = () => within(getSupportGroupFormItem()).getByTitle('Группа поддержки')

const setSupportGroup = selectTestUtils.clickSelectOption

const getSupportGroupOption = selectTestUtils.getSelectOption

const getSelectedSupportGroup = (value: string) =>
  within(getSupportGroupFormItem()).getByTitle(value)

const querySelectedSupportGroup = (value: string) =>
  within(getSupportGroupFormItem()).queryByTitle(value)

const openSupportGroupSelect = async (user: UserEvent) => {
  await selectTestUtils.openSelect(user, getSupportGroupFormItem())
}

const findSupportGroupError = (error: string) => within(getSupportGroupFormItem()).findByText(error)

const supportGroupExpectLoadingStarted = () =>
  selectTestUtils.expectLoadingStarted(getSupportGroupFormItem())

const supportGroupExpectLoadingFinished = () =>
  selectTestUtils.expectLoadingFinished(getSupportGroupFormItem())

// service field
const getServiceFieldFormItem = () =>
  within(getContainer()).getByTestId(TestIdsEnum.ServiceFormItem)
const getServiceField = () => selectTestUtils.getSelect(getServiceFieldFormItem())
const queryServiceField = () => selectTestUtils.querySelect(getServiceFieldFormItem())

const getServiceFieldPlaceholder = () =>
  within(getServiceFieldFormItem()).getByText('Наименование сервиса')

const getServiceFieldLabel = () => within(getServiceFieldFormItem()).getByTitle('Сервис')

const setService = selectTestUtils.clickSelectOption

const getServiceOption = selectTestUtils.getSelectOption

const getSelectedService = (value: string) => within(getServiceFieldFormItem()).getByTitle(value)

const querySelectedService = (value: string) =>
  within(getServiceFieldFormItem()).queryByTitle(value)

const openServiceSelect = async (user: UserEvent) => {
  await selectTestUtils.openSelect(user, getServiceFieldFormItem())
}

const findServiceFieldError = (error: string) => within(getServiceFieldFormItem()).findByText(error)

const serviceExpectLoadingStarted = () =>
  selectTestUtils.expectLoadingStarted(getServiceFieldFormItem())

const serviceExpectLoadingFinished = () =>
  selectTestUtils.expectLoadingFinished(getServiceFieldFormItem())

// title field
const getTitleFieldContainer = () => within(getContainer()).getByTestId(TestIdsEnum.TitleFormItem)

const getTitleField = () =>
  within(getTitleFieldContainer()).getByPlaceholderText('Опишите коротко задачу')

const getTitleFieldLabel = () => within(getTitleFieldContainer()).getByTitle('Краткое описание')

const setTitle = async (user: UserEvent, value: string) => {
  const field = getTitleField()
  await user.type(field, value)
  return field
}

const findTitleFieldError = (error: string) => within(getTitleFieldContainer()).findByText(error)

// description field
const getDescriptionFieldContainer = () =>
  within(getContainer()).getByTestId(TestIdsEnum.DescriptionFormItem)

const getDescriptionField = () =>
  within(getDescriptionFieldContainer()).getByPlaceholderText('Расскажите подробнее о задаче')

const getDescriptionFieldLabel = () =>
  within(getDescriptionFieldContainer()).getByTitle('Подробное описание')

const setDescription = async (user: UserEvent, value: string) => {
  const field = getDescriptionField()
  await user.type(field, value)
  return field
}

const findDescriptionFieldError = (error: string) =>
  within(getDescriptionFieldContainer()).findByText(error)

// submit button
const getSubmitButton = () => buttonTestUtils.getButtonIn(getContainer(), /создать задание/i)

const clickSubmitButton = async (user: UserEvent) => {
  const button = getSubmitButton()
  await user.click(button)
  return button
}

// cancel button
const getCancelButton = () => buttonTestUtils.getButtonIn(getContainer(), /отменить/i)

const clickCancelButton = async (user: UserEvent) => {
  const button = getCancelButton()
  await user.click(button)
  return button
}

// other
const setFormValues = async (
  user: UserEvent,
  values: Omit<CreateSubTaskFormFields, 'templateX5'> & {
    templateX5: string
    supportGroup: string
  },
) => {
  await openSupportGroupSelect(user)
  await setSupportGroup(user, values.supportGroup)

  await serviceExpectLoadingStarted()
  await serviceExpectLoadingFinished()
  await openServiceSelect(user)
  await setService(user, values.templateX5)

  await setTitle(user, values.title)
  await setDescription(user, values.description)
}

const expectLoadingStarted = () => buttonTestUtils.expectLoadingStarted(getSubmitButton())
const expectLoadingFinished = () => buttonTestUtils.expectLoadingFinished(getSubmitButton())

export const createSubTaskModalTestUtils = {
  getContainer,
  findContainer,
  getChildByText,

  supportGroup: {
    getContainer: getSupportGroupFormItem,
    getField: getSupportGroupSelect,
    queryField: querySupportGroupSelect,
    getPlaceholder: getSupportGroupSelectPlaceholder,
    getLabel: getSupportGroupLabel,
    getValue: getSelectedSupportGroup,
    queryValue: querySelectedSupportGroup,
    setValue: setSupportGroup,
    openField: openSupportGroupSelect,
    getOption: getSupportGroupOption,
    findError: findSupportGroupError,
    expectLoadingStarted: supportGroupExpectLoadingStarted,
    expectLoadingFinished: supportGroupExpectLoadingFinished,
  },
  service: {
    getContainer: getServiceFieldFormItem,
    getField: getServiceField,
    queryField: queryServiceField,
    getPlaceholder: getServiceFieldPlaceholder,
    getLabel: getServiceFieldLabel,
    getValue: getSelectedService,
    queryValue: querySelectedService,
    setValue: setService,
    openField: openServiceSelect,
    getOption: getServiceOption,
    findError: findServiceFieldError,
    expectLoadingStarted: serviceExpectLoadingStarted,
    expectLoadingFinished: serviceExpectLoadingFinished,
  },
  title: {
    getField: getTitleField,
    getLabel: getTitleFieldLabel,
    setValue: setTitle,
    findError: findTitleFieldError,
  },
  description: {
    getField: getDescriptionField,
    getLabel: getDescriptionFieldLabel,
    setValue: setDescription,
    findError: findDescriptionFieldError,
  },
  setFormValues,

  getSubmitButton,
  clickSubmitButton,

  getCancelButton,
  clickCancelButton,

  expectLoadingStarted,
  expectLoadingFinished,
}
