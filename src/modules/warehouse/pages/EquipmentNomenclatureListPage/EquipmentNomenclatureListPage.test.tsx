import { screen } from '@testing-library/react'

import { RouteEnum } from 'configs/routes'

import { testUtils as equipmentNomenclatureTableTestUtils } from 'modules/warehouse/components/EquipmentNomenclatureTable/EquipmentNomenclatureTable.test'
import { getEquipmentNomenclatureListMessages } from 'modules/warehouse/constants'

import commonFixtures from 'fixtures/common'
import warehouseFixtures from 'fixtures/warehouse'

import {
  mockGetEquipmentNomenclatureListForbiddenError,
  mockGetEquipmentNomenclatureListServerError,
  mockGetEquipmentNomenclatureListSuccess,
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

      mockGetEquipmentNomenclatureListSuccess({
        body: commonFixtures.paginatedListResponse(equipmentNomenclatureList),
      })

      renderInRoute_latest(
        [
          {
            path: RouteEnum.EquipmentNomenclatureList,
            element: <EquipmentNomenclatureListPage />,
          },
        ],
        { initialEntries: [RouteEnum.EquipmentNomenclatureList] },
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
        mockGetEquipmentNomenclatureListForbiddenError({
          body: { detail: errorMessage },
        })

        renderInRoute_latest(
          [
            {
              path: RouteEnum.EquipmentNomenclatureList,
              element: <EquipmentNomenclatureListPage />,
            },
          ],
          { initialEntries: [RouteEnum.EquipmentNomenclatureList] },
        )

        await equipmentNomenclatureTableTestUtils.expectLoadingFinished()
        const notification = await notificationTestUtils.findNotification(errorMessage)

        expect(notification).toBeInTheDocument()
      })

      test('Обрабатывается ошибка 500', async () => {
        mockGetEquipmentNomenclatureListServerError()

        renderInRoute_latest(
          [
            {
              path: RouteEnum.EquipmentNomenclatureList,
              element: <EquipmentNomenclatureListPage />,
            },
          ],
          { initialEntries: [RouteEnum.EquipmentNomenclatureList] },
        )

        await equipmentNomenclatureTableTestUtils.expectLoadingFinished()
        const notification = await notificationTestUtils.findNotification(
          getEquipmentNomenclatureListMessages.commonError,
        )

        expect(notification).toBeInTheDocument()
      })
    })

    test('Пагинация работает', async () => {
      const equipmentNomenclatureList = warehouseFixtures.equipmentNomenclatureList(11)

      mockGetEquipmentNomenclatureListSuccess({
        body: commonFixtures.paginatedListResponse(equipmentNomenclatureList),
        once: false,
      })

      const { user } = renderInRoute_latest(
        [
          {
            path: RouteEnum.EquipmentNomenclatureList,
            element: <EquipmentNomenclatureListPage />,
          },
        ],
        { initialEntries: [RouteEnum.EquipmentNomenclatureList] },
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
