import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { WarehouseRouteEnum } from 'modules/warehouse/constants/routes'
import EquipmentListPage from 'modules/warehouse/pages/EquipmentListPage'
import { testUtils as equipmentListPageTestUtils } from 'modules/warehouse/pages/EquipmentListPage/EquipmentListPage.test'
import { getEquipmentListPageLink } from 'modules/warehouse/utils/equipment'

import { IdType } from 'shared/types/common'
import { MaybeNull, NumberOrString } from 'shared/types/utils'

import warehouseFixtures from '_tests_/fixtures/warehouse'
import { mockGetEquipmentListSuccess } from '_tests_/mocks/api'
import { linkTestUtils, renderWithRouter, setupApiTests, tableTestUtils } from '_tests_/utils'

import EquipmentNomenclatureTable from './index'
import { EquipmentNomenclatureTableProps } from './types'

const equipmentNomenclatureListItem = warehouseFixtures.equipmentNomenclatureListItem()

const props: Readonly<EquipmentNomenclatureTableProps> = {
  dataSource: [equipmentNomenclatureListItem],
  pagination: {},
  loading: false,
  onChange: jest.fn(),
}

const getContainer = () => screen.getByTestId('equipment-nomenclature-table')

const getRow = (id: IdType) => tableTestUtils.getRowById(getContainer(), id)

const getColTitle = (text: string) => within(getContainer()).getByText(text)

const getColValue = (id: IdType, value: NumberOrString): MaybeNull<HTMLElement> => {
  const row = getRow(id)
  return row ? within(row).getByText(value) : null
}

// title
const getTitleLink = (id: IdType, title: string): MaybeNull<HTMLElement> => {
  const row = getRow(id)
  return row ? linkTestUtils.getLinkIn(row, title) : null
}

const clickTitleLink = async (user: UserEvent, id: IdType, title: string) => {
  const link = getTitleLink(id, title)

  if (link) {
    await user.click(link)
  }
}

// loading
const expectLoadingStarted = () => tableTestUtils.expectLoadingStarted(getContainer())

const expectLoadingFinished = async (): Promise<HTMLElement> => {
  const container = getContainer()
  await tableTestUtils.expectLoadingFinished(container)
  return container
}

export const testUtils = {
  getContainer,
  getRow,
  getColTitle,
  getColValue,

  getTitleLink,
  clickTitleLink,

  expectLoadingStarted,
  expectLoadingFinished,
}

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
          path: WarehouseRouteEnum.EquipmentNomenclatures,
          element: <EquipmentNomenclatureTable {...props} />,
        },
      ],
      { initialEntries: [WarehouseRouteEnum.EquipmentNomenclatures] },
    )

    const table = testUtils.getContainer()

    expect(table).toBeInTheDocument()
    tableTestUtils.expectPaginationEnabledIn(table)

    props.dataSource.forEach((item) => {
      const row = testUtils.getRow(item.id)
      expect(row).toBeInTheDocument()
    })
  })

  test('Пагинация работает', async () => {
    const equipmentNomenclatureList = warehouseFixtures.equipmentNomenclatures(11)

    const { user } = renderWithRouter(
      [
        {
          path: WarehouseRouteEnum.EquipmentNomenclatures,
          element: <EquipmentNomenclatureTable {...props} dataSource={equipmentNomenclatureList} />,
        },
      ],
      { initialEntries: [WarehouseRouteEnum.EquipmentNomenclatures] },
    )

    const table = testUtils.getContainer()
    await tableTestUtils.clickPaginationNextButtonIn(user, table)

    expect(props.onChange).toBeCalledTimes(1)
    expect(props.onChange).toBeCalledWith(
      expect.anything(),
      expect.anything(),
      expect.anything(),
      expect.anything(),
    )
    equipmentNomenclatureList.slice(-1).forEach((item) => {
      const row = testUtils.getRow(item.id)
      expect(row).toBeInTheDocument()
    })
  })

  describe('Наименование', () => {
    test('Отображается корректно', () => {
      renderWithRouter(
        [
          {
            path: WarehouseRouteEnum.EquipmentNomenclatures,
            element: <EquipmentNomenclatureTable {...props} />,
          },
        ],
        { initialEntries: [WarehouseRouteEnum.EquipmentNomenclatures] },
      )

      const title = testUtils.getColTitle('Наименование')
      const link = testUtils.getTitleLink(
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
            path: WarehouseRouteEnum.EquipmentNomenclatures,
            element: <EquipmentNomenclatureTable {...props} />,
          },
          {
            path: WarehouseRouteEnum.Equipments,
            element: <EquipmentListPage />,
          },
        ],
        { initialEntries: [WarehouseRouteEnum.EquipmentNomenclatures] },
      )

      await testUtils.clickTitleLink(
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
            path: WarehouseRouteEnum.EquipmentNomenclatures,
            element: <EquipmentNomenclatureTable {...props} />,
          },
        ],
        { initialEntries: [WarehouseRouteEnum.EquipmentNomenclatures] },
      )

      const title = testUtils.getColTitle('Количество оборудования')
      const value = testUtils.getColValue(
        equipmentNomenclatureListItem.id,
        equipmentNomenclatureListItem.quantity,
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })
  })
})
