import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import {
  validationMessages,
  validationSizes,
} from 'shared/constants/validation'

import subTaskFixtures from 'fixtures/subTask'
import taskFixtures from 'fixtures/task'

import {
  clickSelectOption,
  fakeIdStr,
  fakeWord,
  getButtonIn,
  getSelect,
  expectLoadingFinishedByButton,
  expectLoadingFinishedBySelect,
  expectLoadingStartedByButton,
  expectLoadingStartedBySelect,
  querySelect,
  render,
  openSelect,
} from '_tests_/utils'

import CreateSubTaskModal from './index'
import { CreateSubTaskFormFields, CreateSubTaskModalProps } from './interfaces'

const requiredProps: CreateSubTaskModalProps = {
  task: taskFixtures.getTask(),
  onCancel: jest.fn(),
}

const getContainer = () => screen.getByTestId('create-sub-task-modal')

const findContainer = () => screen.findByTestId('create-sub-task-modal')

const getChildByText = (text: string | RegExp) =>
  within(getContainer()).getByText(text)

// service field
const getServiceFieldContainer = () =>
  within(getContainer()).getByTestId('service')

const getServiceField = (opened?: boolean) =>
  getSelect(getServiceFieldContainer(), { name: 'Сервис', expanded: opened })

const queryServiceField = (opened?: boolean) =>
  querySelect(getServiceFieldContainer(), { name: 'Сервис', expanded: opened })

const getServiceFieldPlaceholder = () =>
  within(getServiceFieldContainer()).getByText('Наименование сервиса')

const getServiceFieldLabel = () =>
  within(getServiceFieldContainer()).getByTitle('Сервис')

const setService = clickSelectOption

const getServiceOption = (name: string) =>
  within(screen.getByRole('listbox')).getByRole('option', { name })

const getSelectedService = (value: string) =>
  within(getServiceFieldContainer()).getByTitle(value)

const querySelectedService = (value: string) =>
  within(getServiceFieldContainer()).queryByTitle(value)

const openServiceField = async (user: UserEvent) => {
  await openSelect(user, getServiceFieldContainer())
}

const findServiceFieldError = (error: string) =>
  within(getServiceFieldContainer()).findByText(error)

const serviceFieldExpectLoadingStarted = () =>
  expectLoadingStartedBySelect(getServiceFieldContainer())

const serviceFieldExpectLoadingFinished = () =>
  expectLoadingFinishedBySelect(getServiceFieldContainer())

// title field
const getTitleFieldContainer = () => within(getContainer()).getByTestId('title')

const getTitleField = () =>
  within(getTitleFieldContainer()).getByPlaceholderText(
    'Опишите коротко задачу',
  )

const getTitleFieldLabel = () =>
  within(getTitleFieldContainer()).getByTitle('Краткое описание')

const setTitle = async (user: UserEvent, value: string) => {
  const field = getTitleField()
  await user.type(field, value)
  return field
}

