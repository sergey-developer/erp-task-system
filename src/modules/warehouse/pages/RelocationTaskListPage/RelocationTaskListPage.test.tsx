import { screen } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { testUtils as relocationTaskListFilterTestUtils } from 'modules/warehouse/components/RelocationTaskListFilter/RelocationTaskListFilter.test'
import { testUtils as relocationTaskTableTestUtils } from 'modules/warehouse/components/RelocationTaskTable/RelocationTaskTable.test'
import {
  getRelocationTaskListMessages,
  relocationTaskStatusDict,
  RelocationTaskStatusEnum,
} from 'modules/warehouse/constants/relocationTask'

import { ariaSortAttrAscValue, ariaSortAttrName } from '_tests_/constants/components'
import commonFixtures from '_tests_/fixtures/common'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import {
  mockGetRelocationTaskListForbiddenError,
  mockGetRelocationTaskListServerError,
  mockGetRelocationTaskListSuccess,
} from '_tests_/mocks/api'
import {
  buttonTestUtils,
  fakeWord,
  notificationTestUtils,
  render,
  setupApiTests,
  tableTestUtils,
} from '_tests_/utils'

import RelocationTaskListPage from './index'

const getContainer = () => screen.getByTestId('relocation-task-list-page')

// filter button
const getFilterButton = () => buttonTestUtils.getButtonIn(getContainer(), /filter/)

const clickFilterButton = async (user: UserEvent) => {
  const button = getFilterButton()
  await user.click(button)
}

export const testUtils = {
  getContainer,

  getFilterButton,
  clickFilterButton,
}

setupApiTests()
notificationTestUtils.setupNotifications()

