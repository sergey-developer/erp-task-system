import { waitFor } from '@testing-library/react'
import { createSubTaskErrorMessage } from 'features/tasks/api/constants'

import { getSubTaskTemplatesCatalogErrorMessage } from 'shared/catalogs/subTaskTemplates/api/constants'
import { validationMessages } from 'shared/constants/validation'
import { getSupportGroupsErrorMessage } from 'shared/supportGroups/api/constants'

import { onCancel, props } from '_tests_/features/tasks/components/CreateSubTaskModal/constants'
import { createSubTaskModalTestUtils } from '_tests_/features/tasks/components/CreateSubTaskModal/testUtils'
import catalogsFixtures from '_tests_/fixtures/catalogs'
import supportGroupsFixtures from '_tests_/fixtures/supportGroups'
import {
  fakeWord,
  getStoreWithAuth,
  notificationTestUtils,
  render,
  setupApiTests,
} from '_tests_/helpers'
import {
  mockCreateSubTaskBadRequestError,
  mockCreateSubTaskServerError,
  mockCreateSubTaskSuccess,
  mockGetSubTaskTemplatesServerError,
  mockGetSubTaskTemplatesSuccess,
  mockGetSupportGroupsServerError,
  mockGetSupportGroupsSuccess,
} from '_tests_/mocks/api'

import CreateSubTaskModal from './index'
import { CreateSubTaskFormErrors } from './types'

setupApiTests()
notificationTestUtils.setupNotifications()

afterEach(() => {
  onCancel.mockReset()
})

