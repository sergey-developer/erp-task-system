import { screen, waitFor } from '@testing-library/react'

import { testUtils as equipmentTestUtils } from 'modules/warehouse/components/Equipment/Equipment.test'
import { testUtils as equipmentTableTestUtils } from 'modules/warehouse/components/EquipmentTable/EquipmentTable.test'
import { getEquipmentListMessages } from 'modules/warehouse/constants'

import commonFixtures from 'fixtures/common'
import warehouseFixtures from 'fixtures/warehouse'

import {
  mockGetEquipmentListSuccess,
  mockGetEquipmentListForbiddenError,
  mockGetEquipmentListServerError,
} from '_tests_/mocks/api'
import {
  fakeWord,
  findNotification,
  render,
  setupApiTests,
  setupNotifications,
  tableTestUtils,
} from '_tests_/utils'

import EquipmentListPage from './index'

const getContainer = () => screen.getByTestId('equipment-list-page')

export const testUtils = {
  getContainer,
}

setupApiTests()
setupNotifications()

describe('Страница списка оборудования', () => {
  describe('Список оборудования', () => {
    test('При успешном запросе отображается верное количество', async () => {
      const equipmentList = [warehouseFixtures.equipmentListItem()]
      mockGetEquipmentListSuccess({
        body: commonFixtures.paginatedListResponse(equipmentList),
      })

      render(<EquipmentListPage />)

      await equipmentTableTestUtils.expectLoadingFinished()

      equipmentList.forEach((item) => {
        const row = equipmentTableTestUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })

    describe('При не успешном запросе', () => {
      test('Обрабатывается ошибка 403', async () => {
        const errorMessage = fakeWord()
        mockGetEquipmentListForbiddenError({ body: { detail: errorMessage } })

        render(<EquipmentListPage />)

        await equipmentTableTestUtils.expectLoadingFinished()
        const notification = await findNotification(errorMessage)

        expect(notification).toBeInTheDocument()
      })

      test('Обрабатывается ошибка 500', async () => {
        mockGetEquipmentListServerError()
        render(<EquipmentListPage />)

        await equipmentTableTestUtils.expectLoadingFinished()
        const notification = await findNotification(
          getEquipmentListMessages.commonError,
        )

        expect(notification).toBeInTheDocument()
      })
    })

    test('Пагинация работает', async () => {
      const equipmentList = warehouseFixtures.equipmentList(11)
      mockGetEquipmentListSuccess({
        body: commonFixtures.paginatedListResponse(equipmentList),
        once: false,
      })

      const { user } = render(<EquipmentListPage />)

      const table = await equipmentTableTestUtils.expectLoadingFinished()
      await tableTestUtils.clickPaginationNextButtonIn(user, table)
      await equipmentTableTestUtils.expectLoadingStarted()
      await equipmentTableTestUtils.expectLoadingFinished()

      equipmentList.slice(-1).forEach((item) => {
        const row = equipmentTableTestUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })

    test('При клике на строку открывается карточка просмотра оборудования', async () => {
      // todo: вызвать mockGetEquipmentSuccess когда будет готова интеграция
      const equipmentListItem = warehouseFixtures.equipmentListItem()
      mockGetEquipmentListSuccess({
        body: commonFixtures.paginatedListResponse([equipmentListItem]),
      })

      const { user } = render(<EquipmentListPage />)

      await equipmentTableTestUtils.expectLoadingFinished()
      await equipmentTableTestUtils.clickRow(user, equipmentListItem.id)
      const equipment = await equipmentTestUtils.findContainer()

      expect(equipment).toBeInTheDocument()
    })

    test('Можно закрыть карточку просмотра оборудования', async () => {
      const equipmentListItem = warehouseFixtures.equipmentListItem()
      mockGetEquipmentListSuccess({
        body: commonFixtures.paginatedListResponse([equipmentListItem]),
      })

      const { user } = render(<EquipmentListPage />)

      await equipmentTableTestUtils.expectLoadingFinished()
      await equipmentTableTestUtils.clickRow(user, equipmentListItem.id)
      const equipment = await equipmentTestUtils.findContainer()
      await equipmentTestUtils.clickCloseButton(user)

      await waitFor(() => {
        expect(equipment).not.toBeInTheDocument()
      })
    })
  })
})
