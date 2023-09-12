import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { equipmentConditionDict } from 'modules/warehouse/constants'

import { IdType } from 'shared/types/common'
import { MaybeNull, NumberOrString } from 'shared/types/utils'

import warehouseFixtures from '_tests_/fixtures/warehouse'

import {
  ariaSortAttrAscValue,
  ariaSortAttrDescValue,
  ariaSortAttrName,
  columnWithSortingClass,
} from '_tests_/constants/components'
import { render, tableTestUtils } from '_tests_/utils'

import EquipmentTable from './index'
import { EquipmentTableProps } from './types'

const equipmentListItem = warehouseFixtures.equipmentListItem()

const props: Readonly<EquipmentTableProps> = {
  dataSource: [equipmentListItem],
  pagination: {},
  loading: false,
  onChange: jest.fn(),
  onRow: jest.fn(),
}

const getContainer = () => screen.getByTestId('equipment-table')

const getRow = (id: IdType) => tableTestUtils.getRowIn(getContainer(), id)

const getHeadCell = (text: string) => tableTestUtils.getHeadCell(getContainer(), text)

const clickRow = async (user: UserEvent, id: IdType) =>
  tableTestUtils.clickRowIn(getContainer(), user, id)

const getColTitle = (text: string) => within(getContainer()).getByText(text)

const clickColTitle = async (user: UserEvent, title: string) => {
  const col = getColTitle(title)
  await user.click(col)
}

const getColValue = (id: IdType, value: NumberOrString): MaybeNull<HTMLElement> => {
  const row = getRow(id)
  return row ? within(row).getByText(value) : null
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
  clickRow,

  getHeadCell,

  getColTitle,
  clickColTitle,
  getColValue,

  expectLoadingStarted,
  expectLoadingFinished,
}

afterEach(() => {
  const onRow = props.onRow as jest.Mock
  const onChange = props.onChange as jest.Mock

  onRow.mockReset()
  onChange.mockReset()
})

