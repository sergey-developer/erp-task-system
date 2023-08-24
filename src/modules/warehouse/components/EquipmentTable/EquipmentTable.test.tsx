import { screen, within } from '@testing-library/react'

import { RouteEnum } from 'configs/routes'

import { equipmentConditionDict } from 'modules/warehouse/constants'

import { MaybeNull, NumberOrString } from 'shared/types/utils'

import warehouseFixtures from 'fixtures/warehouse'

import { renderInRoute_latest, tableTestUtils } from '_tests_/utils'

import EquipmentTable from './index'
import { EquipmentTableProps } from './types'

const equipmentListItem = warehouseFixtures.equipmentListItem()

const props: Readonly<EquipmentTableProps> = {
  dataSource: [equipmentListItem],
  pagination: {},
  loading: false,
  onChange: jest.fn(),
}

const getContainer = () => screen.getByTestId('equipment-table')

const getRow = (id: number) => tableTestUtils.getRowIn(getContainer(), id)

const getColTitle = (text: string) => within(getContainer()).getByText(text)

const getColValue = (
  id: number,
  value: NumberOrString,
): MaybeNull<HTMLElement> => {
  const row = getRow(id)
  return row ? within(row).getByText(value) : null
}

// loading
const expectLoadingStarted = () =>
  tableTestUtils.expectLoadingStarted(getContainer())

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

  expectLoadingStarted,
  expectLoadingFinished,
}

afterEach(() => {
  const onChange = props.onChange as jest.Mock
  onChange.mockReset()
})

describe('Таблица оборудования', () => {
  test('Отображается корректно', () => {
    renderInRoute_latest(
      [
        {
          path: RouteEnum.EquipmentList,
          element: <EquipmentTable {...props} />,
        },
      ],
      { initialEntries: [RouteEnum.EquipmentList] },
    )

    const table = testUtils.getContainer()

    expect(table).toBeInTheDocument()
    tableTestUtils.expectPaginationEnabledIn(table)

    props.dataSource.forEach((item) => {
      const row = testUtils.getRow(item.id)
      expect(row).toBeInTheDocument()
    })
  })

  test('Можно перейти на следующую страницу', async () => {
    const equipmentList = warehouseFixtures.equipmentList(11)

    const { user } = renderInRoute_latest(
      [
        {
          path: RouteEnum.EquipmentList,
          element: <EquipmentTable {...props} dataSource={equipmentList} />,
        },
      ],
      { initialEntries: [RouteEnum.EquipmentList] },
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
    equipmentList.slice(-1).forEach((item) => {
      const row = testUtils.getRow(item.id)
      expect(row).toBeInTheDocument()
    })
  })

  describe('Наименование', () => {
    test('Отображается', () => {
      renderInRoute_latest(
        [
          {
            path: RouteEnum.EquipmentList,
            element: <EquipmentTable {...props} />,
          },
        ],
        { initialEntries: [RouteEnum.EquipmentList] },
      )

      const title = testUtils.getColTitle('Наименование')
      const value = testUtils.getColValue(
        equipmentListItem.id,
        equipmentListItem.title,
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    // todo: сделать как будет готов соответствующий функционал
    test.todo('При клике открывается карточка просмотра оборудования')
  })

  describe('Серийный номер', () => {
    test('Отображается', () => {
      renderInRoute_latest(
        [
          {
            path: RouteEnum.EquipmentList,
            element: <EquipmentTable {...props} />,
          },
        ],
        { initialEntries: [RouteEnum.EquipmentList] },
      )

      const title = testUtils.getColTitle('Серийный номер')
      const value = testUtils.getColValue(
        equipmentListItem.id,
        equipmentListItem.serialNumber!,
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })
  })

  describe('Инвентарный номер', () => {
    test('Отображается', () => {
      renderInRoute_latest(
        [
          {
            path: RouteEnum.EquipmentList,
            element: <EquipmentTable {...props} />,
          },
        ],
        { initialEntries: [RouteEnum.EquipmentList] },
      )

      const title = testUtils.getColTitle('Инвентарный номер')
      const value = testUtils.getColValue(
        equipmentListItem.id,
        equipmentListItem.inventoryNumber!,
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })
  })

  describe('Склад', () => {
    test('Отображается', () => {
      renderInRoute_latest(
        [
          {
            path: RouteEnum.EquipmentList,
            element: <EquipmentTable {...props} />,
          },
        ],
        { initialEntries: [RouteEnum.EquipmentList] },
      )

      const title = testUtils.getColTitle('Склад')
      const value = testUtils.getColValue(
        equipmentListItem.id,
        equipmentListItem.warehouse!.title,
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })
  })

  describe('Состояние', () => {
    test('Отображается', () => {
      renderInRoute_latest(
        [
          {
            path: RouteEnum.EquipmentList,
            element: <EquipmentTable {...props} />,
          },
        ],
        { initialEntries: [RouteEnum.EquipmentList] },
      )

      const title = testUtils.getColTitle('Состояние')
      const value = testUtils.getColValue(
        equipmentListItem.id,
        equipmentConditionDict[equipmentListItem.condition],
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })
  })

  describe('Количество', () => {
    test('Отображается', () => {
      renderInRoute_latest(
        [
          {
            path: RouteEnum.EquipmentList,
            element: <EquipmentTable {...props} />,
          },
        ],
        { initialEntries: [RouteEnum.EquipmentList] },
      )

      const title = testUtils.getColTitle('Количество')
      const value = testUtils.getColValue(
        equipmentListItem.id,
        equipmentListItem.quantity,
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })
  })

  describe('Категория', () => {
    test('Отображается', () => {
      renderInRoute_latest(
        [
          {
            path: RouteEnum.EquipmentList,
            element: <EquipmentTable {...props} />,
          },
        ],
        { initialEntries: [RouteEnum.EquipmentList] },
      )

      const title = testUtils.getColTitle('Категория')
      const value = testUtils.getColValue(
        equipmentListItem.id,
        equipmentListItem.category.title,
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })
  })

  describe('Назначение', () => {
    test('Отображается', () => {
      renderInRoute_latest(
        [
          {
            path: RouteEnum.EquipmentList,
            element: <EquipmentTable {...props} />,
          },
        ],
        { initialEntries: [RouteEnum.EquipmentList] },
      )

      const title = testUtils.getColTitle('Назначение')
      const value = testUtils.getColValue(
        equipmentListItem.id,
        equipmentListItem.purpose.title,
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })
  })
})
