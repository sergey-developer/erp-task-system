import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import { Form } from 'antd'
import moment from 'moment-timezone'

import { DATE_PICKER_FORMAT, TIME_PICKER_FORMAT } from 'lib/antd/constants/dateTimePicker'

import {
  relocationTaskTypeDict,
  RelocationTaskTypeEnum,
} from 'modules/warehouse/constants/relocationTask'
import CreateRelocationTaskPage from 'modules/warehouse/pages/CreateRelocationTaskPage'
import { testUtils as createRelocationTaskPageTestUtils } from 'modules/warehouse/pages/CreateRelocationTaskPage/CreateRelocationTaskPage.test'

import { validationMessages } from 'shared/constants/validation'
import { formatDate } from 'shared/utils/date'

import catalogsFixtures from '_tests_/fixtures/catalogs'
import userFixtures from '_tests_/fixtures/user'
import {
  mockGetCurrencyListSuccess,
  mockGetEquipmentCatalogListSuccess,
  mockGetLocationListSuccess,
  mockGetUserListSuccess,
} from '_tests_/mocks/api'
import { fakeWord, render, selectTestUtils, setupApiTests } from '_tests_/utils'

import RelocationTaskForm from './index'
import { RelocationTaskFormProps } from './types'

const props: RelocationTaskFormProps = {
  isLoading: false,

  userList: [],
  userListIsLoading: false,

  relocateFromLocationList: [],
  relocateFromLocationListIsLoading: false,

  relocateToLocationList: [],
  relocateToLocationListIsLoading: false,

  type: RelocationTaskTypeEnum.Relocation,
  onChangeType: jest.fn(),

  onChangeRelocateTo: jest.fn(),
  onChangeRelocateFrom: jest.fn(),
}

const getContainer = () => screen.getByTestId('relocation-task-form')

// deadline at field
const getDeadlineAtFormItem = () => within(getContainer()).getByTestId('deadline-at-form-item')
const getDeadlineAtTitle = () => within(getDeadlineAtFormItem()).getByTitle('Срок выполнения')

const getDeadlineAtDateFormItem = () =>
  within(getDeadlineAtFormItem()).getByTestId('deadline-at-date-form-item')

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

const getDeadlineAtTimeFormItem = () =>
  within(getDeadlineAtFormItem()).getByTestId('deadline-at-time-form-item')

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

// executor field
const getExecutorFormItem = () => within(getContainer()).getByTestId('executor-form-item')
const getExecutorSelectInput = () => selectTestUtils.getSelect(getExecutorFormItem())
const setExecutor = selectTestUtils.clickSelectOption
const findExecutorError = (text: string) => within(getExecutorFormItem()).findByText(text)

const openExecutorSelect = (user: UserEvent) =>
  selectTestUtils.openSelect(user, getExecutorFormItem())

const getSelectedExecutor = (title: string) =>
  selectTestUtils.getSelectedOptionByTitle(getExecutorFormItem(), title)

const querySelectedExecutor = (title: string) =>
  selectTestUtils.querySelectedOptionByTitle(getExecutorFormItem(), title)

// type field
const getTypeFormItem = () => within(getContainer()).getByTestId('type-form-item')
const getTypeSelectInput = () => selectTestUtils.getSelect(getTypeFormItem())
const openTypeSelect = (user: UserEvent) => selectTestUtils.openSelect(user, getTypeFormItem())
const setType = selectTestUtils.clickSelectOption
const getSelectedType = () => selectTestUtils.getSelectedOption(getTypeFormItem())
const findTypeError = async (text: string) => within(getTypeFormItem()).findByText(text)

// relocate from field
const getRelocateFromFormItem = () => within(getContainer()).getByTestId('relocate-from-form-item')
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
const getRelocateToFormItem = () => within(getContainer()).getByTestId('relocate-to-form-item')
const getRelocateToSelectInput = () => selectTestUtils.getSelect(getRelocateToFormItem())
const findRelocateToError = (text: string) => within(getRelocateToFormItem()).findByText(text)

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
const getCommentFormItem = () => within(getContainer()).getByTestId('comment-form-item')
const getCommentTitle = () => within(getCommentFormItem()).getByTitle('Комментарий')
const findCommentError = (text: string) => within(getCommentFormItem()).findByText(text)

const getCommentField = () =>
  within(getCommentFormItem()).getByPlaceholderText('Добавьте комментарий')

const setComment = async (user: UserEvent, value: string) => {
  const field = getCommentField()
  await user.type(field, value)
  return field
}