describe('Таблица оборудования', () => {
  test('Отображается корректно', () => {
    render(<EquipmentTable {...props} />)

    const table = testUtils.getContainer()

    expect(table).toBeInTheDocument()
    tableTestUtils.expectPaginationEnabledIn(table)

    props.dataSource.forEach((item) => {
      const row = testUtils.getRow(item.id)
      expect(row).toBeInTheDocument()
    })
  })

  test('Пагинация работает', async () => {
    const equipmentList = warehouseFixtures.equipmentList(11)

    const { user } = render(<EquipmentTable {...props} dataSource={equipmentList} />)

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

  test('При клике на строку обработчик вызывается корректно', async () => {
    const { user } = render(<EquipmentTable {...props} />)
    await testUtils.clickRow(user, props.dataSource[0].id)
    expect(props.onRow).toBeCalledTimes(1)
  })

  test('Можно установить сортировку по умолчанию', () => {
    render(<EquipmentTable {...props} sort='-title' />)
    const headCell = testUtils.getHeadCell('Наименование')
    expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)
  })

  describe('Наименование', () => {
    test('Отображается', () => {
      render(<EquipmentTable {...props} />)

      const headCell = testUtils.getHeadCell('Наименование')
      const title = testUtils.getColTitle('Наименование')
      const value = testUtils.getColValue(equipmentListItem.id, equipmentListItem.title)

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
      expect(headCell).toHaveClass(columnWithSortingClass)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName)
    })

    test('При клике на заголовок обработчик вызывается корректно', async () => {
      const { user } = render(<EquipmentTable {...props} />)

      await testUtils.clickColTitle(user, 'Наименование')

      expect(props.onChange).toBeCalledTimes(1)
      expect(props.onChange).toBeCalledWith(
        expect.anything(),
        expect.anything(),
        expect.anything(),
        expect.anything(),
      )
    })

    test('Сортировка работает корректно', async () => {
      const { user } = render(<EquipmentTable {...props} />)

      await testUtils.clickColTitle(user, 'Наименование')
      const headCell = testUtils.getHeadCell('Наименование')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

      await testUtils.clickColTitle(user, 'Наименование')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      await testUtils.clickColTitle(user, 'Наименование')
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      props.dataSource.forEach((item) => {
        const row = testUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })
  })

  describe('Серийный номер', () => {
    test('Отображается', () => {
      render(<EquipmentTable {...props} />)

      const title = testUtils.getColTitle('Серийный номер')
      const value = testUtils.getColValue(equipmentListItem.id, equipmentListItem.serialNumber!)

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('При клике на заголовок обработчик вызывается корректно', async () => {
      const { user } = render(<EquipmentTable {...props} />)

      await testUtils.clickColTitle(user, 'Серийный номер')

      expect(props.onChange).toBeCalledTimes(1)
      expect(props.onChange).toBeCalledWith(
        expect.anything(),
        expect.anything(),
        expect.anything(),
        expect.anything(),
      )
    })

    test('Сортировка работает корректно', async () => {
      const { user } = render(<EquipmentTable {...props} />)

      await testUtils.clickColTitle(user, 'Серийный номер')
      const headCell = testUtils.getHeadCell('Серийный номер')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

      await testUtils.clickColTitle(user, 'Серийный номер')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      await testUtils.clickColTitle(user, 'Серийный номер')
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      props.dataSource.forEach((item) => {
        const row = testUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })
  })

  describe('Инвентарный номер', () => {
    test('Отображается', () => {
      render(<EquipmentTable {...props} />)

      const title = testUtils.getColTitle('Инвентарный номер')
      const value = testUtils.getColValue(equipmentListItem.id, equipmentListItem.inventoryNumber!)

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('При клике на заголовок обработчик вызывается корректно', async () => {
      const { user } = render(<EquipmentTable {...props} />)

      await testUtils.clickColTitle(user, 'Инвентарный номер')

      expect(props.onChange).toBeCalledTimes(1)
      expect(props.onChange).toBeCalledWith(
        expect.anything(),
        expect.anything(),
        expect.anything(),
        expect.anything(),
      )
    })

    test('Сортировка работает корректно', async () => {
      const { user } = render(<EquipmentTable {...props} />)

      await testUtils.clickColTitle(user, 'Инвентарный номер')
      const headCell = testUtils.getHeadCell('Инвентарный номер')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

      await testUtils.clickColTitle(user, 'Инвентарный номер')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      await testUtils.clickColTitle(user, 'Инвентарный номер')
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      props.dataSource.forEach((item) => {
        const row = testUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })
  })

  describe('Склад', () => {
    test('Отображается', () => {
      render(<EquipmentTable {...props} />)

      const title = testUtils.getColTitle('Склад')
      const value = testUtils.getColValue(equipmentListItem.id, equipmentListItem.warehouse!.title)

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('При клике на заголовок обработчик вызывается корректно', async () => {
      const { user } = render(<EquipmentTable {...props} />)

      await testUtils.clickColTitle(user, 'Склад')

      expect(props.onChange).toBeCalledTimes(1)
      expect(props.onChange).toBeCalledWith(
        expect.anything(),
        expect.anything(),
        expect.anything(),
        expect.anything(),
      )
    })

    test('Сортировка работает корректно', async () => {
      const { user } = render(<EquipmentTable {...props} />)

      await testUtils.clickColTitle(user, 'Склад')
      const headCell = testUtils.getHeadCell('Склад')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

      await testUtils.clickColTitle(user, 'Склад')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      await testUtils.clickColTitle(user, 'Склад')
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      props.dataSource.forEach((item) => {
        const row = testUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })
  })

  describe('Состояние', () => {
    test('Отображается', () => {
      render(<EquipmentTable {...props} />)

      const title = testUtils.getColTitle('Состояние')
      const value = testUtils.getColValue(
        equipmentListItem.id,
        equipmentConditionDict[equipmentListItem.condition],
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('При клике на заголовок обработчик вызывается корректно', async () => {
      const { user } = render(<EquipmentTable {...props} />)

      await testUtils.clickColTitle(user, 'Состояние')

      expect(props.onChange).toBeCalledTimes(1)
      expect(props.onChange).toBeCalledWith(
        expect.anything(),
        expect.anything(),
        expect.anything(),
        expect.anything(),
      )
    })

    test('Сортировка работает корректно', async () => {
      const { user } = render(<EquipmentTable {...props} />)

      await testUtils.clickColTitle(user, 'Состояние')
      const headCell = testUtils.getHeadCell('Состояние')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

      await testUtils.clickColTitle(user, 'Состояние')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      await testUtils.clickColTitle(user, 'Состояние')
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      props.dataSource.forEach((item) => {
        const row = testUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })
  })

  describe('Количество', () => {
    test('Отображается', () => {
      render(<EquipmentTable {...props} />)

      const title = testUtils.getColTitle('Количество')
      const value = testUtils.getColValue(equipmentListItem.id, equipmentListItem.quantity)

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('При клике на заголовок обработчик вызывается корректно', async () => {
      const { user } = render(<EquipmentTable {...props} />)

      await testUtils.clickColTitle(user, 'Количество')

      expect(props.onChange).toBeCalledTimes(1)
      expect(props.onChange).toBeCalledWith(
        expect.anything(),
        expect.anything(),
        expect.anything(),
        expect.anything(),
      )
    })

    test('Сортировка работает корректно', async () => {
      const { user } = render(<EquipmentTable {...props} />)

      await testUtils.clickColTitle(user, 'Количество')
      const headCell = testUtils.getHeadCell('Количество')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

      await testUtils.clickColTitle(user, 'Количество')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      await testUtils.clickColTitle(user, 'Количество')
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      props.dataSource.forEach((item) => {
        const row = testUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })
  })

  describe('Категория', () => {
    test('Отображается', () => {
      render(<EquipmentTable {...props} />)

      const title = testUtils.getColTitle('Категория')
      const value = testUtils.getColValue(equipmentListItem.id, equipmentListItem.category.title)

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('При клике на заголовок обработчик вызывается корректно', async () => {
      const { user } = render(<EquipmentTable {...props} />)

      await testUtils.clickColTitle(user, 'Категория')

      expect(props.onChange).toBeCalledTimes(1)
      expect(props.onChange).toBeCalledWith(
        expect.anything(),
        expect.anything(),
        expect.anything(),
        expect.anything(),
      )
    })

    test('Сортировка работает корректно', async () => {
      const { user } = render(<EquipmentTable {...props} />)

      await testUtils.clickColTitle(user, 'Категория')
      const headCell = testUtils.getHeadCell('Категория')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

      await testUtils.clickColTitle(user, 'Категория')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      await testUtils.clickColTitle(user, 'Категория')
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      props.dataSource.forEach((item) => {
        const row = testUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })
  })

  describe('Назначение', () => {
    test('Отображается', () => {
      render(<EquipmentTable {...props} />)

      const title = testUtils.getColTitle('Назначение')
      const value = testUtils.getColValue(equipmentListItem.id, equipmentListItem.purpose.title)

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('При клике на заголовок обработчик вызывается корректно', async () => {
      const { user } = render(<EquipmentTable {...props} />)

      await testUtils.clickColTitle(user, 'Назначение')

      expect(props.onChange).toBeCalledTimes(1)
      expect(props.onChange).toBeCalledWith(
        expect.anything(),
        expect.anything(),
        expect.anything(),
        expect.anything(),
      )
    })

    test('Сортировка работает корректно', async () => {
      const { user } = render(<EquipmentTable {...props} />)

      await testUtils.clickColTitle(user, 'Назначение')
      const headCell = testUtils.getHeadCell('Назначение')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

      await testUtils.clickColTitle(user, 'Назначение')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      await testUtils.clickColTitle(user, 'Назначение')
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      props.dataSource.forEach((item) => {
        const row = testUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })
  })
})
