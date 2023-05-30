import { screen, waitFor, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { subTaskApiMessages } from 'modules/subTask/constants/errorMessages'
import { supportGroupApiMessages } from 'modules/supportGroup/constants/errorMessages'

import {
  validationMessages,
  validationSizes,
} from 'shared/constants/validation'

import subTaskFixtures from 'fixtures/subTask'
import supportGroupFixtures from 'fixtures/supportGroup'
import taskFixtures from 'fixtures/task'

import {
  mockCreateSubTaskBadRequestError,
  mockCreateSubTaskServerError,
  mockCreateSubTaskSuccess,
  mockGetSubTaskTemplateListServerError,
  mockGetSubTaskTemplateListSuccess,
  mockGetSupportGroupListServerError,
  mockGetSupportGroupListSuccess,
} from '_tests_/mocks/api'
import {
  clickSelectOption,
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
  setupNotifications,
  getStoreWithAuth,
  findNotification,
  setupApiTests,
  getSelectOption,
} from '_tests_/utils'

import CreateSubTaskModal from './index'
import {
  CreateSubTaskFormErrors,
  CreateSubTaskFormFields,
  CreateSubTaskModalProps,
} from './interfaces'

const onCancel = jest.fn()

const props: Readonly<CreateSubTaskModalProps> = {
  task: taskFixtures.getTask(),
  onCancel,
}

const getContainer = () => screen.getByTestId('create-sub-task-modal')

const findContainer = () => screen.findByTestId('create-sub-task-modal')

const getChildByText = (text: string | RegExp) =>
  within(getContainer()).getByText(text)

// support group field
const getSupportGroupFormItem = () =>
  within(getContainer()).getByTestId('supportGroup')

const getSupportGroupSelect = (opened?: boolean) =>
  getSelect(getSupportGroupFormItem(), {
    name: 'Группа поддержки',
    expanded: opened,
  })

const querySupportGroupSelect = (opened?: boolean) =>
  querySelect(getSupportGroupFormItem(), {
    name: 'Группа поддержки',
    expanded: opened,
  })

const getSupportGroupSelectPlaceholder = () =>
  within(getSupportGroupFormItem()).getByText('Доступные группы')

const getSupportGroupLabel = () =>
  within(getSupportGroupFormItem()).getByTitle('Группа поддержки')

const setSupportGroup = clickSelectOption

const getSupportGroupOption = getSelectOption

const getSelectedSupportGroup = (value: string) =>
  within(getSupportGroupFormItem()).getByTitle(value)

const querySelectedSupportGroup = (value: string) =>
  within(getSupportGroupFormItem()).queryByTitle(value)

const openSupportGroupSelect = async (user: UserEvent) => {
  await openSelect(user, getSupportGroupFormItem())
}

const findSupportGroupError = (error: string) =>
  within(getSupportGroupFormItem()).findByText(error)

const supportGroupExpectLoadingStarted = () =>
  expectLoadingStartedBySelect(getSupportGroupFormItem())

const supportGroupExpectLoadingFinished = () =>
  expectLoadingFinishedBySelect(getSupportGroupFormItem())

// service field
const getServiceFieldFormItem = () =>
  within(getContainer()).getByTestId('service')

const getServiceField = (opened?: boolean) =>
  getSelect(getServiceFieldFormItem(), { name: 'Сервис', expanded: opened })

const queryServiceField = (opened?: boolean) =>
  querySelect(getServiceFieldFormItem(), { name: 'Сервис', expanded: opened })

const getServiceFieldPlaceholder = () =>
  within(getServiceFieldFormItem()).getByText('Наименование сервиса')

const getServiceFieldLabel = () =>
  within(getServiceFieldFormItem()).getByTitle('Сервис')

const setService = clickSelectOption

const getServiceOption = getSelectOption

const getSelectedService = (value: string) =>
  within(getServiceFieldFormItem()).getByTitle(value)

const querySelectedService = (value: string) =>
  within(getServiceFieldFormItem()).queryByTitle(value)

const openServiceSelect = async (user: UserEvent) => {
  await openSelect(user, getServiceFieldFormItem())
}

const findServiceFieldError = (error: string) =>
  within(getServiceFieldFormItem()).findByText(error)

const serviceExpectLoadingStarted = () =>
  expectLoadingStartedBySelect(getServiceFieldFormItem())

const serviceExpectLoadingFinished = () =>
  expectLoadingFinishedBySelect(getServiceFieldFormItem())

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

const expectLoadingStarted = () =>
  expectLoadingStartedByButton(getSubmitButton())
const expectLoadingFinished = () =>
  expectLoadingFinishedByButton(getSubmitButton())

export const testUtils = {
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
  setFormValues,

  getSubmitButton,
  clickSubmitButton,

  getCancelButton,
  clickCancelButton,

  expectLoadingStarted,
  expectLoadingFinished,
}

setupApiTests()
setupNotifications()

afterEach(() => {
  onCancel.mockReset()
})

describe('Модалка создания задачи заявки', () => {
  test('Заголовок отображается', () => {
    mockGetSupportGroupListSuccess()

    render(<CreateSubTaskModal {...props} />)

    expect(testUtils.getChildByText(/задание по заявке/i)).toBeInTheDocument()
    expect(testUtils.getChildByText(props.task.recordId)).toBeInTheDocument()
  })

  describe('Форма создания', () => {
    describe('Поле группы поддержки', () => {
      test('Отображается корректно', async () => {
        mockGetSupportGroupListSuccess()

        render(<CreateSubTaskModal {...props} />)

        await testUtils.supportGroup.expectLoadingFinished()
        const field = testUtils.supportGroup.getField()
        const placeholder = testUtils.supportGroup.getPlaceholder()
        const label = testUtils.supportGroup.getLabel()

        expect(field).toBeInTheDocument()
        expect(field).toBeEnabled()
        expect(placeholder).toBeInTheDocument()
        expect(label).toBeInTheDocument()
      })

      test('Закрыто по умолчанию', async () => {
        mockGetSupportGroupListSuccess()

        render(<CreateSubTaskModal {...props} />)

        await testUtils.supportGroup.expectLoadingFinished()

        expect(testUtils.supportGroup.queryField(true)).not.toBeInTheDocument()
      })

      test('Не активно во время создания задачи', async () => {
        const fakeSupportGroupListItem =
          supportGroupFixtures.fakeSupportGroupListItem()
        mockGetSupportGroupListSuccess({ body: [fakeSupportGroupListItem] })

        const fakeTemplate = subTaskFixtures.getSubTaskTemplate()
        mockGetSubTaskTemplateListSuccess({ body: [fakeTemplate] })

        mockCreateSubTaskSuccess(props.task.id)

        const { user } = render(<CreateSubTaskModal {...props} />, {
          store: getStoreWithAuth(),
        })

        await testUtils.supportGroup.expectLoadingFinished()
        await testUtils.setFormValues(user, {
          title: fakeWord(),
          description: fakeWord(),
          supportGroup: fakeSupportGroupListItem.name,
          templateX5: fakeTemplate.title,
        })
        await testUtils.clickSubmitButton(user)
        await testUtils.expectLoadingStarted()

        expect(testUtils.supportGroup.getField()).toBeDisabled()
      })

      test('Отображает состояние загрузки во время загрузки групп поддержки', async () => {
        mockGetSupportGroupListSuccess()

        render(<CreateSubTaskModal {...props} />)

        await testUtils.supportGroup.expectLoadingStarted()
      })

      test('Имеет верное количество вариантов', async () => {
        const fakeSupportGroupList = [
          supportGroupFixtures.fakeSupportGroupListItem(),
        ]
        mockGetSupportGroupListSuccess({ body: fakeSupportGroupList })

        const { user } = render(<CreateSubTaskModal {...props} />)

        await testUtils.supportGroup.expectLoadingFinished()
        await testUtils.supportGroup.openField(user)

        fakeSupportGroupList.forEach((opt) => {
          const value = testUtils.supportGroup.getOption(opt.name)
          expect(value).toBeInTheDocument()
        })
      })

      test('Не имеет значения по умолчанию', async () => {
        const fakeSupportGroupList = [
          supportGroupFixtures.fakeSupportGroupListItem(),
        ]
        mockGetSupportGroupListSuccess({ body: fakeSupportGroupList })

        const { user } = render(<CreateSubTaskModal {...props} />)

        await testUtils.supportGroup.expectLoadingFinished()
        await testUtils.supportGroup.openField(user)

        fakeSupportGroupList.forEach((opt) => {
          const value = testUtils.supportGroup.queryValue(opt.name)
          expect(value).not.toBeInTheDocument()
        })
      })

      test('Можно выбрать значение', async () => {
        const fakeSupportGroupListItem =
          supportGroupFixtures.fakeSupportGroupListItem()
        mockGetSupportGroupListSuccess({ body: [fakeSupportGroupListItem] })

        const { user } = render(<CreateSubTaskModal {...props} />)

        await testUtils.supportGroup.expectLoadingFinished()
        await testUtils.supportGroup.openField(user)
        await testUtils.supportGroup.setValue(
          user,
          fakeSupportGroupListItem.name,
        )
        const value = testUtils.supportGroup.getValue(
          fakeSupportGroupListItem.name,
        )

        expect(value).toBeInTheDocument()
      })

      test('Закрывается после выбора значения', async () => {
        const fakeSupportGroupListItem =
          supportGroupFixtures.fakeSupportGroupListItem()
        mockGetSupportGroupListSuccess({ body: [fakeSupportGroupListItem] })

        const { user } = render(<CreateSubTaskModal {...props} />)

        await testUtils.supportGroup.expectLoadingFinished()
        await testUtils.supportGroup.openField(user)
        await testUtils.supportGroup.setValue(
          user,
          fakeSupportGroupListItem.name,
        )

        expect(testUtils.supportGroup.getField(false)).toBeInTheDocument()
      })

      describe('Соответствующая ошибка отображается под полем', () => {
        test('Если не выбрать значение и нажать кнопку отправки', async () => {
          mockGetSupportGroupListSuccess()

          const { user } = render(<CreateSubTaskModal {...props} />)

          await testUtils.clickSubmitButton(user)
          const error = await testUtils.supportGroup.findError(
            validationMessages.required,
          )

          expect(error).toBeInTheDocument()
        })
      })
    })

    describe('Поле сервиса', () => {
      test('Отображается корректно', () => {
        mockGetSupportGroupListSuccess()

        render(<CreateSubTaskModal {...props} />)

        const field = testUtils.service.getField()
        const placeholder = testUtils.service.getPlaceholder()
        const label = testUtils.service.getLabel()

        expect(field).toBeInTheDocument()
        expect(field).toBeDisabled()
        expect(placeholder).toBeInTheDocument()
        expect(label).toBeInTheDocument()
      })

      test('Закрыто по умолчанию', () => {
        mockGetSupportGroupListSuccess()

        render(<CreateSubTaskModal {...props} />)

        expect(testUtils.service.queryField(true)).not.toBeInTheDocument()
      })

      test('Не активно если не выбрана группа поддержки', async () => {
        mockGetSupportGroupListSuccess()

        render(<CreateSubTaskModal {...props} />)

        expect(testUtils.service.getField()).toBeDisabled()
      })

      test('Не активно во время создания задачи', async () => {
        const fakeSupportGroupListItem =
          supportGroupFixtures.fakeSupportGroupListItem()
        mockGetSupportGroupListSuccess({ body: [fakeSupportGroupListItem] })

        const fakeTemplate = subTaskFixtures.getSubTaskTemplate()
        mockGetSubTaskTemplateListSuccess({ body: [fakeTemplate] })

        mockCreateSubTaskSuccess(props.task.id)

        const { user } = render(<CreateSubTaskModal {...props} />, {
          store: getStoreWithAuth(),
        })

        await testUtils.supportGroup.expectLoadingFinished()
        await testUtils.setFormValues(user, {
          title: fakeWord(),
          description: fakeWord(),
          supportGroup: fakeSupportGroupListItem.name,
          templateX5: fakeTemplate.title,
        })
        await testUtils.clickSubmitButton(user)
        await testUtils.expectLoadingStarted()

        expect(testUtils.service.getField()).toBeDisabled()
      })

      test('Становится активным после выбора группы поддержки', async () => {
        const fakeSupportGroupListItem =
          supportGroupFixtures.fakeSupportGroupListItem()
        mockGetSupportGroupListSuccess({ body: [fakeSupportGroupListItem] })

        mockGetSubTaskTemplateListSuccess({
          body: [subTaskFixtures.getSubTaskTemplate()],
        })

        const { user } = render(<CreateSubTaskModal {...props} />)

        await testUtils.supportGroup.expectLoadingFinished()
        expect(testUtils.service.getField()).toBeDisabled()

        await testUtils.supportGroup.openField(user)
        await testUtils.supportGroup.setValue(
          user,
          fakeSupportGroupListItem.name,
        )
        await testUtils.service.expectLoadingFinished()

        expect(testUtils.service.getField()).toBeEnabled()
      })

      test('Отображает состояние загрузки во время загрузки шаблонов', async () => {
        const fakeSupportGroupListItem =
          supportGroupFixtures.fakeSupportGroupListItem()
        mockGetSupportGroupListSuccess({ body: [fakeSupportGroupListItem] })

        mockGetSubTaskTemplateListSuccess()

        const { user } = render(<CreateSubTaskModal {...props} />)

        await testUtils.supportGroup.expectLoadingFinished()
        await testUtils.supportGroup.openField(user)
        await testUtils.supportGroup.setValue(
          user,
          fakeSupportGroupListItem.name,
        )
        await testUtils.service.expectLoadingStarted()
      })

      test('Имеет верное количество вариантов', async () => {
        const fakeSupportGroupListItem =
          supportGroupFixtures.fakeSupportGroupListItem()
        mockGetSupportGroupListSuccess({ body: [fakeSupportGroupListItem] })

        const fakeTemplateList = [subTaskFixtures.getSubTaskTemplate()]
        mockGetSubTaskTemplateListSuccess({ body: fakeTemplateList })

        const { user } = render(<CreateSubTaskModal {...props} />)

        await testUtils.supportGroup.expectLoadingFinished()
        await testUtils.supportGroup.openField(user)
        await testUtils.supportGroup.setValue(
          user,
          fakeSupportGroupListItem.name,
        )
        await testUtils.service.expectLoadingFinished()
        await testUtils.service.openField(user)

        fakeTemplateList.forEach((opt) => {
          const value = testUtils.service.getOption(opt.title)
          expect(value).toBeInTheDocument()
        })
      })

      test('Не имеет значения по умолчанию', async () => {
        const fakeSupportGroupListItem =
          supportGroupFixtures.fakeSupportGroupListItem()
        mockGetSupportGroupListSuccess({ body: [fakeSupportGroupListItem] })

        const fakeTemplateList = [subTaskFixtures.getSubTaskTemplate()]
        mockGetSubTaskTemplateListSuccess({ body: fakeTemplateList })

        const { user } = render(<CreateSubTaskModal {...props} />)

        await testUtils.supportGroup.expectLoadingFinished()
        await testUtils.supportGroup.openField(user)
        await testUtils.supportGroup.setValue(
          user,
          fakeSupportGroupListItem.name,
        )
        await testUtils.service.expectLoadingFinished()
        await testUtils.service.openField(user)

        fakeTemplateList.forEach((opt) => {
          const value = testUtils.service.queryValue(opt.title)
          expect(value).not.toBeInTheDocument()
        })
      })

      test('Можно выбрать значение', async () => {
        const fakeSupportGroupListItem =
          supportGroupFixtures.fakeSupportGroupListItem()
        mockGetSupportGroupListSuccess({ body: [fakeSupportGroupListItem] })

        const fakeTemplate = subTaskFixtures.getSubTaskTemplate()
        mockGetSubTaskTemplateListSuccess({ body: [fakeTemplate] })

        const { user } = render(<CreateSubTaskModal {...props} />)

        await testUtils.supportGroup.expectLoadingFinished()
        await testUtils.supportGroup.openField(user)
        await testUtils.supportGroup.setValue(
          user,
          fakeSupportGroupListItem.name,
        )
        await testUtils.service.expectLoadingFinished()
        await testUtils.service.openField(user)
        await testUtils.service.setValue(user, fakeTemplate.title)
        const value = testUtils.service.getValue(fakeTemplate.title)

        expect(value).toBeInTheDocument()
      })

      test('Закрывается после выбора значения', async () => {
        const fakeSupportGroupListItem =
          supportGroupFixtures.fakeSupportGroupListItem()
        mockGetSupportGroupListSuccess({ body: [fakeSupportGroupListItem] })

        const fakeTemplate = subTaskFixtures.getSubTaskTemplate()
        mockGetSubTaskTemplateListSuccess({ body: [fakeTemplate] })

        const { user } = render(<CreateSubTaskModal {...props} />)

        await testUtils.supportGroup.expectLoadingFinished()
        await testUtils.supportGroup.openField(user)
        await testUtils.supportGroup.setValue(
          user,
          fakeSupportGroupListItem.name,
        )
        await testUtils.service.expectLoadingFinished()
        await testUtils.service.openField(user)
        await testUtils.service.setValue(user, fakeTemplate.title)

        expect(testUtils.service.getField(false)).toBeInTheDocument()
      })

      describe('Соответствующая ошибка отображается под полем', () => {
        test('Если не выбрать значение и нажать кнопку отправки', async () => {
          mockGetSupportGroupListSuccess()

          const { user } = render(<CreateSubTaskModal {...props} />)

          await testUtils.clickSubmitButton(user)
          const error = await testUtils.service.findError(
            validationMessages.required,
          )

          expect(error).toBeInTheDocument()
        })
      })
    })

    describe('Поле заголовка', () => {
      test('Отображается корректно', () => {
        mockGetSupportGroupListSuccess()

        render(<CreateSubTaskModal {...props} />)

        const field = testUtils.title.getField()

        expect(field).toBeInTheDocument()
        expect(field).toBeEnabled()
        expect(field).toHaveDisplayValue(props.task.title)
        expect(testUtils.title.getLabel()).toBeInTheDocument()
      })

      test('Не активно во время создания задачи', async () => {
        const fakeSupportGroupListItem =
          supportGroupFixtures.fakeSupportGroupListItem()
        mockGetSupportGroupListSuccess({ body: [fakeSupportGroupListItem] })

        const fakeTemplate = subTaskFixtures.getSubTaskTemplate()
        mockGetSubTaskTemplateListSuccess({ body: [fakeTemplate] })

        mockCreateSubTaskSuccess(props.task.id)

        const { user } = render(<CreateSubTaskModal {...props} />, {
          store: getStoreWithAuth(),
        })

        await testUtils.supportGroup.expectLoadingFinished()
        await testUtils.setFormValues(user, {
          title: fakeWord(),
          description: fakeWord(),
          supportGroup: fakeSupportGroupListItem.name,
          templateX5: fakeTemplate.title,
        })
        await testUtils.clickSubmitButton(user)
        await testUtils.expectLoadingStarted()

        expect(testUtils.title.getField()).toBeDisabled()
      })

      test('Можно ввести значение', async () => {
        mockGetSupportGroupListSuccess()

        const { user } = render(
          <CreateSubTaskModal
            {...props}
            task={{
              ...props.task,
              title: '',
            }}
          />,
        )

        const value = fakeWord()
        const field = await testUtils.title.setValue(user, value)

        expect(field).toHaveDisplayValue(value)
      })

      test('Можно очистить значение', async () => {
        mockGetSupportGroupListSuccess()

        const { user } = render(<CreateSubTaskModal {...props} />)

        const value = fakeWord()
        await testUtils.title.setValue(user, value)
        await testUtils.title.resetValue(user)

        expect(testUtils.title.getField()).not.toHaveDisplayValue(value)
      })

      describe('Соответствующая ошибка отображается под полем', () => {
        test('Если не ввести значение и нажать кнопку отправки', async () => {
          mockGetSupportGroupListSuccess()

          const { user } = render(
            <CreateSubTaskModal
              {...props}
              task={{
                ...props.task,
                title: '',
              }}
            />,
          )

          await testUtils.clickSubmitButton(user)
          const error = await testUtils.title.findError(
            validationMessages.required,
          )

          expect(error).toBeInTheDocument()
        })

        test('Если ввести только пробелы', async () => {
          mockGetSupportGroupListSuccess()

          const { user } = render(
            <CreateSubTaskModal
              {...props}
              task={{
                ...props.task,
                title: '',
              }}
            />,
          )

          await testUtils.title.setValue(user, ' ')

          expect(
            await testUtils.title.findError(validationMessages.canNotBeEmpty),
          ).toBeInTheDocument()
        })

        test('Если превысить лимит символов', async () => {
          mockGetSupportGroupListSuccess()

          const { user } = render(
            <CreateSubTaskModal
              {...props}
              task={{
                ...props.task,
                title: '',
              }}
            />,
          )

          await testUtils.title.setValue(
            user,
            fakeWord({ length: validationSizes.string.short + 1 }),
          )

          expect(
            await testUtils.title.findError(
              validationMessages.string.max.short,
            ),
          ).toBeInTheDocument()
        })
      })
    })

    describe('Поле описания', () => {
      test('Отображается корректно', () => {
        mockGetSupportGroupListSuccess()

        render(<CreateSubTaskModal {...props} />)

        const field = testUtils.description.getField()

        expect(field).toBeInTheDocument()
        expect(field).toBeEnabled()
        expect(field).toHaveDisplayValue(props.task.description!)
        expect(testUtils.description.getLabel()).toBeInTheDocument()
      })

      test('Не активно во время создания задачи', async () => {
        const fakeSupportGroupListItem =
          supportGroupFixtures.fakeSupportGroupListItem()
        mockGetSupportGroupListSuccess({ body: [fakeSupportGroupListItem] })

        const fakeTemplate = subTaskFixtures.getSubTaskTemplate()
        mockGetSubTaskTemplateListSuccess({ body: [fakeTemplate] })

        mockCreateSubTaskSuccess(props.task.id)

        const { user } = render(<CreateSubTaskModal {...props} />, {
          store: getStoreWithAuth(),
        })

        await testUtils.supportGroup.expectLoadingFinished()
        await testUtils.setFormValues(user, {
          title: fakeWord(),
          description: fakeWord(),
          supportGroup: fakeSupportGroupListItem.name,
          templateX5: fakeTemplate.title,
        })
        await testUtils.clickSubmitButton(user)
        await testUtils.expectLoadingStarted()

        expect(testUtils.description.getField()).toBeDisabled()
      })

      test('Можно ввести значение', async () => {
        mockGetSupportGroupListSuccess()

        const { user } = render(
          <CreateSubTaskModal
            {...props}
            task={{
              ...props.task,
              description: '',
            }}
          />,
        )

        const value = fakeWord()
        const field = await testUtils.description.setValue(user, value)

        expect(field).toHaveDisplayValue(value)
      })

      test('Можно очистить значение', async () => {
        mockGetSupportGroupListSuccess()

        const { user } = render(<CreateSubTaskModal {...props} />)

        const value = fakeWord()
        await testUtils.description.setValue(user, value)
        await testUtils.description.resetValue(user)

        expect(testUtils.description.getField()).not.toHaveDisplayValue(value)
      })

      describe('Соответствующая ошибка отображается под полем', () => {
        test('Если не ввести значение и нажать кнопку отправки', async () => {
          mockGetSupportGroupListSuccess()

          const { user } = render(
            <CreateSubTaskModal
              {...props}
              task={{
                ...props.task,
                description: '',
              }}
            />,
          )

          await testUtils.clickSubmitButton(user)

          expect(
            await testUtils.description.findError(validationMessages.required),
          ).toBeInTheDocument()
        })

        test('Если ввести только пробелы', async () => {
          mockGetSupportGroupListSuccess()

          const { user } = render(
            <CreateSubTaskModal
              {...props}
              task={{
                ...props.task,
                description: '',
              }}
            />,
          )

          await testUtils.description.setValue(user, ' ')

          expect(
            await testUtils.description.findError(
              validationMessages.canNotBeEmpty,
            ),
          ).toBeInTheDocument()
        })

        test('Если превысить лимит символов', async () => {
          mockGetSupportGroupListSuccess()

          const { user } = render(
            <CreateSubTaskModal
              {...props}
              task={{
                ...props.task,
                description: '',
              }}
            />,
          )

          await testUtils.description.setValue(
            user,
            fakeWord({ length: validationSizes.string.long + 1 }),
          )

          expect(
            await testUtils.description.findError(
              validationMessages.string.max.long,
            ),
          ).toBeInTheDocument()
        })
      })
    })
  })

  describe('Кнопка отправки', () => {
    test('Отображается корректно', () => {
      render(<CreateSubTaskModal {...props} />)

      const button = testUtils.getSubmitButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Отображает состояние загрузки во время создания задачи', async () => {
      const fakeSupportGroupListItem =
        supportGroupFixtures.fakeSupportGroupListItem()
      mockGetSupportGroupListSuccess({ body: [fakeSupportGroupListItem] })

      const fakeTemplate = subTaskFixtures.getSubTaskTemplate()
      mockGetSubTaskTemplateListSuccess({ body: [fakeTemplate] })

      mockCreateSubTaskSuccess(props.task.id)

      const { user } = render(<CreateSubTaskModal {...props} />, {
        store: getStoreWithAuth(),
      })

      await testUtils.supportGroup.expectLoadingFinished()
      await testUtils.setFormValues(user, {
        title: fakeWord(),
        description: fakeWord(),
        supportGroup: fakeSupportGroupListItem.name,
        templateX5: fakeTemplate.title,
      })
      await testUtils.clickSubmitButton(user)
      await testUtils.expectLoadingStarted()
    })
  })

  describe('Кнопка отмены', () => {
    test('Отображается корректно', () => {
      mockGetSupportGroupListSuccess()

      render(<CreateSubTaskModal {...props} />)

      const button = testUtils.getCancelButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Обработчик вызывается корректно', async () => {
      mockGetSupportGroupListSuccess()

      const { user } = render(<CreateSubTaskModal {...props} />)

      await testUtils.clickCancelButton(user)
      expect(props.onCancel).toBeCalled()
    })
  })

  describe('Создание задачи', () => {
    describe('При успешном создании', () => {
      test('Вызывается обработчик закрытия модалки', async () => {
        const fakeSupportGroupListItem =
          supportGroupFixtures.fakeSupportGroupListItem()
        mockGetSupportGroupListSuccess({ body: [fakeSupportGroupListItem] })

        const fakeTemplate = subTaskFixtures.getSubTaskTemplate()
        mockGetSubTaskTemplateListSuccess({ body: [fakeTemplate] })

        mockCreateSubTaskSuccess(props.task.id)

        const { user } = render(<CreateSubTaskModal {...props} />, {
          store: getStoreWithAuth(),
        })

        await testUtils.supportGroup.expectLoadingFinished()
        await testUtils.setFormValues(user, {
          title: fakeWord(),
          description: fakeWord(),
          supportGroup: fakeSupportGroupListItem.name,
          templateX5: fakeTemplate.title,
        })
        await testUtils.clickSubmitButton(user)
        await testUtils.expectLoadingFinished()

        await waitFor(() => {
          expect(props.onCancel).toBeCalled()
        })
      })
    })

    describe('При не успешном создании', () => {
      test('Обрабатывается ошибка клиента', async () => {
        const fakeSupportGroupListItem =
          supportGroupFixtures.fakeSupportGroupListItem()
        mockGetSupportGroupListSuccess({ body: [fakeSupportGroupListItem] })

        const fakeTemplate = subTaskFixtures.getSubTaskTemplate()
        mockGetSubTaskTemplateListSuccess({ body: [fakeTemplate] })

        const badRequestResponse: Required<CreateSubTaskFormErrors> = {
          title: [fakeWord()],
          description: [fakeWord()],
          templateX5: [fakeWord()],
        }
        mockCreateSubTaskBadRequestError(props.task.id, {
          body: badRequestResponse,
        })

        const { user } = render(<CreateSubTaskModal {...props} />, {
          store: getStoreWithAuth(),
        })

        await testUtils.supportGroup.expectLoadingFinished()
        await testUtils.setFormValues(user, {
          title: fakeWord(),
          description: fakeWord(),
          supportGroup: fakeSupportGroupListItem.name,
          templateX5: fakeTemplate.title,
        })
        await testUtils.clickSubmitButton(user)

        expect(
          await testUtils.service.findError(badRequestResponse.templateX5[0]),
        ).toBeInTheDocument()

        expect(
          await testUtils.title.findError(badRequestResponse.title[0]),
        ).toBeInTheDocument()

        expect(
          await testUtils.description.findError(
            badRequestResponse.description[0],
          ),
        ).toBeInTheDocument()

        expect(
          await findNotification(subTaskApiMessages.createSubTask.commonError),
        ).toBeInTheDocument()
      })

      test('Обрабатывается ошибка сервера', async () => {
        const fakeSupportGroupListItem =
          supportGroupFixtures.fakeSupportGroupListItem()
        mockGetSupportGroupListSuccess({ body: [fakeSupportGroupListItem] })

        const fakeTemplate = subTaskFixtures.getSubTaskTemplate()
        mockGetSubTaskTemplateListSuccess({ body: [fakeTemplate] })

        mockCreateSubTaskServerError(props.task.id)

        const { user } = render(<CreateSubTaskModal {...props} />, {
          store: getStoreWithAuth(),
        })

        await testUtils.supportGroup.expectLoadingFinished()
        await testUtils.setFormValues(user, {
          title: fakeWord(),
          description: fakeWord(),
          supportGroup: fakeSupportGroupListItem.name,
          templateX5: fakeTemplate.title,
        })
        await testUtils.clickSubmitButton(user)

        expect(
          await findNotification(subTaskApiMessages.createSubTask.commonError),
        ).toBeInTheDocument()
      })
    })
  })

  describe('Список шаблонов', () => {
    describe('При не успешном запросе', () => {
      test('Отображается соответствующее уведомление', async () => {
        const fakeSupportGroupListItem =
          supportGroupFixtures.fakeSupportGroupListItem()
        mockGetSupportGroupListSuccess({ body: [fakeSupportGroupListItem] })

        mockGetSubTaskTemplateListServerError()

        const { user } = render(<CreateSubTaskModal {...props} />, {
          store: getStoreWithAuth(),
        })

        await testUtils.supportGroup.expectLoadingFinished()
        await testUtils.supportGroup.openField(user)
        await testUtils.supportGroup.setValue(
          user,
          fakeSupportGroupListItem.name,
        )

        expect(
          await findNotification(
            subTaskApiMessages.getSubTaskTemplateList.commonError,
          ),
        ).toBeInTheDocument()
      })
    })
  })

  describe('Список групп поддержки', () => {
    describe('При не успешном запросе', () => {
      test('Отображается соответствующее уведомление', async () => {
        mockGetSupportGroupListServerError()

        render(<CreateSubTaskModal {...props} />, {
          store: getStoreWithAuth(),
        })

        expect(
          await findNotification(
            supportGroupApiMessages.getSupportGroupList.commonError,
          ),
        ).toBeInTheDocument()
      })
    })
  })
})
