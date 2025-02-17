import { getEquipmentNomenclaturesErrorMessage } from 'features/equipments/api/constants'
import { WarehousesRoutesEnum } from 'features/warehouses/routes/routes'

import { equipmentNomenclatureTableTestUtils } from '_tests_/features/warehouses/components/EquipmentNomenclatureTable/testUtils'
import commonFixtures from '_tests_/fixtures/api/common'
import equipmentsFixtures from '_tests_/fixtures/api/data/equipments'
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
} from '_tests_/helpers'

import EquipmentNomenclaturesPage from './index'

setupApiTests()
notificationTestUtils.setupNotifications()

describe('Страница списка номенклатуры оборудования', () => {
  describe('Список номенклатуры оборудования', () => {
    test('При успешном запросе отображается верное количество', async () => {
      const equipmentNomenclatures = [equipmentsFixtures.equipmentNomenclatureListItem()]

      mockGetEquipmentNomenclaturesSuccess({
        body: commonFixtures.paginatedListResponse(equipmentNomenclatures),
      })

      renderWithRouter(
        [
          {
            path: WarehousesRoutesEnum.EquipmentNomenclatures,
            element: <EquipmentNomenclaturesPage />,
          },
        ],
        { initialEntries: [WarehousesRoutesEnum.EquipmentNomenclatures] },
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
              path: WarehousesRoutesEnum.EquipmentNomenclatures,
              element: <EquipmentNomenclaturesPage />,
            },
          ],
          { initialEntries: [WarehousesRoutesEnum.EquipmentNomenclatures] },
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
              path: WarehousesRoutesEnum.EquipmentNomenclatures,
              element: <EquipmentNomenclaturesPage />,
            },
          ],
          { initialEntries: [WarehousesRoutesEnum.EquipmentNomenclatures] },
        )

        await equipmentNomenclatureTableTestUtils.expectLoadingFinished()
        const notification = await notificationTestUtils.findNotification(
          getEquipmentNomenclaturesErrorMessage,
        )

        expect(notification).toBeInTheDocument()
      })
    })

    test.skip('Пагинация работает', async () => {
      const equipmentNomenclatures = equipmentsFixtures.equipmentNomenclatures(11)

      mockGetEquipmentNomenclaturesSuccess({
        body: commonFixtures.paginatedListResponse(equipmentNomenclatures),
        once: false,
      })

      const { user } = renderWithRouter(
        [
          {
            path: WarehousesRoutesEnum.EquipmentNomenclatures,
            element: <EquipmentNomenclaturesPage />,
          },
        ],
        { initialEntries: [WarehousesRoutesEnum.EquipmentNomenclatures] },
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