describe('Модалка создания задачи заявки', () => {
  test('Заголовок отображается', () => {
    mockGetSupportGroupsSuccess()

    render(<CreateSubTaskModal {...props} />)

    expect(createSubTaskModalTestUtils.getChildByText(/задание по заявке/i)).toBeInTheDocument()
    expect(createSubTaskModalTestUtils.getChildByText(props.task.recordId)).toBeInTheDocument()
  })

  describe('Форма создания', () => {
    describe('Поле группы поддержки', () => {
      test('Отображается корректно', async () => {
        mockGetSupportGroupsSuccess()

        render(<CreateSubTaskModal {...props} />)

        await createSubTaskModalTestUtils.supportGroup.expectLoadingFinished()
        const field = createSubTaskModalTestUtils.supportGroup.getField()
        const placeholder = createSubTaskModalTestUtils.supportGroup.getPlaceholder()
        const label = createSubTaskModalTestUtils.supportGroup.getLabel()

        expect(field).toBeInTheDocument()
        expect(field).toBeEnabled()
        expect(placeholder).toBeInTheDocument()
        expect(label).toBeInTheDocument()
      })

      test.skip('Не активно во время создания задачи', async () => {
        const fakeSupportGroupListItem = supportGroupsFixtures.supportGroup()
        mockGetSupportGroupsSuccess({ body: [fakeSupportGroupListItem] })

        const fakeTemplate = catalogsFixtures.subTaskTemplateCatalogItem()
        mockGetSubTaskTemplatesSuccess({ body: [fakeTemplate] })

        mockCreateSubTaskSuccess(props.task.id)

        const { user } = render(<CreateSubTaskModal {...props} />, {
          store: getStoreWithAuth(),
        })

        await createSubTaskModalTestUtils.supportGroup.expectLoadingFinished()
        await createSubTaskModalTestUtils.setFormValues(user, {
          title: fakeWord(),
          description: fakeWord(),
          supportGroup: fakeSupportGroupListItem.name,
          templateX5: fakeTemplate.title,
        })
        await createSubTaskModalTestUtils.clickSubmitButton(user)
        await createSubTaskModalTestUtils.expectLoadingStarted()

        expect(createSubTaskModalTestUtils.supportGroup.getField()).toBeDisabled()
      })

      test('Отображает состояние загрузки во время загрузки групп поддержки', async () => {
        mockGetSupportGroupsSuccess()
        render(<CreateSubTaskModal {...props} />)
        await createSubTaskModalTestUtils.supportGroup.expectLoadingStarted()
      })

      test('Имеет верное количество вариантов', async () => {
        const fakeSupportGroups = [supportGroupsFixtures.supportGroup()]
        mockGetSupportGroupsSuccess({ body: fakeSupportGroups })

        const { user } = render(<CreateSubTaskModal {...props} />)

        await createSubTaskModalTestUtils.supportGroup.expectLoadingFinished()
        await createSubTaskModalTestUtils.supportGroup.openField(user)

        fakeSupportGroups.forEach((opt) => {
          const value = createSubTaskModalTestUtils.supportGroup.getOption(opt.name)
          expect(value).toBeInTheDocument()
        })
      })

      test('Не имеет значения по умолчанию', async () => {
        const fakeSupportGroups = [supportGroupsFixtures.supportGroup()]
        mockGetSupportGroupsSuccess({ body: fakeSupportGroups })

        const { user } = render(<CreateSubTaskModal {...props} />)

        await createSubTaskModalTestUtils.supportGroup.expectLoadingFinished()
        await createSubTaskModalTestUtils.supportGroup.openField(user)

        fakeSupportGroups.forEach((opt) => {
          const value = createSubTaskModalTestUtils.supportGroup.queryValue(opt.name)
          expect(value).not.toBeInTheDocument()
        })
      })

      test('Можно выбрать значение', async () => {
        const fakeSupportGroupListItem = supportGroupsFixtures.supportGroup()
        mockGetSupportGroupsSuccess({ body: [fakeSupportGroupListItem] })

        mockGetSubTaskTemplatesSuccess()

        const { user } = render(<CreateSubTaskModal {...props} />)

        await createSubTaskModalTestUtils.supportGroup.expectLoadingFinished()
        await createSubTaskModalTestUtils.supportGroup.openField(user)
        await createSubTaskModalTestUtils.supportGroup.setValue(user, fakeSupportGroupListItem.name)
        const value = createSubTaskModalTestUtils.supportGroup.getValue(
          fakeSupportGroupListItem.name,
        )

        expect(value).toBeInTheDocument()
      })

      describe('Соответствующая ошибка отображается под полем', () => {
        test('Если не выбрать значение и нажать кнопку отправки', async () => {
          mockGetSupportGroupsSuccess()

          const { user } = render(<CreateSubTaskModal {...props} />)

          await createSubTaskModalTestUtils.clickSubmitButton(user)
          const error = await createSubTaskModalTestUtils.supportGroup.findError(
            validationMessages.required,
          )

          expect(error).toBeInTheDocument()
        })
      })
    })

    describe('Поле сервиса', () => {
      test('Отображается корректно', () => {
        mockGetSupportGroupsSuccess()

        render(<CreateSubTaskModal {...props} />)

        const field = createSubTaskModalTestUtils.service.getField()
        const placeholder = createSubTaskModalTestUtils.service.getPlaceholder()
        const label = createSubTaskModalTestUtils.service.getLabel()

        expect(field).toBeInTheDocument()
        expect(field).toBeDisabled()
        expect(placeholder).toBeInTheDocument()
        expect(label).toBeInTheDocument()
      })

      test('Не активно если не выбрана группа поддержки', async () => {
        mockGetSupportGroupsSuccess()

        render(<CreateSubTaskModal {...props} />)

        expect(createSubTaskModalTestUtils.service.getField()).toBeDisabled()
      })

      test('Не активно во время создания задачи', async () => {
        const fakeSupportGroupListItem = supportGroupsFixtures.supportGroup()
        mockGetSupportGroupsSuccess({ body: [fakeSupportGroupListItem] })

        const fakeTemplate = catalogsFixtures.subTaskTemplateCatalogItem()
        mockGetSubTaskTemplatesSuccess({ body: [fakeTemplate] })

        mockCreateSubTaskSuccess(props.task.id)

        const { user } = render(<CreateSubTaskModal {...props} />, {
          store: getStoreWithAuth(),
        })

        await createSubTaskModalTestUtils.supportGroup.expectLoadingFinished()
        await createSubTaskModalTestUtils.setFormValues(user, {
          title: fakeWord(),
          description: fakeWord(),
          supportGroup: fakeSupportGroupListItem.name,
          templateX5: fakeTemplate.title,
        })
        await createSubTaskModalTestUtils.clickSubmitButton(user)
        const field = createSubTaskModalTestUtils.service.getField()

        expect(field).toBeDisabled()
      })

      test('Становится активным после выбора группы поддержки', async () => {
        const fakeSupportGroupListItem = supportGroupsFixtures.supportGroup()
        mockGetSupportGroupsSuccess({ body: [fakeSupportGroupListItem] })

        mockGetSubTaskTemplatesSuccess({
          body: [catalogsFixtures.subTaskTemplateCatalogItem()],
        })

        const { user } = render(<CreateSubTaskModal {...props} />)

        await createSubTaskModalTestUtils.supportGroup.expectLoadingFinished()
        expect(createSubTaskModalTestUtils.service.getField()).toBeDisabled()

        await createSubTaskModalTestUtils.supportGroup.openField(user)
        await createSubTaskModalTestUtils.supportGroup.setValue(user, fakeSupportGroupListItem.name)
        await createSubTaskModalTestUtils.service.expectLoadingFinished()

        expect(createSubTaskModalTestUtils.service.getField()).toBeEnabled()
      })

      test('Отображает состояние загрузки во время загрузки шаблонов', async () => {
        const fakeSupportGroupListItem = supportGroupsFixtures.supportGroup()
        mockGetSupportGroupsSuccess({ body: [fakeSupportGroupListItem] })

        mockGetSubTaskTemplatesSuccess()

        const { user } = render(<CreateSubTaskModal {...props} />)

        await createSubTaskModalTestUtils.supportGroup.expectLoadingFinished()
        await createSubTaskModalTestUtils.supportGroup.openField(user)
        await createSubTaskModalTestUtils.supportGroup.setValue(user, fakeSupportGroupListItem.name)
        await createSubTaskModalTestUtils.service.expectLoadingStarted()
      })

      test('Имеет верное количество вариантов', async () => {
        const fakeSupportGroupListItem = supportGroupsFixtures.supportGroup()
        mockGetSupportGroupsSuccess({ body: [fakeSupportGroupListItem] })

        const fakeTemplateList = [catalogsFixtures.subTaskTemplateCatalogItem()]
        mockGetSubTaskTemplatesSuccess({ body: fakeTemplateList })

        const { user } = render(<CreateSubTaskModal {...props} />)

        await createSubTaskModalTestUtils.supportGroup.expectLoadingFinished()
        await createSubTaskModalTestUtils.supportGroup.openField(user)
        await createSubTaskModalTestUtils.supportGroup.setValue(user, fakeSupportGroupListItem.name)
        await createSubTaskModalTestUtils.service.expectLoadingFinished()
        await createSubTaskModalTestUtils.service.openField(user)

        fakeTemplateList.forEach((opt) => {
          const value = createSubTaskModalTestUtils.service.getOption(opt.title)
          expect(value).toBeInTheDocument()
        })
      })

      test('Не имеет значения по умолчанию', async () => {
        const fakeSupportGroupListItem = supportGroupsFixtures.supportGroup()
        mockGetSupportGroupsSuccess({ body: [fakeSupportGroupListItem] })

        const fakeTemplateList = [catalogsFixtures.subTaskTemplateCatalogItem()]
        mockGetSubTaskTemplatesSuccess({ body: fakeTemplateList })

        const { user } = render(<CreateSubTaskModal {...props} />)

        await createSubTaskModalTestUtils.supportGroup.expectLoadingFinished()
        await createSubTaskModalTestUtils.supportGroup.openField(user)
        await createSubTaskModalTestUtils.supportGroup.setValue(user, fakeSupportGroupListItem.name)
        await createSubTaskModalTestUtils.service.expectLoadingFinished()
        await createSubTaskModalTestUtils.service.openField(user)

        fakeTemplateList.forEach((opt) => {
          const value = createSubTaskModalTestUtils.service.queryValue(opt.title)
          expect(value).not.toBeInTheDocument()
        })
      })

      test('Можно выбрать значение', async () => {
        const fakeSupportGroupListItem = supportGroupsFixtures.supportGroup()
        mockGetSupportGroupsSuccess({ body: [fakeSupportGroupListItem] })

        const fakeTemplate = catalogsFixtures.subTaskTemplateCatalogItem()
        mockGetSubTaskTemplatesSuccess({ body: [fakeTemplate] })

        const { user } = render(<CreateSubTaskModal {...props} />)

        await createSubTaskModalTestUtils.supportGroup.expectLoadingFinished()
        await createSubTaskModalTestUtils.supportGroup.openField(user)
        await createSubTaskModalTestUtils.supportGroup.setValue(user, fakeSupportGroupListItem.name)
        await createSubTaskModalTestUtils.service.expectLoadingFinished()
        await createSubTaskModalTestUtils.service.openField(user)
        await createSubTaskModalTestUtils.service.setValue(user, fakeTemplate.title)
        const value = createSubTaskModalTestUtils.service.getValue(fakeTemplate.title)

        expect(value).toBeInTheDocument()
      })

      describe('Соответствующая ошибка отображается под полем', () => {
        test('Если не выбрать значение и нажать кнопку отправки', async () => {
          mockGetSupportGroupsSuccess()

          const { user } = render(<CreateSubTaskModal {...props} />)

          await createSubTaskModalTestUtils.clickSubmitButton(user)
          const error = await createSubTaskModalTestUtils.service.findError(
            validationMessages.required,
          )

          expect(error).toBeInTheDocument()
        })
      })
    })

    describe('Поле заголовка', () => {
      test('Отображается корректно', () => {
        mockGetSupportGroupsSuccess()

        render(<CreateSubTaskModal {...props} />)

        const field = createSubTaskModalTestUtils.title.getField()

        expect(field).toBeInTheDocument()
        expect(field).toBeEnabled()
        expect(field).toHaveDisplayValue(props.task.title)
        expect(createSubTaskModalTestUtils.title.getLabel()).toBeInTheDocument()
      })

      test('Можно ввести значение', async () => {
        mockGetSupportGroupsSuccess()

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
        const field = await createSubTaskModalTestUtils.title.setValue(user, value)

        expect(field).toHaveDisplayValue(value)
      })

      describe('Соответствующая ошибка отображается под полем', () => {
        test('Если не ввести значение и нажать кнопку отправки', async () => {
          mockGetSupportGroupsSuccess()

          const { user } = render(
            <CreateSubTaskModal
              {...props}
              task={{
                ...props.task,
                title: '',
              }}
            />,
          )

          await createSubTaskModalTestUtils.clickSubmitButton(user)
          const error = await createSubTaskModalTestUtils.title.findError(
            validationMessages.required,
          )

          expect(error).toBeInTheDocument()
        })

        test('Если ввести только пробелы', async () => {
          mockGetSupportGroupsSuccess()

          const { user } = render(
            <CreateSubTaskModal
              {...props}
              task={{
                ...props.task,
                title: '',
              }}
            />,
          )

          await createSubTaskModalTestUtils.title.setValue(user, ' ')

          expect(
            await createSubTaskModalTestUtils.title.findError(validationMessages.canNotBeEmpty),
          ).toBeInTheDocument()
        })
      })
    })

    describe('Поле описания', () => {
      test('Отображается корректно', () => {
        mockGetSupportGroupsSuccess()

        render(<CreateSubTaskModal {...props} />)

        const field = createSubTaskModalTestUtils.description.getField()

        expect(field).toBeInTheDocument()
        expect(field).toBeEnabled()
        expect(field).toHaveDisplayValue(props.task.description!)
        expect(createSubTaskModalTestUtils.description.getLabel()).toBeInTheDocument()
      })

      test('Можно ввести значение', async () => {
        mockGetSupportGroupsSuccess()

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
        const field = await createSubTaskModalTestUtils.description.setValue(user, value)

        expect(field).toHaveDisplayValue(value)
      })

      describe('Соответствующая ошибка отображается под полем', () => {
        test('Если не ввести значение и нажать кнопку отправки', async () => {
          mockGetSupportGroupsSuccess()

          const { user } = render(
            <CreateSubTaskModal
              {...props}
              task={{
                ...props.task,
                description: '',
              }}
            />,
          )

          await createSubTaskModalTestUtils.clickSubmitButton(user)

          expect(
            await createSubTaskModalTestUtils.description.findError(validationMessages.required),
          ).toBeInTheDocument()
        })

        test('Если ввести только пробелы', async () => {
          mockGetSupportGroupsSuccess()

          const { user } = render(
            <CreateSubTaskModal
              {...props}
              task={{
                ...props.task,
                description: '',
              }}
            />,
          )

          await createSubTaskModalTestUtils.description.setValue(user, ' ')

          expect(
            await createSubTaskModalTestUtils.description.findError(
              validationMessages.canNotBeEmpty,
            ),
          ).toBeInTheDocument()
        })
      })
    })
  })

  describe('Кнопка отправки', () => {
    test('Отображается корректно', () => {
      mockGetSupportGroupsSuccess()
      render(<CreateSubTaskModal {...props} />)

      const button = createSubTaskModalTestUtils.getSubmitButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    // todo: не проходит на CI
    test.skip('Отображает состояние загрузки во время создания задачи', async () => {
      const fakeSupportGroupListItem = supportGroupsFixtures.supportGroup()
      mockGetSupportGroupsSuccess({ body: [fakeSupportGroupListItem] })

      const fakeTemplate = catalogsFixtures.subTaskTemplateCatalogItem()
      mockGetSubTaskTemplatesSuccess({ body: [fakeTemplate] })

      mockCreateSubTaskSuccess(props.task.id)

      const { user } = render(<CreateSubTaskModal {...props} />, {
        store: getStoreWithAuth(),
      })

      await createSubTaskModalTestUtils.supportGroup.expectLoadingFinished()
      await createSubTaskModalTestUtils.setFormValues(user, {
        title: fakeWord(),
        description: fakeWord(),
        supportGroup: fakeSupportGroupListItem.name,
        templateX5: fakeTemplate.title,
      })
      await createSubTaskModalTestUtils.clickSubmitButton(user)
      await createSubTaskModalTestUtils.expectLoadingStarted()
    })
  })

  describe('Кнопка отмены', () => {
    test('Отображается корректно', () => {
      mockGetSupportGroupsSuccess()

      render(<CreateSubTaskModal {...props} />)

      const button = createSubTaskModalTestUtils.getCancelButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Обработчик вызывается корректно', async () => {
      mockGetSupportGroupsSuccess()

      const { user } = render(<CreateSubTaskModal {...props} />)

      await createSubTaskModalTestUtils.clickCancelButton(user)
      expect(props.onCancel).toBeCalled()
    })
  })

  describe('Создание задачи', () => {
    describe('При успешном создании', () => {
      test('Вызывается обработчик закрытия модалки', async () => {
        const fakeSupportGroupListItem = supportGroupsFixtures.supportGroup()
        mockGetSupportGroupsSuccess({ body: [fakeSupportGroupListItem] })

        const fakeTemplate = catalogsFixtures.subTaskTemplateCatalogItem()
        mockGetSubTaskTemplatesSuccess({ body: [fakeTemplate] })

        mockCreateSubTaskSuccess(props.task.id)

        const { user } = render(<CreateSubTaskModal {...props} />, {
          store: getStoreWithAuth(),
        })

        await createSubTaskModalTestUtils.supportGroup.expectLoadingFinished()
        await createSubTaskModalTestUtils.setFormValues(user, {
          title: fakeWord(),
          description: fakeWord(),
          supportGroup: fakeSupportGroupListItem.name,
          templateX5: fakeTemplate.title,
        })
        await createSubTaskModalTestUtils.clickSubmitButton(user)
        await createSubTaskModalTestUtils.expectLoadingFinished()

        await waitFor(() => {
          expect(props.onCancel).toBeCalled()
        })
      })
    })

    describe('При не успешном создании', () => {
      test('Обрабатывается ошибка 400', async () => {
        const fakeSupportGroupListItem = supportGroupsFixtures.supportGroup()
        mockGetSupportGroupsSuccess({ body: [fakeSupportGroupListItem] })

        const fakeTemplate = catalogsFixtures.subTaskTemplateCatalogItem()
        mockGetSubTaskTemplatesSuccess({ body: [fakeTemplate] })

        const badRequestResponse: Required<CreateSubTaskFormErrors> = {
          title: [fakeWord()],
          description: [fakeWord()],
          templateX5: [fakeWord()],
        }
        const detailError = fakeWord()
        mockCreateSubTaskBadRequestError(props.task.id, {
          body: { detail: [detailError], ...badRequestResponse },
        })

        const { user } = render(<CreateSubTaskModal {...props} />, {
          store: getStoreWithAuth(),
        })

        await createSubTaskModalTestUtils.supportGroup.expectLoadingFinished()
        await createSubTaskModalTestUtils.setFormValues(user, {
          title: fakeWord(),
          description: fakeWord(),
          supportGroup: fakeSupportGroupListItem.name,
          templateX5: fakeTemplate.title,
        })
        await createSubTaskModalTestUtils.clickSubmitButton(user)

        expect(
          await createSubTaskModalTestUtils.service.findError(badRequestResponse.templateX5[0]),
        ).toBeInTheDocument()

        expect(
          await createSubTaskModalTestUtils.title.findError(badRequestResponse.title[0]),
        ).toBeInTheDocument()

        expect(
          await createSubTaskModalTestUtils.description.findError(
            badRequestResponse.description[0],
          ),
        ).toBeInTheDocument()

        const notification = await notificationTestUtils.findNotification(detailError)
        expect(notification).toBeInTheDocument()
      })

      test.skip('Обрабатывается ошибка 500', async () => {
        const fakeSupportGroupListItem = supportGroupsFixtures.supportGroup()
        mockGetSupportGroupsSuccess({ body: [fakeSupportGroupListItem] })

        const fakeTemplate = catalogsFixtures.subTaskTemplateCatalogItem()
        mockGetSubTaskTemplatesSuccess({ body: [fakeTemplate] })

        mockCreateSubTaskServerError(props.task.id)

        const { user } = render(<CreateSubTaskModal {...props} />, {
          store: getStoreWithAuth(),
        })

        await createSubTaskModalTestUtils.supportGroup.expectLoadingFinished()
        await createSubTaskModalTestUtils.setFormValues(user, {
          title: fakeWord(),
          description: fakeWord(),
          supportGroup: fakeSupportGroupListItem.name,
          templateX5: fakeTemplate.title,
        })
        await createSubTaskModalTestUtils.clickSubmitButton(user)

        const notification = await notificationTestUtils.findNotification(createSubTaskErrorMessage)
        expect(notification).toBeInTheDocument()
      })
    })
  })

  describe('Список шаблонов', () => {
    describe('При не успешном запросе', () => {
      test('Отображается соответствующее уведомление', async () => {
        const fakeSupportGroupListItem = supportGroupsFixtures.supportGroup()
        mockGetSupportGroupsSuccess({ body: [fakeSupportGroupListItem] })

        mockGetSubTaskTemplatesServerError()

        const { user } = render(<CreateSubTaskModal {...props} />, {
          store: getStoreWithAuth(),
        })

        await createSubTaskModalTestUtils.supportGroup.expectLoadingFinished()
        await createSubTaskModalTestUtils.supportGroup.openField(user)
        await createSubTaskModalTestUtils.supportGroup.setValue(user, fakeSupportGroupListItem.name)

        const notification = await notificationTestUtils.findNotification(
          getSubTaskTemplatesCatalogErrorMessage,
        )
        expect(notification).toBeInTheDocument()
      })
    })
  })

  describe('Список групп поддержки', () => {
    describe('При не успешном запросе', () => {
      test('Отображается соответствующее уведомление', async () => {
        mockGetSupportGroupsServerError()

        render(<CreateSubTaskModal {...props} />, {
          store: getStoreWithAuth(),
        })

        const notification = await notificationTestUtils.findNotification(
          getSupportGroupsErrorMessage,
        )
        expect(notification).toBeInTheDocument()
      })
    })
  })
})