describe('Страница списка заявок на перемещение оборудования', () => {
  describe('Список заявок на перемещение оборудования', () => {
    test('При успешном запросе отображается корректно', async () => {
      const relocationTaskList = warehouseFixtures.relocationTaskList()
      mockGetRelocationTaskListSuccess({
        body: commonFixtures.paginatedListResponse(relocationTaskList),
      })

      render(<RelocationTaskListPage />)

      await relocationTaskTableTestUtils.expectLoadingFinished()

      relocationTaskList.forEach((item) => {
        const row = relocationTaskTableTestUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })

    describe('При не успешном запросе', () => {
      test('Обрабатывается ошибка 403', async () => {
        const errorMessage = fakeWord()
        mockGetRelocationTaskListForbiddenError({ body: { detail: errorMessage } })

        render(<RelocationTaskListPage />)

        await relocationTaskTableTestUtils.expectLoadingFinished()
        const notification = await notificationTestUtils.findNotification(errorMessage)

        expect(notification).toBeInTheDocument()
      })

      test('Обрабатывается ошибка 500', async () => {
        mockGetRelocationTaskListServerError()
        render(<RelocationTaskListPage />)

        await relocationTaskTableTestUtils.expectLoadingFinished()
        const notification = await notificationTestUtils.findNotification(
          getRelocationTaskListMessages.commonError,
        )

        expect(notification).toBeInTheDocument()
      })
    })

    test('Пагинация работает', async () => {
      const relocationTaskList = warehouseFixtures.relocationTaskList(11)
      mockGetRelocationTaskListSuccess({
        body: commonFixtures.paginatedListResponse(relocationTaskList),
        once: false,
      })

      const { user } = render(<RelocationTaskListPage />)

      const table = await relocationTaskTableTestUtils.expectLoadingFinished()
      await tableTestUtils.clickPaginationNextButtonIn(user, table)
      await relocationTaskTableTestUtils.expectLoadingStarted()
      await relocationTaskTableTestUtils.expectLoadingFinished()

      relocationTaskList.slice(-1).forEach((item) => {
        const row = relocationTaskTableTestUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })

    test('Установлена сортировка по умолчанию', async () => {
      mockGetRelocationTaskListSuccess({
        body: commonFixtures.paginatedListResponse(warehouseFixtures.relocationTaskList()),
        once: false,
      })

      render(<RelocationTaskListPage />)

      await relocationTaskTableTestUtils.expectLoadingFinished()
      const headCell = relocationTaskTableTestUtils.getHeadCell('Срок выполнения')

      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)
    })

    test('Сортировка работает корректно', async () => {
      const relocationTaskList = warehouseFixtures.relocationTaskList()
      mockGetRelocationTaskListSuccess({
        body: commonFixtures.paginatedListResponse(relocationTaskList),
        once: false,
      })

      const { user } = render(<RelocationTaskListPage />)

      await relocationTaskTableTestUtils.expectLoadingFinished()
      await relocationTaskTableTestUtils.clickColTitle(user, 'Объект выбытия')
      await relocationTaskTableTestUtils.expectLoadingStarted()
      await relocationTaskTableTestUtils.expectLoadingFinished()
      const headCell = relocationTaskTableTestUtils.getHeadCell('Объект выбытия')

      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)
      relocationTaskList.forEach((item) => {
        const row = relocationTaskTableTestUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })
  })

  describe('Фильтры', () => {
    describe('Кнопка фильтров', () => {
      test('Отображается корректно', async () => {
        mockGetRelocationTaskListSuccess()
        render(<RelocationTaskListPage />)

        await relocationTaskTableTestUtils.expectLoadingFinished()

        const button = testUtils.getFilterButton()

        expect(button).toBeInTheDocument()
        expect(button).toBeEnabled()
      })

      test('Открывает фильтры', async () => {
        mockGetRelocationTaskListSuccess()
        const { user } = render(<RelocationTaskListPage />)

        await relocationTaskTableTestUtils.expectLoadingFinished()

        await testUtils.clickFilterButton(user)
        const filter = await relocationTaskListFilterTestUtils.findContainer()

        expect(filter).toBeInTheDocument()
      })
    })

    test('Устанавливаются корректные значения по умолчанию', async () => {
      mockGetRelocationTaskListSuccess()

      const { user } = render(<RelocationTaskListPage />)

      await relocationTaskTableTestUtils.expectLoadingFinished()
      await testUtils.clickFilterButton(user)
      await relocationTaskListFilterTestUtils.findContainer()
      await relocationTaskListFilterTestUtils.openStatusSelect(user)
      const selectedStatus1 = relocationTaskListFilterTestUtils.getSelectedStatus(
        relocationTaskStatusDict[RelocationTaskStatusEnum.New],
      )
      const selectedStatus2 = relocationTaskListFilterTestUtils.getSelectedStatus(
        relocationTaskStatusDict[RelocationTaskStatusEnum.Completed],
      )
      const selectedStatus3 = relocationTaskListFilterTestUtils.getSelectedStatus(
        relocationTaskStatusDict[RelocationTaskStatusEnum.Returned],
      )

      expect(selectedStatus1).toBeInTheDocument()
      expect(selectedStatus2).toBeInTheDocument()
      expect(selectedStatus3).toBeInTheDocument()
    })

    test('После применения список отображается корректно', async () => {
      const relocationTaskList = warehouseFixtures.relocationTaskList()
      mockGetRelocationTaskListSuccess({
        body: commonFixtures.paginatedListResponse(relocationTaskList),
        once: false,
      })

      const { user } = render(<RelocationTaskListPage />)

      await relocationTaskTableTestUtils.expectLoadingFinished()
      await testUtils.clickFilterButton(user)
      await relocationTaskListFilterTestUtils.findContainer()
      await relocationTaskListFilterTestUtils.openStatusSelect(user)
      await relocationTaskListFilterTestUtils.setStatus(
        user,
        relocationTaskStatusDict[RelocationTaskStatusEnum.Canceled],
      )
      await relocationTaskListFilterTestUtils.clickApplyButton(user)

      await relocationTaskTableTestUtils.expectLoadingStarted()
      await relocationTaskTableTestUtils.expectLoadingFinished()

      relocationTaskList.forEach((item) => {
        const row = relocationTaskTableTestUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })
  })
})
