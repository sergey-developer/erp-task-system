import { getEquipmentListPageLink } from 'features/equipments/helpers'
import EquipmentsPage from 'features/equipments/pages/EquipmentsPage'

import {
  equipmentNomenclatureListItem,
  props,
} from '_tests_/features/warehouse/components/EquipmentNomenclatureTable/constants'
import { equipmentNomenclatureTableTestUtils } from '_tests_/features/warehouse/components/EquipmentNomenclatureTable/testUtils'
import { equipmentListPageTestUtils } from '_tests_/features/warehouse/pages/EquipmentListPage/testUtils'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import { mockGetEquipmentListSuccess } from '_tests_/mocks/api'
import { renderWithRouter, setupApiTests, tableTestUtils } from '_tests_/utils'

import EquipmentNomenclatureTable from './index'

afterEach(() => {
  const onChange = props.onChange as jest.Mock
  onChange.mockReset()
})

setupApiTests()

describe('Таблица номенклатуры оборудования', () => {
  test('Отображается корректно', () => {
    renderWithRouter(
      [
        {
          path: WarehousesRoutesEnum.EquipmentNomenclatures,
          element: <EquipmentNomenclatureTable {...props} />,
        },
      ],
      { initialEntries: [WarehousesRoutesEnum.EquipmentNomenclatures] },
    )

    const table = equipmentNomenclatureTableTestUtils.getContainer()

    expect(table).toBeInTheDocument()
    tableTestUtils.expectPaginationEnabledIn(table)

    props.dataSource.forEach((item) => {
      const row = equipmentNomenclatureTableTestUtils.getRow(item.id)
      expect(row).toBeInTheDocument()
    })
  })

  test('Пагинация работает', async () => {
    const equipmentNomenclatures = warehouseFixtures.equipmentNomenclatures(11)

    const { user } = renderWithRouter(
      [
        {
          path: WarehousesRoutesEnum.EquipmentNomenclatures,
          element: <EquipmentNomenclatureTable {...props} dataSource={equipmentNomenclatures} />,
        },
      ],
      { initialEntries: [WarehousesRoutesEnum.EquipmentNomenclatures] },
    )

    const table = equipmentNomenclatureTableTestUtils.getContainer()
    await tableTestUtils.clickPaginationNextButtonIn(user, table)

    expect(props.onChange).toBeCalledTimes(1)
    expect(props.onChange).toBeCalledWith(
      expect.anything(),
      expect.anything(),
      expect.anything(),
      expect.anything(),
    )
    equipmentNomenclatures.slice(-1).forEach((item) => {
      const row = equipmentNomenclatureTableTestUtils.getRow(item.id)
      expect(row).toBeInTheDocument()
    })
  })

  describe('Наименование', () => {
    test('Отображается корректно', () => {
      renderWithRouter(
        [
          {
            path: WarehousesRoutesEnum.EquipmentNomenclatures,
            element: <EquipmentNomenclatureTable {...props} />,
          },
        ],
        { initialEntries: [WarehousesRoutesEnum.EquipmentNomenclatures] },
      )

      const title = equipmentNomenclatureTableTestUtils.getColTitle('Наименование')
      const link = equipmentNomenclatureTableTestUtils.getTitleLink(
        equipmentNomenclatureListItem.id,
        equipmentNomenclatureListItem.title,
      )

      expect(title).toBeInTheDocument()
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute(
        'href',
        getEquipmentListPageLink({
          id: equipmentNomenclatureListItem.id,
          title: equipmentNomenclatureListItem.title,
        }),
      )
    })

    test('При клике переходит на страницу списка оборудования', async () => {
      mockGetEquipmentListSuccess()

      const { user } = renderWithRouter(
        [
          {
            path: WarehousesRoutesEnum.EquipmentNomenclatures,
            element: <EquipmentNomenclatureTable {...props} />,
          },
          {
            path: WarehousesRoutesEnum.Equipments,
            element: <EquipmentsPage />,
          },
        ],
        { initialEntries: [WarehousesRoutesEnum.EquipmentNomenclatures] },
      )

      await equipmentNomenclatureTableTestUtils.clickTitleLink(
        user,
        equipmentNomenclatureListItem.id,
        equipmentNomenclatureListItem.title,
      )

      const page = equipmentListPageTestUtils.getContainer()
      expect(page).toBeInTheDocument()
    })
  })

  describe('Количество оборудования', () => {
    test('Отображается корректно', () => {
      renderWithRouter(
        [
          {
            path: WarehousesRoutesEnum.EquipmentNomenclatures,
            element: <EquipmentNomenclatureTable {...props} />,
          },
        ],
        { initialEntries: [WarehousesRoutesEnum.EquipmentNomenclatures] },
      )

      const title = equipmentNomenclatureTableTestUtils.getColTitle('Количество оборудования')
      const value = equipmentNomenclatureTableTestUtils.getColValue(
        equipmentNomenclatureListItem.id,
        equipmentNomenclatureListItem.quantity,
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })
  })
})
