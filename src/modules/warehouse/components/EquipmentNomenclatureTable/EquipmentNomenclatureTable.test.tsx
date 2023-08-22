import { screen, within } from '@testing-library/react'

import { RouteEnum } from 'configs/routes'

import { MaybeNull } from 'shared/types/utils'

import warehouseFixtures from 'fixtures/warehouse'

import { renderInRoute_latest, tableTestUtils } from '_tests_/utils'

import EquipmentNomenclatureTable from './index'
import {
  EquipmentNomenclatureTableProps,
  EquipmentNomenclatureTableItem,
} from './types'

const equipmentNomenclatureListItem =
  warehouseFixtures.equipmentNomenclatureListItem()

const props: Readonly<EquipmentNomenclatureTableProps> = {
  dataSource: [equipmentNomenclatureListItem],
  loading: false,
  onChange: jest.fn(),
}

const getContainer = () => screen.getByTestId('equipment-nomenclature-table')

const getChildByText = (text: string) => within(getContainer()).getByText(text)

const getRow = (id: EquipmentNomenclatureTableItem['id']) =>
  tableTestUtils.getRowIn(getContainer(), id)

const getColTitle = getChildByText

const getColValue = (
  id: EquipmentNomenclatureTableItem['id'],
  value: string,
): MaybeNull<HTMLElement> => {
  const row = getRow(id)
  return row ? within(row).getByText(value) : null
}

// loading
const expectLoadingStarted = () =>
  tableTestUtils.expectLoadingStarted(getContainer())

const expectLoadingFinished = () =>
  tableTestUtils.expectLoadingFinished(getContainer())

export const testUtils = {
  getContainer,
  getRow,
  getChildByText,
  getColTitle,
  getColValue,

  expectLoadingStarted,
  expectLoadingFinished,
}

afterEach(() => {
  const onChange = props.onChange as jest.Mock
  onChange.mockReset()
})

describe('Таблица номенклатуры оборудования', () => {
  test('Отображается', () => {
    renderInRoute_latest(
      [
        {
          path: RouteEnum.EquipmentNomenclatureList,
          element: <EquipmentNomenclatureTable {...props} />,
        },
      ],
      { initialEntries: [RouteEnum.EquipmentNomenclatureList] },
    )

    const table = testUtils.getContainer()

    expect(table).toBeInTheDocument()
    tableTestUtils.expectPaginationEnabled(table)

    props.dataSource.forEach((item) => {
      const row = testUtils.getRow(item.id)
      expect(row).toBeInTheDocument()
    })
  })

  describe('Наименование', () => {
    test('Отображается', () => {
      renderInRoute_latest(
        [
          {
            path: RouteEnum.EquipmentNomenclatureList,
            element: <EquipmentNomenclatureTable {...props} />,
          },
        ],
        { initialEntries: [RouteEnum.EquipmentNomenclatureList] },
      )

      const title = testUtils.getColTitle('Наименование')
      const value = testUtils.getColValue(
        equipmentNomenclatureListItem.id,
        equipmentNomenclatureListItem.title,
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })
  })

  describe('Количество оборудования', () => {
    test('Отображается', () => {
      renderInRoute_latest(
        [
          {
            path: RouteEnum.EquipmentNomenclatureList,
            element: <EquipmentNomenclatureTable {...props} />,
          },
        ],
        { initialEntries: [RouteEnum.EquipmentNomenclatureList] },
      )

      const title = testUtils.getColTitle('Количество оборудования')
      const value = testUtils.getColValue(
        equipmentNomenclatureListItem.id,
        String(equipmentNomenclatureListItem.quantity),
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })
  })
})
