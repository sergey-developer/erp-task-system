import { screen, waitFor } from '@testing-library/react'

import {
  blockTestIds as equipmentBlocksTestIds,
  testUtils as equipmentTestUtils,
} from 'modules/warehouse/components/Equipment/Equipment.test'
import * as equipmentPageContext from 'modules/warehouse/components/EquipmentPageLayout/context'
import { testUtils as equipmentTableTestUtils } from 'modules/warehouse/components/EquipmentTable/EquipmentTable.test'
import {
  EquipmentCategoryEnum,
  getEquipmentListMessages,
} from 'modules/warehouse/constants/equipment'

import { ariaSortAttrAscValue, ariaSortAttrName } from '_tests_/constants/components'
import commonFixtures from '_tests_/fixtures/common'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import {
  mockGetEquipmentListForbiddenError,
  mockGetEquipmentListServerError,
  mockGetEquipmentListSuccess,
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
afterEach(() => {
  jest.restoreAllMocks()
})

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
        const notification = await notificationTestUtils.findNotification(
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
    test('Можно открыть', async () => {
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

    test('Можно закрыть', async () => {
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

    test('Отображается информация оборудования', async () => {
      const equipmentListItem = warehouseFixtures.equipmentListItem()
      mockGetEquipmentListSuccess({
        body: commonFixtures.paginatedListResponse([equipmentListItem]),
      })

      const equipment = warehouseFixtures.equipment({
        id: equipmentListItem.id,
        nomenclature: warehouseFixtures.nomenclature({
          equipmentHasSerialNumber: true,
        }),
      })

      const contextSpy = jest.spyOn(equipmentPageContext, 'useEquipmentPageContext')
      contextSpy.mockReturnValue({
        equipment,
        equipmentIsLoading: false,
        onClickEditEquipment: jest.fn(),
        getEquipment: jest.fn(),
      })

      const { user } = render(<EquipmentListPage />)

      await equipmentTableTestUtils.expectLoadingFinished()
      await equipmentTableTestUtils.clickRow(user, equipmentListItem.id)
      await equipmentTestUtils.findContainer()
      await equipmentTestUtils.expectLoadingFinished()

      equipmentBlocksTestIds.forEach((id) => {
        const block = equipmentTestUtils.getBlock(id)
        expect(block).toBeInTheDocument()
      })
    })

    test(`Отображается информация для категории ${EquipmentCategoryEnum.Consumable}`, async () => {
      const equipmentListItem = warehouseFixtures.equipmentListItem()
      mockGetEquipmentListSuccess({
        body: commonFixtures.paginatedListResponse([equipmentListItem]),
      })

      const equipment = warehouseFixtures.equipment({
        id: equipmentListItem.id,
        category: warehouseFixtures.equipmentCategory({
          code: EquipmentCategoryEnum.Consumable,
        }),
        nomenclature: warehouseFixtures.nomenclature({
          equipmentHasSerialNumber: true,
        }),
      })

      const contextSpy = jest.spyOn(equipmentPageContext, 'useEquipmentPageContext')
      contextSpy.mockReturnValue({
        equipment,
        equipmentIsLoading: false,
        onClickEditEquipment: jest.fn(),
        getEquipment: jest.fn(),
      })

      const { user } = render(<EquipmentListPage />)

      await equipmentTableTestUtils.expectLoadingFinished()
      await equipmentTableTestUtils.clickRow(user, equipmentListItem.id)
      await equipmentTestUtils.findContainer()
      await equipmentTestUtils.expectLoadingFinished()

      const hiddenBlocksTestIds = [
        'customer-inventory-number',
        'inventory-number',
        'is-new',
        'is-warranty',
        'is-repaired',
        'usage-counter',
        'owner',
      ]

      const shownBlocksTestIds = equipmentBlocksTestIds.filter(
        (id) => !hiddenBlocksTestIds.includes(id),
      )

      shownBlocksTestIds.forEach((id) => {
        const block = equipmentTestUtils.getBlock(id)
        expect(block).toBeInTheDocument()
      })

      hiddenBlocksTestIds.forEach((id) => {
        const block = equipmentTestUtils.queryBlock(id)
        expect(block).not.toBeInTheDocument()
      })
    })
  })
})
