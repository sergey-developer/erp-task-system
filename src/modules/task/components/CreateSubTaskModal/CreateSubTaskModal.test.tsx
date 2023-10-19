import { screen, waitFor, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { getSupportGroupListMessages } from 'modules/supportGroup/constants'
import { createSubTaskMessages } from 'modules/task/constants/task'

import { getSubTaskTemplateListMessages } from 'shared/constants/catalogs'
import { validationMessages } from 'shared/constants/validation'

import catalogsFixtures from '_tests_/fixtures/catalogs'
import supportGroupFixtures from '_tests_/fixtures/supportGroup'
import taskFixtures from '_tests_/fixtures/task'
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
  selectTestUtils,
  fakeWord,
  render,
  getStoreWithAuth,
  setupApiTests,
  notificationTestUtils,
  buttonTestUtils,
} from '_tests_/utils'

import CreateSubTaskModal from './index'
import { CreateSubTaskFormErrors, CreateSubTaskFormFields, CreateSubTaskModalProps } from './types'

const props: Readonly<CreateSubTaskModalProps> = {
  task: taskFixtures.task(),
  onCancel: jest.fn(),
}

const getContainer = () => screen.getByTestId('create-sub-task-modal')

const findContainer = () => screen.findByTestId('create-sub-task-modal')

const getChildByText = (text: string | RegExp) => within(getContainer()).getByText(text)

// support group field
const getSupportGroupFormItem = () => within(getContainer()).getByTestId('support-group-form-item')
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
const getServiceFieldFormItem = () => within(getContainer()).getByTestId('service-form-item')
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
const getTitleFieldContainer = () => within(getContainer()).getByTestId('title-form-item')

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
  within(getContainer()).getByTestId('description-form-item')

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

setupApiTests()
notificationTestUtils.setupNotifications()

