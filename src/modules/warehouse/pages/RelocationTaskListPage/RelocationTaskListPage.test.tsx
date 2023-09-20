import { screen } from '@testing-library/react'

import { testUtils as relocationTaskTableTestUtils } from 'modules/warehouse/components/RelocationTaskTable/RelocationTaskTable.test'
import { getRelocationTaskListMessages } from 'modules/warehouse/constants/relocationTask'

import { ariaSortAttrAscValue, ariaSortAttrName } from '_tests_/constants/components'
import commonFixtures from '_tests_/fixtures/common'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import {
  mockGetRelocationTaskListForbiddenError,
  mockGetRelocationTaskListServerError,
  mockGetRelocationTaskListSuccess,
} from '_tests_/mocks/api'
import {
  fakeWord,
  notificationTestUtils,
  render,
  setupApiTests,
  tableTestUtils,
} from '_tests_/utils'

import RelocationTaskListPage from './index'

const getContainer = () => screen.getByTestId('relocation-task-list-page')

export const testUtils = {
  getContainer,
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
})
