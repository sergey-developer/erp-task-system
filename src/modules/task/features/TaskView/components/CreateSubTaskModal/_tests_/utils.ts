import {
  getButtonIn,
  getSelect,
  loadingStartedBySelect,
  querySelect,
} from '_tests_/utils'
import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

const getContainer = () => screen.getByRole('dialog')
const getChildByText = (text: string) => within(getContainer()).getByText(text)

// template field
const getTemplateFieldContainer = () =>
  within(getContainer()).getByTestId('template')

const getTemplateField = (opened?: boolean) =>
  getSelect(getTemplateFieldContainer(), { expanded: opened })

const queryTemplateField = (opened?: boolean) =>
  querySelect(getTemplateFieldContainer(), { expanded: opened })

const getTemplateFieldPlaceholder = () =>
  within(getTemplateFieldContainer()).getByText('Наименование шаблона')

const getTemplateFieldLabel = () =>
  within(getTemplateFieldContainer()).getByTitle('Шаблон')

const templateFieldExpectLoadingStarted = async () => {
  await loadingStartedBySelect(getTemplateFieldContainer())
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
  const field = getTitleField()
  await user.type(field, value)
  return field
}

const userResetDescription = async (user: UserEvent) => {
  const button = getButtonIn(getDescriptionFieldContainer(), 'close-circle')
  await user.click(button)
}

const utils = {
  getContainer,
  getChildByText,

  template: {
    getField: getTemplateField,
    queryField: queryTemplateField,
    getPlaceholder: getTemplateFieldPlaceholder,
    getLabel: getTemplateFieldLabel,
    expectLoadingStarted: templateFieldExpectLoadingStarted,
  },
  title: {
    getField: getTitleField,
    getLabel: getTitleFieldLabel,
    setValue: userSetTitle,
    resetValue: userResetTitle,
  },
  description: {
    getField: getDescriptionField,
    getLabel: getDescriptionFieldLabel,
    setValue: userSetDescription,
    resetValue: userResetDescription,
  },
}

export default utils
