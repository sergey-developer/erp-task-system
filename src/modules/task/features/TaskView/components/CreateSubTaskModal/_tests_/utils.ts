import {
  getButtonIn,
  getSelect,
  loadingFinishedBySelect,
  loadingStartedByButton,
  loadingStartedBySelect,
  querySelect,
  userClickOption,
  userOpenSelect,
} from '_tests_/utils'
import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { CreateSubTaskFormFields } from '../interfaces'

const getContainer = () => screen.getByTestId('create-sub-task-modal')
const findContainer = () => screen.findByTestId('create-sub-task-modal')
const getChildByText = (text: string) => within(getContainer()).getByText(text)

// template field
const getTemplateFieldContainer = () =>
  within(getContainer()).getByTestId('template')

const getTemplateField = (opened?: boolean) =>
  getSelect(getTemplateFieldContainer(), { name: 'Шаблон', expanded: opened })

const queryTemplateField = (opened?: boolean) =>
  querySelect(getTemplateFieldContainer(), { name: 'Шаблон', expanded: opened })

const getTemplateFieldPlaceholder = () =>
  within(getTemplateFieldContainer()).getByText('Наименование шаблона')

const getTemplateFieldLabel = () =>
  within(getTemplateFieldContainer()).getByTitle('Шаблон')

const userSetTemplate = userClickOption

const getTemplateOption = (name: string) =>
  within(screen.getByRole('listbox')).getByRole('option', { name })

const getSelectedTemplate = (value: string) =>
  within(getTemplateFieldContainer()).getByTitle(value)

const querySelectedTemplate = (value: string) =>
  within(getTemplateFieldContainer()).queryByTitle(value)

const userOpenTemplateField = async (user: UserEvent) => {
  await userOpenSelect(user, getTemplateFieldContainer())
}

const findTemplateFieldError = (error: string) =>
  within(getTemplateFieldContainer()).findByText(error)

const templateFieldExpectLoadingStarted = async () => {
  await loadingStartedBySelect(getTemplateFieldContainer())
}

const templateFieldExpectLoadingFinished = async () => {
  await loadingFinishedBySelect(getTemplateFieldContainer())
}

// title field
const getTitleFieldContainer = () => within(getContainer()).getByTestId('title')

const getTitleField = () =>
  within(getTitleFieldContainer()).getByPlaceholderText(
    'Опишите коротко задачу',
  )

const getTitleFieldLabel = () =>
  within(getTitleFieldContainer()).getByTitle('Краткое описание')

const userSetTitle = async (user: UserEvent, value: string) => {
  const field = getTitleField()
  await user.type(field, value)
  return field
}

const userResetTitle = async (user: UserEvent) => {
  const button = getButtonIn(getTitleFieldContainer(), 'close-circle')
  await user.click(button)
}

const findTitleFieldError = (error: string) =>
  within(getTitleFieldContainer()).findByText(error)

// description field
const getDescriptionFieldContainer = () =>
  within(getContainer()).getByTestId('description')

const getDescriptionField = () =>
  within(getDescriptionFieldContainer()).getByPlaceholderText(
    'Расскажите подробнее о задаче',
  )

const getDescriptionFieldLabel = () =>
  within(getDescriptionFieldContainer()).getByTitle('Подробное описание')

const userSetDescription = async (user: UserEvent, value: string) => {
  const field = getDescriptionField()
  await user.type(field, value)
  return field
}

const userResetDescription = async (user: UserEvent) => {
  const button = getButtonIn(getDescriptionFieldContainer(), 'close-circle')
  await user.click(button)
}

const findDescriptionFieldError = (error: string) =>
  within(getDescriptionFieldContainer()).findByText(error)

// submit button
const getSubmitButton = () => getButtonIn(getContainer(), /создать задание/i)

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

// rest
const userFillForm = async (
  user: UserEvent,
  values: CreateSubTaskFormFields,
) => {
  await userOpenTemplateField(user)
  await userSetTemplate(user, values.template)
  await userSetTitle(user, values.title)
  await userSetDescription(user, values.description)
}

const utils = {
  getContainer,
  findContainer,
  getChildByText,

  template: {
    getContainer: getTemplateFieldContainer,
    getField: getTemplateField,
    queryField: queryTemplateField,
    getPlaceholder: getTemplateFieldPlaceholder,
    getLabel: getTemplateFieldLabel,
    getValue: getSelectedTemplate,
    queryValue: querySelectedTemplate,
    setValue: userSetTemplate,
    openField: userOpenTemplateField,
    getOption: getTemplateOption,
    findError: findTemplateFieldError,
    expectLoadingStarted: templateFieldExpectLoadingStarted,
    expectLoadingFinished: templateFieldExpectLoadingFinished,
  },
  title: {
    getField: getTitleField,
    getLabel: getTitleFieldLabel,
    setValue: userSetTitle,
    resetValue: userResetTitle,
    findError: findTitleFieldError,
  },
  description: {
    getField: getDescriptionField,
    getLabel: getDescriptionFieldLabel,
    setValue: userSetDescription,
    resetValue: userResetDescription,
    findError: findDescriptionFieldError,
  },
  userFillForm,

  getSubmitButton,
  userClickSubmitButton,

  getCancelButton,
  userClickCancelButton,

  loadingStarted: () => loadingStartedByButton(getSubmitButton()),
}

export default utils
