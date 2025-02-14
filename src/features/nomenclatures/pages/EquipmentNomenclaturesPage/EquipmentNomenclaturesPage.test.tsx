import { getEquipmentNomenclaturesErrorMessage } from 'features/equipments/api/constants'
import { WarehouseRouteEnum } from 'features/warehouse/constants/routes'

import { equipmentNomenclatureTableTestUtils } from '_tests_/features/warehouse/components/EquipmentNomenclatureTable/testUtils'
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
  renderWithRouter,
  setupApiTests,
  tableTestUtils,
} from '_tests_/utils'

import EquipmentNomenclaturesPage from './index'

setupApiTests()
notificationTestUtils.setupNotifications()

describe('Страница списка номенклатуры оборудования', () => {
  describe('Список номенклатуры оборудования', () => {
    test('При успешном запросе отображается верное количество', async () => {
      const equipmentNomenclatures = [warehouseFixtures.equipmentNomenclatureListItem()]

      mockGetEquipmentNomenclaturesSuccess({
        body: commonFixtures.paginatedListResponse(equipmentNomenclatures),
      })

      renderWithRouter(
        [
          {
            path: WarehouseRouteEnum.EquipmentNomenclatures,
            element: <EquipmentNomenclaturesPage />,
          },
        ],
        { initialEntries: [WarehouseRouteEnum.EquipmentNomenclatures] },
      )

      await equipmentNomenclatureTableTestUtils.expectLoadingFinished()

      equipmentNomenclatures.forEach((item) => {
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

        renderWithRouter(
          [
            {
              path: WarehouseRouteEnum.EquipmentNomenclatures,
              element: <EquipmentNomenclaturesPage />,
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

        renderWithRouter(
          [
            {
              path: WarehouseRouteEnum.EquipmentNomenclatures,
              element: <EquipmentNomenclaturesPage />,
            },
          ],
          { initialEntries: [WarehouseRouteEnum.EquipmentNomenclatures] },
        )

        await equipmentNomenclatureTableTestUtils.expectLoadingFinished()
        const notification = await notificationTestUtils.findNotification(
          getEquipmentNomenclaturesErrorMessage,
        )

        expect(notification).toBeInTheDocument()
      })
    })

    test.skip('Пагинация работает', async () => {
      const equipmentNomenclatures = warehouseFixtures.equipmentNomenclatures(11)

      mockGetEquipmentNomenclaturesSuccess({
        body: commonFixtures.paginatedListResponse(equipmentNomenclatures),
        once: false,
      })

      const { user } = renderWithRouter(
        [
          {
            path: WarehouseRouteEnum.EquipmentNomenclatures,
            element: <EquipmentNomenclaturesPage />,
          },
        ],
        { initialEntries: [WarehouseRouteEnum.EquipmentNomenclatures] },
      )

      const table = await equipmentNomenclatureTableTestUtils.expectLoadingFinished()
      await tableTestUtils.clickPaginationNextButtonIn(user, table)
      await equipmentNomenclatureTableTestUtils.expectLoadingStarted()
      await equipmentNomenclatureTableTestUtils.expectLoadingFinished()

      equipmentNomenclatures.slice(-1).forEach((item) => {
        const row = equipmentNomenclatureTableTestUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })
  })
})