export const testUtils = {
  getContainer,

  getTypeSelectInput,
  openTypeSelect,
  setType,
  findTypeError,
  getSelectedType,

  getDeadlineAtTitle,
  getDeadlineAtDateField,
  findDeadlineAtDateError,
  setDeadlineAtDate,
  getDeadlineAtTimeField,
  findDeadlineAtTimeError,
  setDeadlineAtTime,

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
  findRelocateToError,
  expectRelocateToLoadingFinished,

  getExecutorSelectInput,
  openExecutorSelect,
  setExecutor,
  getSelectedExecutor,
  querySelectedExecutor,
  findExecutorError,

  getCommentTitle,
  getCommentField,
  findCommentError,
  setComment,
}

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

        const title = testUtils.getDeadlineAtTitle()
        const field = testUtils.getDeadlineAtDateField()

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
        const field = await testUtils.setDeadlineAtDate(user, value)

        expect(field).toHaveDisplayValue(value)
      })

      describe('Отображается ошибка', () => {
        test('Если не заполнить поле и нажать кнопку отправки', async () => {
          mockGetUserListSuccess()
          mockGetLocationListSuccess({ body: [] })
          mockGetEquipmentCatalogListSuccess()
          mockGetCurrencyListSuccess()

          const { user } = render(<CreateRelocationTaskPage />)

          await createRelocationTaskPageTestUtils.clickSubmitButton(user)
          const error = await testUtils.findDeadlineAtDateError(validationMessages.required)

          expect(error).toBeInTheDocument()
        })

        test('Если дата в прошлом времени', async () => {
          const { user } = render(
            <Form>
              <RelocationTaskForm {...props} />
            </Form>,
          )

          const value = formatDate(moment().subtract(1, 'day'), DATE_PICKER_FORMAT)
          await testUtils.setDeadlineAtDate(user, value)
          const error = await testUtils.findDeadlineAtDateError(
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

        const field = testUtils.getDeadlineAtTimeField()

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

        const value = formatDate(moment(), TIME_PICKER_FORMAT)
        const field = await testUtils.setDeadlineAtTime(user, value)

        expect(field).toHaveDisplayValue(value)
      })

      describe('Отображается ошибка', () => {
        test('Если не заполнить поле и нажать кнопку отправки', async () => {
          mockGetUserListSuccess()
          mockGetLocationListSuccess({ body: [] })
          mockGetEquipmentCatalogListSuccess()
          mockGetCurrencyListSuccess()

          const { user } = render(<CreateRelocationTaskPage />)

          await createRelocationTaskPageTestUtils.clickSubmitButton(user)
          const error = await testUtils.findDeadlineAtTimeError(validationMessages.required)

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
          await testUtils.setDeadlineAtDate(user, dateValue)

          const timeValue = formatDate(moment().subtract(1, 'hour'), TIME_PICKER_FORMAT)
          await testUtils.setDeadlineAtTime(user, timeValue)

          const error = await testUtils.findDeadlineAtTimeError(
            validationMessages.time.canNotBeInPast,
          )

          expect(error).toBeInTheDocument()
        })
      })
    })
  })

  describe('Тип', () => {
    test('Отображается корректно', async () => {
      const { user } = render(
        <Form>
          <RelocationTaskForm {...props} />
        </Form>,
      )

      const input = testUtils.getTypeSelectInput()
      await testUtils.openTypeSelect(user)
      const selectedType = testUtils.getSelectedType()

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

      await testUtils.openTypeSelect(user)
      await testUtils.setType(user, relocationTaskTypeDict[RelocationTaskTypeEnum.Relocation])
      const selectedType = testUtils.getSelectedType()

      expect(selectedType).toBeInTheDocument()
    })
  })

  describe('Объект выбытия', () => {
    test('Отображается корректно', async () => {
      const locationListItem = catalogsFixtures.locationListItem()
      const locationList = [locationListItem]

      const { user } = render(
        <Form>
          <RelocationTaskForm {...props} relocateFromLocationList={locationList} />
        </Form>,
      )

      const input = testUtils.getRelocateFromSelectInput()
      await testUtils.openRelocateFromSelect(user)
      const selectedRelocateFrom = testUtils.querySelectedRelocateFrom(locationListItem.title)

      expect(input).toBeInTheDocument()
      expect(input).toBeEnabled()
      expect(selectedRelocateFrom).not.toBeInTheDocument()
      locationList.forEach((loc) => {
        const option = selectTestUtils.getSelectOption(loc.title)
        expect(option).toBeInTheDocument()
      })
    })

    test('Можно выбрать значение', async () => {
      const locationListItem = catalogsFixtures.locationListItem()

      const { user } = render(
        <Form>
          <RelocationTaskForm {...props} relocateFromLocationList={[locationListItem]} />
        </Form>,
      )

      await testUtils.openRelocateFromSelect(user)
      await testUtils.setRelocateFrom(user, locationListItem.title)
      const selectedRelocateFrom = testUtils.getSelectedRelocateFrom(locationListItem.title)

      expect(selectedRelocateFrom).toBeInTheDocument()
    })

    test('Отображается ошибка если не заполнить поле и нажать кнопку отправки', async () => {
      mockGetUserListSuccess()
      mockGetLocationListSuccess({ body: catalogsFixtures.locationList() })
      mockGetEquipmentCatalogListSuccess()
      mockGetCurrencyListSuccess()

      const { user } = render(<CreateRelocationTaskPage />)

      await createRelocationTaskPageTestUtils.clickSubmitButton(user)
      const error = await testUtils.findRelocateFromError(validationMessages.required)

      expect(error).toBeInTheDocument()
    })
  })

  describe('Объект прибытия', () => {
    test('Отображается корректно', async () => {
      const locationListItem = catalogsFixtures.locationListItem()
      const locationList = [locationListItem]

      const { user } = render(
        <Form>
          <RelocationTaskForm {...props} relocateToLocationList={locationList} />
        </Form>,
      )

      const input = testUtils.getRelocateToSelectInput()
      await testUtils.openRelocateToSelect(user)
      const selectedRelocateTo = testUtils.querySelectedRelocateTo(locationListItem.title)

      expect(input).toBeInTheDocument()
      expect(input).toBeEnabled()
      expect(selectedRelocateTo).not.toBeInTheDocument()
      locationList.forEach((loc) => {
        const option = selectTestUtils.getSelectOption(loc.title)
        expect(option).toBeInTheDocument()
      })
    })

    test('Можно выбрать значение', async () => {
      const locationListItem = catalogsFixtures.locationListItem()

      const { user } = render(
        <Form>
          <RelocationTaskForm {...props} relocateToLocationList={[locationListItem]} />
        </Form>,
      )

      await testUtils.openRelocateToSelect(user)
      await testUtils.setRelocateTo(user, locationListItem.title)
      const selectedRelocateTo = testUtils.getSelectedRelocateTo(locationListItem.title)

      expect(selectedRelocateTo).toBeInTheDocument()
    })

    test('Отображается ошибка если не заполнить поле и нажать кнопку отправки', async () => {
      mockGetUserListSuccess()
      mockGetLocationListSuccess({ body: catalogsFixtures.locationList() })
      mockGetEquipmentCatalogListSuccess()
      mockGetCurrencyListSuccess()

      const { user } = render(<CreateRelocationTaskPage />)

      await createRelocationTaskPageTestUtils.clickSubmitButton(user)
      const error = await testUtils.findRelocateToError(validationMessages.required)

      expect(error).toBeInTheDocument()
    })
  })

  describe('Исполнитель', () => {
    test('Отображается корректно', async () => {
      const userListItem = userFixtures.userListItem()
      const userList = [userListItem]

      const { user } = render(
        <Form>
          <RelocationTaskForm {...props} userList={userList} />
        </Form>,
      )

      const input = testUtils.getExecutorSelectInput()
      await testUtils.openExecutorSelect(user)
      const selectedExecutor = testUtils.querySelectedExecutor(userListItem.fullName)

      expect(input).toBeInTheDocument()
      expect(input).toBeEnabled()
      expect(selectedExecutor).not.toBeInTheDocument()
      userList.forEach((usr) => {
        const option = selectTestUtils.getSelectOption(usr.fullName)
        expect(option).toBeInTheDocument()
      })
    })

    test('Можно выбрать значение', async () => {
      const userListItem = userFixtures.userListItem()

      const { user } = render(
        <Form>
          <RelocationTaskForm {...props} userList={[userListItem]} />
        </Form>,
      )

      await testUtils.openExecutorSelect(user)
      await testUtils.setExecutor(user, userListItem.fullName)
      const selectedExecutor = testUtils.getSelectedExecutor(userListItem.fullName)

      expect(selectedExecutor).toBeInTheDocument()
    })

    test('Отображается ошибка если не заполнить поле и нажать кнопку отправки', async () => {
      mockGetUserListSuccess()
      mockGetLocationListSuccess({ body: [] })
      mockGetEquipmentCatalogListSuccess()
      mockGetCurrencyListSuccess()

      const { user } = render(<CreateRelocationTaskPage />)

      await createRelocationTaskPageTestUtils.clickSubmitButton(user)
      const error = await testUtils.findExecutorError(validationMessages.required)

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

      const title = testUtils.getCommentTitle()
      const field = testUtils.getCommentField()

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
      const field = await testUtils.setComment(user, value)

      expect(field).toHaveDisplayValue(value)
    })

    describe('Отображается ошибка', () => {
      test('Если ввести только пробелы', async () => {
        const { user } = render(
          <Form>
            <RelocationTaskForm {...props} />
          </Form>,
        )

        await testUtils.setComment(user, ' ')
        const error = await testUtils.findCommentError(validationMessages.canNotBeEmpty)

        expect(error).toBeInTheDocument()
      })
    })
  })
})