const resetTitle = async (user: UserEvent) => {
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

const setDescription = async (user: UserEvent, value: string) => {
  const field = getDescriptionField()
  await user.type(field, value)
  return field
}

const resetDescription = async (user: UserEvent) => {
  const button = getButtonIn(getDescriptionFieldContainer(), 'close-circle')
  await user.click(button)
}

const findDescriptionFieldError = (error: string) =>
  within(getDescriptionFieldContainer()).findByText(error)

// submit button
const getSubmitButton = () => getButtonIn(getContainer(), /создать задание/i)

const clickSubmitButton = async (user: UserEvent) => {
  const button = getSubmitButton()
  await user.click(button)
  return button
}

// cancel button
const getCancelButton = () => getButtonIn(getContainer(), /отменить/i)

const clickCancelButton = async (user: UserEvent) => {
  const button = getCancelButton()
  await user.click(button)
  return button
}

// other
const fillForm = async (
  user: UserEvent,
  values: Omit<CreateSubTaskFormFields, 'templateX5'> & { templateX5: string },
) => {
  await openServiceField(user)
  await setService(user, values.templateX5)
  await setTitle(user, values.title)
  await setDescription(user, values.description)
}

const expectLoadingStarted = () =>
  expectLoadingStartedByButton(getSubmitButton())
const expectLoadingFinished = () =>
  expectLoadingFinishedByButton(getSubmitButton())

export const testUtils = {
  getContainer,
  findContainer,
  getChildByText,

  service: {
    getContainer: getServiceFieldContainer,
    getField: getServiceField,
    queryField: queryServiceField,
    getPlaceholder: getServiceFieldPlaceholder,
    getLabel: getServiceFieldLabel,
    getValue: getSelectedService,
    queryValue: querySelectedService,
    setValue: setService,
    openField: openServiceField,
    getOption: getServiceOption,
    findError: findServiceFieldError,
    expectLoadingStarted: serviceFieldExpectLoadingStarted,
    expectLoadingFinished: serviceFieldExpectLoadingFinished,
  },
  title: {
    getField: getTitleField,
    getLabel: getTitleFieldLabel,
    setValue: setTitle,
    resetValue: resetTitle,
    findError: findTitleFieldError,
  },
  description: {
    getField: getDescriptionField,
    getLabel: getDescriptionFieldLabel,
    setValue: setDescription,
    resetValue: resetDescription,
    findError: findDescriptionFieldError,
  },
  fillForm,

  getSubmitButton,
  clickSubmitButton,

  getCancelButton,
  clickCancelButton,

  expectLoadingStarted,
  expectLoadingFinished,
}

test.todo('Поправить тесты')
// describe('Модалка создания задачи заявки', () => {
//   test('Заголовок отображается', () => {
//     render(<CreateSubTaskModal {...requiredProps} />)
//
//     expect(testUtils.getChildByText(/задание по заявке/i)).toBeInTheDocument()
//     expect(
//       testUtils.getChildByText(requiredProps.task.recordId),
//     ).toBeInTheDocument()
//   })
//
//   describe('Форма создания', () => {
//     describe('Поле сервиса', () => {
//       test('Отображается корректно', () => {
//         render(<CreateSubTaskModal {...requiredProps} />)
//
//         const field = testUtils.service.getField()
//
//         expect(field).toBeInTheDocument()
//         expect(field).toBeEnabled()
//         expect(testUtils.service.getPlaceholder()).toBeInTheDocument()
//         expect(testUtils.service.getLabel()).toBeInTheDocument()
//       })
//
//       test('Закрыто по умолчанию', () => {
//         render(<CreateSubTaskModal {...requiredProps} />)
//         expect(testUtils.service.queryField(true)).not.toBeInTheDocument()
//       })
//
//       test('Не активно во время создания задачи', () => {
//         render(<CreateSubTaskModal {...requiredProps} />)
//         expect(testUtils.service.getField()).toBeDisabled()
//       })
//
//       test('Отображает состояние загрузки во время загрузки шаблонов', () => {
//         render(
//           <CreateSubTaskModal {...requiredProps} />,
//         )
//
//         testUtils.service.expectLoadingStarted()
//       })
//
//       test('Имеет верное количество вариантов', async () => {
//         const { user } = render(<CreateSubTaskModal {...requiredProps} />)
//
//         await testUtils.service.openField(user)
//
//         requiredProps.serviceOptions.forEach((opt) => {
//           const value = testUtils.service.getOption(opt.title)
//           expect(value).toBeInTheDocument()
//         })
//       })
//
//       test('Не имеет значения по умолчанию', () => {
//         render(<CreateSubTaskModal {...requiredProps} />)
//
//         requiredProps.serviceOptions.forEach((opt) => {
//           const value = testUtils.service.queryValue(opt.title)
//           expect(value).not.toBeInTheDocument()
//         })
//       })
//
//       test('Можно выбрать значение', async () => {
//         const { user } = render(<CreateSubTaskModal {...requiredProps} />)
//
//         const templateOption = requiredProps.serviceOptions[0]
//         await testUtils.service.openField(user)
//         await testUtils.service.setValue(user, templateOption.title)
//         const value = await testUtils.service.getValue(templateOption.title)
//
//         expect(value).toBeInTheDocument()
//       })
//
//       test('Закрывается после выбора значения', async () => {
//         const { user } = render(<CreateSubTaskModal {...requiredProps} />)
//
//         const templateOption = requiredProps.serviceOptions[0]
//         await testUtils.service.openField(user)
//         await testUtils.service.setValue(user, templateOption.title)
//
//         expect(testUtils.service.getField(false)).toBeInTheDocument()
//       })
//
//       describe('Соответствующая ошибка отображается под полем', () => {
//         test('Если не выбрать значение и нажать кнопку отправки', async () => {
//           const { user } = render(<CreateSubTaskModal {...requiredProps} />)
//
//           await testUtils.clickSubmitButton(user)
//
//           expect(
//             await testUtils.service.findError(validationMessages.required),
//           ).toBeInTheDocument()
//         })
//       })
//     })
//
//     describe('Поле заголовка', () => {
//       test('Отображается корректно', () => {
//         render(<CreateSubTaskModal {...requiredProps} />)
//
//         const field = testUtils.title.getField()
//
//         expect(field).toBeInTheDocument()
//         expect(field).toBeEnabled()
//         expect(field).not.toHaveValue()
//         expect(testUtils.title.getLabel()).toBeInTheDocument()
//       })
//
//       test('Не активно во время загрузки', () => {
//         render(<CreateSubTaskModal {...requiredProps} isLoading />)
//         expect(testUtils.title.getField()).toBeDisabled()
//       })
//
//       test('Можно ввести значение', async () => {
//         const { user } = render(<CreateSubTaskModal {...requiredProps} />)
//
//         const value = fakeWord()
//         const field = await testUtils.title.setValue(user, value)
//
//         expect(field).toHaveDisplayValue(value)
//       })
//
//       test('Можно очистить значение', async () => {
//         const { user } = render(<CreateSubTaskModal {...requiredProps} />)
//
//         const value = fakeWord()
//         await testUtils.title.setValue(user, value)
//         await testUtils.title.resetValue(user)
//
//         expect(testUtils.title.getField()).not.toHaveDisplayValue(value)
//       })
//
//       test('Можно установить значение по умолчанию', () => {
//         const initialValue = fakeWord()
//
//         render(
//           <CreateSubTaskModal
//             {...requiredProps}
//             initialFormValues={{
//               title: initialValue,
//             }}
//           />,
//         )
//
//         expect(testUtils.title.getField()).toHaveDisplayValue(initialValue)
//       })
//
//       describe('Соответствующая ошибка отображается под полем', () => {
//         test('Если не ввести значение и нажать кнопку отправки', async () => {
//           const { user } = render(<CreateSubTaskModal {...requiredProps} />)
//
//           await testUtils.clickSubmitButton(user)
//
//           expect(
//             await testUtils.title.findError(validationMessages.required),
//           ).toBeInTheDocument()
//         })
//
//         test('Если ввести только пробелы', async () => {
//           const { user } = render(<CreateSubTaskModal {...requiredProps} />)
//
//           await testUtils.title.setValue(user, ' ')
//
//           expect(
//             await testUtils.title.findError(validationMessages.canNotBeEmpty),
//           ).toBeInTheDocument()
//         })
//
//         test('Если превысить лимит символов', async () => {
//           const { user } = render(<CreateSubTaskModal {...requiredProps} />)
//
//           await testUtils.title.setValue(
//             user,
//             fakeWord({ length: validationSizes.string.short + 1 }),
//           )
//
//           expect(
//             await testUtils.title.findError(
//               validationMessages.string.max.short,
//             ),
//           ).toBeInTheDocument()
//         })
//       })
//     })
//
//     describe('Поле описания', () => {
//       test('Отображается корректно', () => {
//         render(<CreateSubTaskModal {...requiredProps} />)
//
//         const field = testUtils.description.getField()
//
//         expect(field).toBeInTheDocument()
//         expect(field).toBeEnabled()
//         expect(field).not.toHaveValue()
//         expect(testUtils.description.getLabel()).toBeInTheDocument()
//       })
//
//       test('Не активно во время загрузки', () => {
//         render(<CreateSubTaskModal {...requiredProps} isLoading />)
//         expect(testUtils.description.getField()).toBeDisabled()
//       })
//
//       test('Можно ввести значение', async () => {
//         const { user } = render(<CreateSubTaskModal {...requiredProps} />)
//
//         const value = fakeWord()
//         const field = await testUtils.description.setValue(user, value)
//
//         expect(field).toHaveDisplayValue(value)
//       })
//
//       test('Можно очистить значение', async () => {
//         const { user } = render(<CreateSubTaskModal {...requiredProps} />)
//
//         const value = fakeWord()
//         await testUtils.description.setValue(user, value)
//         await testUtils.description.resetValue(user)
//
//         expect(testUtils.description.getField()).not.toHaveDisplayValue(value)
//       })
//
//       test('Можно установить значение по умолчанию', () => {
//         const initialValue = fakeWord()
//
//         render(
//           <CreateSubTaskModal
//             {...requiredProps}
//             initialFormValues={{
//               description: initialValue,
//             }}
//           />,
//         )
//
//         expect(testUtils.description.getField()).toHaveDisplayValue(
//           initialValue,
//         )
//       })
//
//       describe('Соответствующая ошибка отображается под полем', () => {
//         test('Если не ввести значение и нажать кнопку отправки', async () => {
//           const { user } = render(<CreateSubTaskModal {...requiredProps} />)
//
//           await testUtils.clickSubmitButton(user)
//
//           expect(
//             await testUtils.description.findError(validationMessages.required),
//           ).toBeInTheDocument()
//         })
//
//         test('Если ввести только пробелы', async () => {
//           const { user } = render(<CreateSubTaskModal {...requiredProps} />)
//
//           await testUtils.description.setValue(user, ' ')
//
//           expect(
//             await testUtils.description.findError(
//               validationMessages.canNotBeEmpty,
//             ),
//           ).toBeInTheDocument()
//         })
//
//         test('Если превысить лимит символов', async () => {
//           const { user } = render(<CreateSubTaskModal {...requiredProps} />)
//
//           await testUtils.description.setValue(
//             user,
//             fakeWord({ length: validationSizes.string.long + 1 }),
//           )
//
//           expect(
//             await testUtils.description.findError(
//               validationMessages.string.max.long,
//             ),
//           ).toBeInTheDocument()
//         })
//       })
//     })
//   })
//
//   describe('Кнопка отправки', () => {
//     test('Отображается корректно', () => {
//       render(<CreateSubTaskModal {...requiredProps} />)
//
//       const button = testUtils.getSubmitButton()
//
//       expect(button).toBeInTheDocument()
//       expect(button).toBeEnabled()
//     })
//
//     test('Отображает состояние загрузки', async () => {
//       render(<CreateSubTaskModal {...requiredProps} isLoading />)
//       await testUtils.expectLoadingStarted()
//     })
//
//     test('Обработчик вызывается корректно', async () => {
//       const { user } = render(<CreateSubTaskModal {...requiredProps} />)
//
//       await testUtils.fillForm(user, {
//         templateX5: requiredProps.serviceOptions[0].title,
//         title: fakeWord(),
//         description: fakeWord(),
//       })
//       await testUtils.clickSubmitButton(user)
//
//       expect(requiredProps.onSubmit).toBeCalledTimes(1)
//     })
//   })
//
//   describe('Кнопка отмены', () => {
//     test('Отображается корректно', () => {
//       render(<CreateSubTaskModal {...requiredProps} />)
//
//       const button = testUtils.getCancelButton()
//
//       expect(button).toBeInTheDocument()
//       expect(button).toBeEnabled()
//     })
//
//     test('Обработчик вызывается корректно', async () => {
//       const { user } = render(<CreateSubTaskModal {...requiredProps} />)
//
//       await testUtils.clickCancelButton(user)
//       expect(requiredProps.onCancel).toBeCalledTimes(1)
//     })
//   })
// })
