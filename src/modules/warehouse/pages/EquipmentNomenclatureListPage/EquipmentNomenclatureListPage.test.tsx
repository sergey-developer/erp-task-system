import { screen } from '@testing-library/react'

import { testUtils as equipmentNomenclatureTableTestUtils } from 'modules/warehouse/components/EquipmentNomenclatureTable/EquipmentNomenclatureTable.test'
import { getEquipmentNomenclaturesErrMsg } from 'modules/warehouse/constants/equipment'
import { WarehouseRouteEnum } from 'modules/warehouse/constants/routes'

import commonFixtures from '_tests_/fixtures/common'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import {
  mockGetEquipmentNomenclaturesForbiddenError,
  mockGetEquipmentNomenclaturesServerError,
  mockGetEquipmentNomenclaturesSuccess,
} from '_tests_/mocks/api'
import {
  fakeWord,
  notificationTestUtils,
  renderInRoute_latest,
  setupApiTests,
  tableTestUtils,
} from '_tests_/utils'

import EquipmentNomenclatureListPage from './index'

const getContainer = () => screen.getByTestId('equipment-nomenclature-list-page')

const findContainer = (): Promise<HTMLElement> =>
  screen.findByTestId('equipment-nomenclature-list-page')

export const testUtils = {
  getContainer,
  findContainer,
}

setupApiTests()
notificationTestUtils.setupNotifications()

describe('Страница списка номенклатуры оборудования', () => {
  describe('Список номенклатуры оборудования', () => {
    test('При успешном запросе отображается верное количество', async () => {
      const equipmentNomenclatureList = [warehouseFixtures.equipmentNomenclatureListItem()]

      mockGetEquipmentNomenclaturesSuccess({
        body: commonFixtures.paginatedListResponse(equipmentNomenclatureList),
      })

      renderInRoute_latest(
        [
          {
            path: WarehouseRouteEnum.EquipmentNomenclatures,
            element: <EquipmentNomenclatureListPage />,
          },
        ],
        { initialEntries: [WarehouseRouteEnum.EquipmentNomenclatures] },
      )

      await equipmentNomenclatureTableTestUtils.expectLoadingFinished()

      equipmentNomenclatureList.forEach((item) => {
        const row = equipmentNomenclatureTableTestUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })

    describe('При не успешном запросе', () => {
      test('Обрабатывается ошибка 403', async () => {
        const errorMessage = fakeWord()
        mockGetEquipmentNomenclaturesForbiddenError({
          body: { detail: errorMessage },
        })

        renderInRoute_latest(
          [
            {
              path: WarehouseRouteEnum.EquipmentNomenclatures,
              element: <EquipmentNomenclatureListPage />,
            },
          ],
          { initialEntries: [WarehouseRouteEnum.EquipmentNomenclatures] },
        )

        await equipmentNomenclatureTableTestUtils.expectLoadingFinished()
        const notification = await notificationTestUtils.findNotification(errorMessage)

        expect(notification).toBeInTheDocument()
      })

      test('Обрабатывается ошибка 500', async () => {
        mockGetEquipmentNomenclaturesServerError()

        renderInRoute_latest(
          [
            {
              path: WarehouseRouteEnum.EquipmentNomenclatures,
              element: <EquipmentNomenclatureListPage />,
            },
          ],
          { initialEntries: [WarehouseRouteEnum.EquipmentNomenclatures] },
        )

        await equipmentNomenclatureTableTestUtils.expectLoadingFinished()
        const notification = await notificationTestUtils.findNotification(
          getEquipmentNomenclaturesErrMsg,
        )

        expect(notification).toBeInTheDocument()
      })
    })

    test('Пагинация работает', async () => {
      const equipmentNomenclatureList = warehouseFixtures.equipmentNomenclatures(11)

      mockGetEquipmentNomenclaturesSuccess({
        body: commonFixtures.paginatedListResponse(equipmentNomenclatureList),
        once: false,
      })

      const { user } = renderInRoute_latest(
        [
          {
            path: WarehouseRouteEnum.EquipmentNomenclatures,
            element: <EquipmentNomenclatureListPage />,
          },
        ],
        { initialEntries: [WarehouseRouteEnum.EquipmentNomenclatures] },
      )

      const table = await equipmentNomenclatureTableTestUtils.expectLoadingFinished()
      await tableTestUtils.clickPaginationNextButtonIn(user, table)
      await equipmentNomenclatureTableTestUtils.expectLoadingStarted()
      await equipmentNomenclatureTableTestUtils.expectLoadingFinished()

      equipmentNomenclatureList.slice(-1).forEach((item) => {
        const row = equipmentNomenclatureTableTestUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })
  })
})
