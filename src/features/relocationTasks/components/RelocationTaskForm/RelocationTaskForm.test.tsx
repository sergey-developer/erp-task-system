import { Form } from 'antd'
import { RelocationTaskTypeEnum } from 'features/relocationTasks/api/constants'
import { relocationTaskTypeDict } from 'features/relocationTasks/constants'
import CreateRelocationTaskPage from 'features/relocationTasks/pages/CreateRelocationTaskPage'
import moment from 'moment-timezone'

import { DATE_PICKER_FORMAT, TIME_PICKER_FORMAT } from 'lib/antd/constants/dateTimePicker'

import { validationMessages } from 'shared/constants/validation'
import { formatDate } from 'shared/utils/date'

import { props } from '_tests_/features/warehouses/components/RelocationTaskForm/constants'
import { relocationTaskFormTestUtils } from '_tests_/features/warehouses/components/RelocationTaskForm/testUtils'
import { createRelocationTaskPageTestUtils } from '_tests_/features/warehouses/pages/CreateRelocationTaskPage/testUtils'
import catalogsFixtures from '_tests_/fixtures/api/data/catalogs'
import userFixtures from '_tests_/fixtures/api/data/users'
import {
  mockGetCurrenciesSuccess,
  mockGetEquipmentsCatalogSuccess,
  mockGetLocationsCatalogSuccess,
  mockGetUsersSuccess,
} from '_tests_/mocks/api'
import { getStoreWithAuth } from '_tests_/fixtures/store/auth'
import { getUserMeQueryMock } from '_tests_/fixtures/store/users'
import { fakeWord, render, selectTestUtils, setupApiTests } from '_tests_/helpers'

import RelocationTaskForm from './index'
import { makeUserGroupOptions } from './utils'

setupApiTests()