afterEach(() => {
  const onCancel = props.onCancel as jest.Mock
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

      test.skip('Не активно во время создания задачи', async () => {
        const fakeSupportGroupListItem = supportGroupFixtures.supportGroupListItem()
        mockGetSupportGroupListSuccess({ body: [fakeSupportGroupListItem] })

        const fakeTemplate = catalogsFixtures.subTaskTemplate()
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
        const fakeSupportGroupList = [supportGroupFixtures.supportGroupListItem()]
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
        const fakeSupportGroupList = [supportGroupFixtures.supportGroupListItem()]
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
        const fakeSupportGroupListItem = supportGroupFixtures.supportGroupListItem()
        mockGetSupportGroupListSuccess({ body: [fakeSupportGroupListItem] })

        mockGetSubTaskTemplateListSuccess()

        const { user } = render(<CreateSubTaskModal {...props} />)

        await testUtils.supportGroup.expectLoadingFinished()
        await testUtils.supportGroup.openField(user)
        await testUtils.supportGroup.setValue(user, fakeSupportGroupListItem.name)
        const value = testUtils.supportGroup.getValue(fakeSupportGroupListItem.name)

        expect(value).toBeInTheDocument()
      })

      describe('Соответствующая ошибка отображается под полем', () => {
        test('Если не выбрать значение и нажать кнопку отправки', async () => {
          mockGetSupportGroupListSuccess()

          const { user } = render(<CreateSubTaskModal {...props} />)

          await testUtils.clickSubmitButton(user)
          const error = await testUtils.supportGroup.findError(validationMessages.required)

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

      test('Не активно если не выбрана группа поддержки', async () => {
        mockGetSupportGroupListSuccess()

        render(<CreateSubTaskModal {...props} />)

        expect(testUtils.service.getField()).toBeDisabled()
      })

      test('Не активно во время создания задачи', async () => {
        const fakeSupportGroupListItem = supportGroupFixtures.supportGroupListItem()
        mockGetSupportGroupListSuccess({ body: [fakeSupportGroupListItem] })

        const fakeTemplate = catalogsFixtures.subTaskTemplate()
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
        const fakeSupportGroupListItem = supportGroupFixtures.supportGroupListItem()
        mockGetSupportGroupListSuccess({ body: [fakeSupportGroupListItem] })

        mockGetSubTaskTemplateListSuccess({
          body: [catalogsFixtures.subTaskTemplate()],
        })

        const { user } = render(<CreateSubTaskModal {...props} />)

        await testUtils.supportGroup.expectLoadingFinished()
        expect(testUtils.service.getField()).toBeDisabled()

        await testUtils.supportGroup.openField(user)
        await testUtils.supportGroup.setValue(user, fakeSupportGroupListItem.name)
        await testUtils.service.expectLoadingFinished()

        expect(testUtils.service.getField()).toBeEnabled()
      })

      test('Отображает состояние загрузки во время загрузки шаблонов', async () => {
        const fakeSupportGroupListItem = supportGroupFixtures.supportGroupListItem()
        mockGetSupportGroupListSuccess({ body: [fakeSupportGroupListItem] })

        mockGetSubTaskTemplateListSuccess()

        const { user } = render(<CreateSubTaskModal {...props} />)

        await testUtils.supportGroup.expectLoadingFinished()
        await testUtils.supportGroup.openField(user)
        await testUtils.supportGroup.setValue(user, fakeSupportGroupListItem.name)
        await testUtils.service.expectLoadingStarted()
      })

      test('Имеет верное количество вариантов', async () => {
        const fakeSupportGroupListItem = supportGroupFixtures.supportGroupListItem()
        mockGetSupportGroupListSuccess({ body: [fakeSupportGroupListItem] })

        const fakeTemplateList = [catalogsFixtures.subTaskTemplate()]
        mockGetSubTaskTemplateListSuccess({ body: fakeTemplateList })

        const { user } = render(<CreateSubTaskModal {...props} />)

        await testUtils.supportGroup.expectLoadingFinished()
        await testUtils.supportGroup.openField(user)
        await testUtils.supportGroup.setValue(user, fakeSupportGroupListItem.name)
        await testUtils.service.expectLoadingFinished()
        await testUtils.service.openField(user)

        fakeTemplateList.forEach((opt) => {
          const value = testUtils.service.getOption(opt.title)
          expect(value).toBeInTheDocument()
        })
      })

      test('Не имеет значения по умолчанию', async () => {
        const fakeSupportGroupListItem = supportGroupFixtures.supportGroupListItem()
        mockGetSupportGroupListSuccess({ body: [fakeSupportGroupListItem] })

        const fakeTemplateList = [catalogsFixtures.subTaskTemplate()]
        mockGetSubTaskTemplateListSuccess({ body: fakeTemplateList })

        const { user } = render(<CreateSubTaskModal {...props} />)

        await testUtils.supportGroup.expectLoadingFinished()
        await testUtils.supportGroup.openField(user)
        await testUtils.supportGroup.setValue(user, fakeSupportGroupListItem.name)
        await testUtils.service.expectLoadingFinished()
        await testUtils.service.openField(user)

        fakeTemplateList.forEach((opt) => {
          const value = testUtils.service.queryValue(opt.title)
          expect(value).not.toBeInTheDocument()
        })
      })

      test('Можно выбрать значение', async () => {
        const fakeSupportGroupListItem = supportGroupFixtures.supportGroupListItem()
        mockGetSupportGroupListSuccess({ body: [fakeSupportGroupListItem] })

        const fakeTemplate = catalogsFixtures.subTaskTemplate()
        mockGetSubTaskTemplateListSuccess({ body: [fakeTemplate] })

        const { user } = render(<CreateSubTaskModal {...props} />)

        await testUtils.supportGroup.expectLoadingFinished()
        await testUtils.supportGroup.openField(user)
        await testUtils.supportGroup.setValue(user, fakeSupportGroupListItem.name)
        await testUtils.service.expectLoadingFinished()
        await testUtils.service.openField(user)
        await testUtils.service.setValue(user, fakeTemplate.title)
        const value = testUtils.service.getValue(fakeTemplate.title)

        expect(value).toBeInTheDocument()
      })

      describe('Соответствующая ошибка отображается под полем', () => {
        test('Если не выбрать значение и нажать кнопку отправки', async () => {
          mockGetSupportGroupListSuccess()

          const { user } = render(<CreateSubTaskModal {...props} />)

          await testUtils.clickSubmitButton(user)
          const error = await testUtils.service.findError(validationMessages.required)

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
          const error = await testUtils.title.findError(validationMessages.required)

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
            await testUtils.description.findError(validationMessages.canNotBeEmpty),
          ).toBeInTheDocument()
        })
      })
    })
  })

  describe('Кнопка отправки', () => {
    test('Отображается корректно', () => {
      mockGetSupportGroupListSuccess()
      render(<CreateSubTaskModal {...props} />)

      const button = testUtils.getSubmitButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Отображает состояние загрузки во время создания задачи', async () => {
      const fakeSupportGroupListItem = supportGroupFixtures.supportGroupListItem()
      mockGetSupportGroupListSuccess({ body: [fakeSupportGroupListItem] })

      const fakeTemplate = catalogsFixtures.subTaskTemplate()
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
      expect(props.onCancel).toBeCalledTimes(1)
    })
  })

  describe('Создание задачи', () => {
    describe('При успешном создании', () => {
      test('Вызывается обработчик закрытия модалки', async () => {
        const fakeSupportGroupListItem = supportGroupFixtures.supportGroupListItem()
        mockGetSupportGroupListSuccess({ body: [fakeSupportGroupListItem] })

        const fakeTemplate = catalogsFixtures.subTaskTemplate()
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
          expect(props.onCancel).toBeCalledTimes(1)
        })
      })
    })

    describe('При не успешном создании', () => {
      test('Обрабатывается ошибка 400', async () => {
        const fakeSupportGroupListItem = supportGroupFixtures.supportGroupListItem()
        mockGetSupportGroupListSuccess({ body: [fakeSupportGroupListItem] })

        const fakeTemplate = catalogsFixtures.subTaskTemplate()
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

        expect(await testUtils.title.findError(badRequestResponse.title[0])).toBeInTheDocument()

        expect(
          await testUtils.description.findError(badRequestResponse.description[0]),
        ).toBeInTheDocument()

        const notification = await notificationTestUtils.findNotification(
          createSubTaskMessages.commonError,
        )
        expect(notification).toBeInTheDocument()
      })

      test('Обрабатывается ошибка 500', async () => {
        const fakeSupportGroupListItem = supportGroupFixtures.supportGroupListItem()
        mockGetSupportGroupListSuccess({ body: [fakeSupportGroupListItem] })

        const fakeTemplate = catalogsFixtures.subTaskTemplate()
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

        const notification = await notificationTestUtils.findNotification(
          createSubTaskMessages.commonError,
        )
        expect(notification).toBeInTheDocument()
      })
    })
  })

  describe('Список шаблонов', () => {
    describe('При не успешном запросе', () => {
      test('Отображается соответствующее уведомление', async () => {
        const fakeSupportGroupListItem = supportGroupFixtures.supportGroupListItem()
        mockGetSupportGroupListSuccess({ body: [fakeSupportGroupListItem] })

        mockGetSubTaskTemplateListServerError()

        const { user } = render(<CreateSubTaskModal {...props} />, {
          store: getStoreWithAuth(),
        })

        await testUtils.supportGroup.expectLoadingFinished()
        await testUtils.supportGroup.openField(user)
        await testUtils.supportGroup.setValue(user, fakeSupportGroupListItem.name)

        const notification = await notificationTestUtils.findNotification(
          getSubTaskTemplateListMessages.commonError,
        )
        expect(notification).toBeInTheDocument()
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

        const notification = await notificationTestUtils.findNotification(
          getSupportGroupListMessages.commonError,
        )
        expect(notification).toBeInTheDocument()
      })
    })
  })
})
