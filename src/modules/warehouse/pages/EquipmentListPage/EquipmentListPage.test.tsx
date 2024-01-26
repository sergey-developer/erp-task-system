import { screen, waitFor } from '@testing-library/react'

import { testUtils as equipmentDetailsTestUtils } from 'modules/warehouse/components/EquipmentDetails/EquipmentDetails.test'
import { testUtils as equipmentTableTestUtils } from 'modules/warehouse/components/EquipmentTable/EquipmentTable.test'
import { getEquipmentsErrorMsg } from 'modules/warehouse/constants/equipment'

import { ariaSortAttrAscValue, ariaSortAttrName } from '_tests_/constants/components'
import commonFixtures from '_tests_/fixtures/common'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import {
  mockGetEquipmentListForbiddenError,
  mockGetEquipmentListServerError,
  mockGetEquipmentListSuccess,
  mockGetEquipmentSuccess,
} from '_tests_/mocks/api'
import {
  fakeWord,
  notificationTestUtils,
  render,
  setupApiTests,
  tableTestUtils,
} from '_tests_/utils'

import EquipmentListPage from './index'

const getContainer = () => screen.getByTestId('equipment-list-page')

export const testUtils = {
  getContainer,
}

setupApiTests()
notificationTestUtils.setupNotifications()

describe('Страница списка оборудования', () => {
  describe('Список оборудования', () => {
    test('При успешном запросе отображается корректно', async () => {
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
        const notification = await notificationTestUtils.findNotification(errorMessage)

        expect(notification).toBeInTheDocument()
      })

      test('Обрабатывается ошибка 500', async () => {
        mockGetEquipmentListServerError()
        render(<EquipmentListPage />)

        await equipmentTableTestUtils.expectLoadingFinished()
        const notification = await notificationTestUtils.findNotification(getEquipmentsErrorMsg)

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

    test('Установлена сортировка по умолчанию', async () => {
      mockGetEquipmentListSuccess({
        body: commonFixtures.paginatedListResponse(warehouseFixtures.equipmentList()),
        once: false,
      })

      render(<EquipmentListPage />)

      await equipmentTableTestUtils.expectLoadingFinished()
      const headCell = equipmentTableTestUtils.getHeadCell('Наименование')

      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)
    })

    test('Сортировка работает корректно', async () => {
      const equipmentList = warehouseFixtures.equipmentList()
      mockGetEquipmentListSuccess({
        body: commonFixtures.paginatedListResponse(equipmentList),
        once: false,
      })

      const { user } = render(<EquipmentListPage />)

      await equipmentTableTestUtils.expectLoadingFinished()
      await equipmentTableTestUtils.clickColTitle(user, 'Серийный номер')
      await equipmentTableTestUtils.expectLoadingStarted()
      await equipmentTableTestUtils.expectLoadingFinished()
      const headCell = equipmentTableTestUtils.getHeadCell('Серийный номер')

      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)
      equipmentList.forEach((item) => {
        const row = equipmentTableTestUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })
  })

  describe('Карточка просмотра оборудования', () => {
    test('Открывается по клику на строку таблицы', async () => {
      const equipmentListItem = warehouseFixtures.equipmentListItem()
      mockGetEquipmentListSuccess({
        body: commonFixtures.paginatedListResponse([equipmentListItem]),
      })

      mockGetEquipmentSuccess(equipmentListItem.id, {
        body: warehouseFixtures.equipment({ id: equipmentListItem.id }),
      })

      const { user } = render(<EquipmentListPage />)

      await equipmentTableTestUtils.expectLoadingFinished()
      await equipmentTableTestUtils.clickRow(user, equipmentListItem.id)
      const equipment = await equipmentDetailsTestUtils.findContainer()

      expect(equipment).toBeInTheDocument()
    })

    test('Открывается по данным из search params', async () => {
      const fakeEquipmentId = 1
      jest.spyOn(URLSearchParams.prototype, 'get').mockImplementation(() => String(fakeEquipmentId))

      mockGetEquipmentListSuccess()
      mockGetEquipmentSuccess(fakeEquipmentId)

      render(<EquipmentListPage />)

      const equipment = await equipmentDetailsTestUtils.findContainer()
      expect(equipment).toBeInTheDocument()
    })

    test('Закрывается', async () => {
      const equipmentListItem = warehouseFixtures.equipmentListItem()
      mockGetEquipmentListSuccess({
        body: commonFixtures.paginatedListResponse([equipmentListItem]),
      })

      mockGetEquipmentSuccess(equipmentListItem.id, {
        body: warehouseFixtures.equipment({ id: equipmentListItem.id }),
      })

      const { user } = render(<EquipmentListPage />)

      await equipmentTableTestUtils.expectLoadingFinished()
      await equipmentTableTestUtils.clickRow(user, equipmentListItem.id)
      const equipment = await equipmentDetailsTestUtils.findContainer()
      await equipmentDetailsTestUtils.clickCloseButton(user)

      await waitFor(() => {
        expect(equipment).not.toBeInTheDocument()
      })
    })
  })
})