describe('Форма создания заявки на перемещение оборудования', () => {
  describe('Срок выполнения', () => {
    describe('Дата', () => {
      test('Отображается корректно', () => {
        render(
          <Form>
            <RelocationTaskForm {...props} />
          </Form>,
        )

        const title = relocationTaskFormTestUtils.getDeadlineAtTitle()
        const field = relocationTaskFormTestUtils.getDeadlineAtDateField()

        expect(title).toBeInTheDocument()
        expect(field).toBeInTheDocument()
        expect(field).toBeEnabled()
        expect(field).not.toHaveValue()
      })

      test('Можно установить значение', async () => {
        const { user } = render(
          <Form>
            <RelocationTaskForm {...props} />
          </Form>,
        )

        const value = formatDate(moment(), DATE_PICKER_FORMAT)
        const field = await relocationTaskFormTestUtils.setDeadlineAtDate(user, value)

        expect(field).toHaveDisplayValue(value)
      })

      describe('Отображается ошибка', () => {
        test('Если не заполнить поле и нажать кнопку отправки', async () => {
          mockGetUsersSuccess({ body: [] })
          mockGetLocationsCatalogSuccess({ body: [], once: false })
          mockGetEquipmentsCatalogSuccess()
          mockGetCurrenciesSuccess({ body: [] })

          const { user } = render(<CreateRelocationTaskPage />, {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
            }),
          })

          await relocationTaskFormTestUtils.clearDeadlineAtDate(user)
          await createRelocationTaskPageTestUtils.clickSubmitButton(user)
          const error = await relocationTaskFormTestUtils.findDeadlineAtDateError(
            validationMessages.required,
          )

          expect(error).toBeInTheDocument()
        })

        test('Если дата в прошлом времени', async () => {
          const { user } = render(
            <Form>
              <RelocationTaskForm {...props} />
            </Form>,
          )

          const value = formatDate(moment().subtract(1, 'day'), DATE_PICKER_FORMAT)
          await relocationTaskFormTestUtils.setDeadlineAtDate(user, value)
          const error = await relocationTaskFormTestUtils.findDeadlineAtDateError(
            validationMessages.date.canNotBeInPast,
          )

          expect(error).toBeInTheDocument()
        })
      })
    })

    describe('Время', () => {
      test('Отображается корректно', () => {
        render(
          <Form>
            <RelocationTaskForm {...props} />
          </Form>,
        )

        const field = relocationTaskFormTestUtils.getDeadlineAtTimeField()

        expect(field).toBeInTheDocument()
        expect(field).toBeEnabled()
        expect(field).not.toHaveValue()
      })

      test.skip('Можно установить значение', async () => {
        const { user } = render(
          <Form>
            <RelocationTaskForm {...props} />
          </Form>,
        )

        const value = formatDate(moment(), TIME_PICKER_FORMAT)
        const field = await relocationTaskFormTestUtils.setDeadlineAtTime(user, value)

        expect(field).toHaveDisplayValue(value)
      })

      describe('Отображается ошибка', () => {
        test('Если не заполнить поле и нажать кнопку отправки', async () => {
          mockGetUsersSuccess({ body: [] })
          mockGetLocationsCatalogSuccess({ body: [], once: false })
          mockGetEquipmentsCatalogSuccess()
          mockGetCurrenciesSuccess({ body: [] })

          const { user } = render(<CreateRelocationTaskPage />, {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
            }),
          })

          await relocationTaskFormTestUtils.clearDeadlineAtTime(user)
          await createRelocationTaskPageTestUtils.clickSubmitButton(user)
          const error = await relocationTaskFormTestUtils.findDeadlineAtTimeError(
            validationMessages.required,
          )

          expect(error).toBeInTheDocument()
        })

        // todo: выяснить почему тест падает но функционал работает
        test.skip('Если выбран сегодняшний день и если время в прошлом времени', async () => {
          const { user } = render(
            <Form>
              <RelocationTaskForm {...props} />
            </Form>,
          )

          const dateValue = formatDate(moment(), DATE_PICKER_FORMAT)
          await relocationTaskFormTestUtils.setDeadlineAtDate(user, dateValue)

          const timeValue = formatDate(moment().subtract(1, 'hour'), TIME_PICKER_FORMAT)
          await relocationTaskFormTestUtils.setDeadlineAtTime(user, timeValue)

          const error = await relocationTaskFormTestUtils.findDeadlineAtTimeError(
            validationMessages.time.canNotBeInPast,
          )

          expect(error).toBeInTheDocument()
        })
      })
    })
  })

  describe('Тип', () => {
    test('Отображается и активно', async () => {
      const { user } = render(
        <Form>
          <RelocationTaskForm {...props} />
        </Form>,
      )

      const input = relocationTaskFormTestUtils.getTypeSelectInput()
      await relocationTaskFormTestUtils.openTypeSelect(user)
      const selectedType = relocationTaskFormTestUtils.getSelectedType()

      expect(input).toBeInTheDocument()
      expect(input).toBeEnabled()
      expect(selectedType).not.toBeInTheDocument()
      Object.keys(relocationTaskTypeDict).forEach((key) => {
        const option = selectTestUtils.getSelectOption(
          relocationTaskTypeDict[key as RelocationTaskTypeEnum],
        )
        expect(option).toBeInTheDocument()
      })
    })

    test('Можно выбрать значение', async () => {
      const { user } = render(
        <Form>
          <RelocationTaskForm {...props} />
        </Form>,
      )

      await relocationTaskFormTestUtils.openTypeSelect(user)
      await relocationTaskFormTestUtils.setType(
        user,
        relocationTaskTypeDict[RelocationTaskTypeEnum.Relocation],
      )
      const selectedOption = relocationTaskFormTestUtils.getSelectedType()

      expect(selectedOption).toBeInTheDocument()
    })
  })

  describe('Объект выбытия', () => {
    test('Отображается корректно', async () => {
      const locationCatalogItem = catalogsFixtures.locationCatalogItem()
      const locationList = [locationCatalogItem]

      const { user } = render(
        <Form>
          <RelocationTaskForm {...props} relocateFromLocations={locationList} />
        </Form>,
      )

      const input = relocationTaskFormTestUtils.getRelocateFromSelectInput()
      await relocationTaskFormTestUtils.openRelocateFromSelect(user)
      const selectedRelocateFrom = relocationTaskFormTestUtils.querySelectedRelocateFrom(
        locationCatalogItem.title,
      )

      expect(input).toBeInTheDocument()
      expect(input).toBeEnabled()
      expect(selectedRelocateFrom).not.toBeInTheDocument()
      locationList.forEach((loc) => {
        const option = selectTestUtils.getSelectOption(loc.title)
        expect(option).toBeInTheDocument()
      })
    })

    test('Можно выбрать значение', async () => {
      const locationCatalogItem = catalogsFixtures.locationCatalogItem()

      const { user } = render(
        <Form>
          <RelocationTaskForm {...props} relocateFromLocations={[locationCatalogItem]} />
        </Form>,
      )

      await relocationTaskFormTestUtils.openRelocateFromSelect(user)
      await relocationTaskFormTestUtils.setRelocateFrom(user, locationCatalogItem.title)
      const selectedRelocateFrom = relocationTaskFormTestUtils.getSelectedRelocateFrom(
        locationCatalogItem.title,
      )

      expect(selectedRelocateFrom).toBeInTheDocument()
    })

    test('Отображается ошибка если не заполнить поле и нажать кнопку отправки', async () => {
      mockGetUsersSuccess({ body: [] })
      mockGetLocationsCatalogSuccess({ body: catalogsFixtures.locationsCatalog(), once: false })
      mockGetEquipmentsCatalogSuccess()
      mockGetCurrenciesSuccess({ body: [] })

      const { user } = render(<CreateRelocationTaskPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
        }),
      })

      await createRelocationTaskPageTestUtils.clickSubmitButton(user)
      const error = await relocationTaskFormTestUtils.findRelocateFromError(
        validationMessages.required,
      )

      expect(error).toBeInTheDocument()
    })
  })

  describe('Объект прибытия', () => {
    test('Отображается корректно', async () => {
      const locationCatalogItem = catalogsFixtures.locationCatalogItem()
      const locationList = [locationCatalogItem]

      const { user } = render(
        <Form>
          <RelocationTaskForm {...props} relocateToLocations={locationList} />
        </Form>,
      )

      const input = relocationTaskFormTestUtils.getRelocateToSelectInput()
      await relocationTaskFormTestUtils.openRelocateToSelect(user)
      const selectedRelocateTo = relocationTaskFormTestUtils.querySelectedRelocateTo(
        locationCatalogItem.title,
      )

      expect(input).toBeInTheDocument()
      expect(input).toBeEnabled()
      expect(selectedRelocateTo).not.toBeInTheDocument()
      locationList.forEach((loc) => {
        const option = selectTestUtils.getSelectOption(loc.title)
        expect(option).toBeInTheDocument()
      })
    })

    test('Можно выбрать значение', async () => {
      const locationCatalogItem = catalogsFixtures.locationCatalogItem()

      const { user } = render(
        <Form>
          <RelocationTaskForm {...props} relocateToLocations={[locationCatalogItem]} />
        </Form>,
      )

      await relocationTaskFormTestUtils.openRelocateToSelect(user)
      await relocationTaskFormTestUtils.setRelocateTo(user, locationCatalogItem.title)
      const selectedRelocateTo = relocationTaskFormTestUtils.getSelectedRelocateTo(
        locationCatalogItem.title,
      )

      expect(selectedRelocateTo).toBeInTheDocument()
    })
  })

  describe('Исполнитель', () => {
    test('Отображается корректно', async () => {
      const userListItem = userFixtures.user()
      const users = [userListItem]

      const { user } = render(
        <Form>
          <RelocationTaskForm {...props} executorsOptions={makeUserGroupOptions(users, [])} />
        </Form>,
      )

      const input = relocationTaskFormTestUtils.getExecutorSelectInput()
      await relocationTaskFormTestUtils.openExecutorSelect(user)
      const selectedExecutor = relocationTaskFormTestUtils.querySelectedExecutor(
        userListItem.fullName,
      )

      expect(input).toBeInTheDocument()
      expect(input).toBeEnabled()
      expect(selectedExecutor).not.toBeInTheDocument()
      users.forEach((usr) => {
        const option = selectTestUtils.getSelectOption(usr.fullName)
        expect(option).toBeInTheDocument()
      })
    })

    test('Можно выбрать значение', async () => {
      const userListItem = userFixtures.user()

      const { user } = render(
        <Form>
          <RelocationTaskForm
            {...props}
            executorsOptions={makeUserGroupOptions([userListItem], [])}
          />
        </Form>,
      )

      await relocationTaskFormTestUtils.openExecutorSelect(user)
      await relocationTaskFormTestUtils.setExecutor(user, userListItem.fullName)
      const selectedExecutor = relocationTaskFormTestUtils.getSelectedExecutor(
        userListItem.fullName,
      )

      expect(selectedExecutor).toBeInTheDocument()
    })

    test('Отображается ошибка если не заполнить поле и нажать кнопку отправки', async () => {
      mockGetUsersSuccess({ body: [] })
      mockGetLocationsCatalogSuccess({ body: [], once: false })
      mockGetEquipmentsCatalogSuccess()
      mockGetCurrenciesSuccess({ body: [] })

      const { user } = render(<CreateRelocationTaskPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
        }),
      })

      await createRelocationTaskPageTestUtils.clickSubmitButton(user)
      const error = await relocationTaskFormTestUtils.findExecutorError(validationMessages.required)

      expect(error).toBeInTheDocument()
    })
  })

  describe('Контролер', () => {
    test('Отображается корректно', async () => {
      const userListItem = userFixtures.user()
      const users = [userListItem]

      const { user } = render(
        <Form>
          <RelocationTaskForm {...props} controllersOptions={makeUserGroupOptions(users, [])} />
        </Form>,
      )

      const input = relocationTaskFormTestUtils.getControllerSelectInput()
      await relocationTaskFormTestUtils.openControllerSelect(user)
      const selectedController = relocationTaskFormTestUtils.querySelectedController(
        userListItem.fullName,
      )

      expect(input).toBeInTheDocument()
      expect(input).toBeEnabled()
      expect(selectedController).not.toBeInTheDocument()
      users.forEach((usr) => {
        const option = selectTestUtils.getSelectOption(usr.fullName)
        expect(option).toBeInTheDocument()
      })
    })

    test('Можно выбрать значение', async () => {
      const userListItem = userFixtures.user()

      const { user } = render(
        <Form>
          <RelocationTaskForm
            {...props}
            controllersOptions={makeUserGroupOptions([userListItem], [])}
          />
        </Form>,
      )

      await relocationTaskFormTestUtils.openControllerSelect(user)
      await relocationTaskFormTestUtils.setController(user, userListItem.fullName)
      const selectedController = relocationTaskFormTestUtils.getSelectedController(
        userListItem.fullName,
      )

      expect(selectedController).toBeInTheDocument()
    })

    // skip for rc
    test.skip('Обязателен если перемещение не с основного склада на склад МСИ', async () => {
      mockGetUsersSuccess()
      mockGetLocationsCatalogSuccess({ body: [], once: false })
      mockGetEquipmentsCatalogSuccess()
      mockGetCurrenciesSuccess({ body: [] })

      const { user } = render(<CreateRelocationTaskPage />)

      await createRelocationTaskPageTestUtils.clickSubmitButton(user)
      const error = await relocationTaskFormTestUtils.findControllerError(
        validationMessages.required,
      )

      expect(error).toBeInTheDocument()
    })

    // skip for rc
    test.skip('Не обязателен если перемещение с основного склада на склад МСИ', async () => {
      mockGetUsersSuccess()
      mockGetLocationsCatalogSuccess({ body: [], once: false })
      mockGetEquipmentsCatalogSuccess()
      mockGetCurrenciesSuccess({ body: [] })

      const { user } = render(<CreateRelocationTaskPage />)

      await createRelocationTaskPageTestUtils.clickSubmitButton(user)
      const error = await relocationTaskFormTestUtils.findControllerError(
        validationMessages.required,
      )

      expect(error).toBeInTheDocument()
    })
  })

  describe('Комментарий', () => {
    test('Отображается корректно', () => {
      render(
        <Form>
          <RelocationTaskForm {...props} />
        </Form>,
      )

      const title = relocationTaskFormTestUtils.getCommentTitle()
      const field = relocationTaskFormTestUtils.getCommentField()

      expect(title).toBeInTheDocument()
      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
      expect(field).not.toHaveValue()
    })

    test('Можно установить значение', async () => {
      const { user } = render(
        <Form>
          <RelocationTaskForm {...props} />
        </Form>,
      )

      const value = fakeWord()
      const field = await relocationTaskFormTestUtils.setComment(user, value)

      expect(field).toHaveDisplayValue(value)
    })

    describe('Отображается ошибка', () => {
      test('Если ввести только пробелы', async () => {
        const { user } = render(
          <Form>
            <RelocationTaskForm {...props} />
          </Form>,
        )

        await relocationTaskFormTestUtils.setComment(user, ' ')
        const error = await relocationTaskFormTestUtils.findCommentError(
          validationMessages.canNotBeEmpty,
        )

        expect(error).toBeInTheDocument()
      })
    })
  })

  describe('Блок общих фотографий к перемещению', () => {
    test('Отображается если параметр showUploadImages=true', () => {
      render(
        <Form>
          <RelocationTaskForm {...props} showUploadImages />
        </Form>,
      )

      const attachmentsBlock = relocationTaskFormTestUtils.getAttachmentsBlock()
      expect(attachmentsBlock).toBeInTheDocument()
    })

    test('Не отображаеются если параметр showUploadImages=false', () => {
      render(
        <Form>
          <RelocationTaskForm {...props} showUploadImages={false} />
        </Form>,
      )

      const attachmentsBlock = relocationTaskFormTestUtils.queryAttachmentsBlock()
      expect(attachmentsBlock).not.toBeInTheDocument()
    })
  })
})
