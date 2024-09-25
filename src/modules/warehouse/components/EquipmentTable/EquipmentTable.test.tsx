import { equipmentConditionDict } from 'modules/warehouse/constants/equipment'

import { getYesNoWord } from 'shared/utils/common'

import {
  ariaSortAttrAscValue,
  ariaSortAttrDescValue,
  ariaSortAttrName,
  columnWithSortingClass,
} from '_tests_/constants/components'
import {
  equipmentListItem,
  props,
} from '_tests_/features/warehouse/components/EquipmentTable/constants'
import { equipmentTableTestUtils } from '_tests_/features/warehouse/components/EquipmentTable/testUtils'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import { render, tableTestUtils } from '_tests_/utils'

import EquipmentTable from './index'

afterEach(() => {
  const onRow = props.onRow as jest.Mock
  const onChange = props.onChange as jest.Mock

  onRow.mockReset()
  onChange.mockReset()
})

describe('Таблица оборудования', () => {
  test('Отображается корректно', () => {
    render(<EquipmentTable {...props} />)

    const table = equipmentTableTestUtils.getContainer()

    expect(table).toBeInTheDocument()
    tableTestUtils.expectPaginationEnabledIn(table)

    props.dataSource.forEach((item) => {
      const row = equipmentTableTestUtils.getRow(item.id)
      expect(row).toBeInTheDocument()
    })
  })

  test('Пагинация работает', async () => {
    const equipmentList = warehouseFixtures.equipmentList(11)

    const { user } = render(<EquipmentTable {...props} dataSource={equipmentList} />)

    const table = equipmentTableTestUtils.getContainer()
    await tableTestUtils.clickPaginationNextButtonIn(user, table)

    expect(props.onChange).toBeCalledTimes(1)
    expect(props.onChange).toBeCalledWith(
      expect.anything(),
      expect.anything(),
      expect.anything(),
      expect.anything(),
    )
    equipmentList.slice(-1).forEach((item) => {
      const row = equipmentTableTestUtils.getRow(item.id)
      expect(row).toBeInTheDocument()
    })
  })

  test('При клике на строку обработчик вызывается корректно', async () => {
    const { user } = render(<EquipmentTable {...props} />)

    await equipmentTableTestUtils.clickRow(user, props.dataSource[0].id)

    expect(props.onRow).toBeCalled()
    expect(props.onRow).toBeCalledWith(props.dataSource[0], 0)
  })

  test.skip('Можно установить сортировку по умолчанию', () => {
    render(<EquipmentTable {...props} sort='-title' />)
    const headCell = equipmentTableTestUtils.getHeadCell('Наименование')
    expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)
  })

  describe.skip('Наименование', () => {
    test('Отображается', () => {
      render(<EquipmentTable {...props} />)

      const headCell = equipmentTableTestUtils.getHeadCell('Наименование')
      const title = equipmentTableTestUtils.getColTitle('Наименование')
      const value = equipmentTableTestUtils.getColValue(
        equipmentListItem.id,
        equipmentListItem.title,
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
      expect(headCell).toHaveClass(columnWithSortingClass)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName)
    })

    test('При клике на заголовок обработчик вызывается корректно', async () => {
      const { user } = render(<EquipmentTable {...props} />)

      await equipmentTableTestUtils.clickColTitle(user, 'Наименование')

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

      await equipmentTableTestUtils.clickColTitle(user, 'Наименование')
      const headCell = equipmentTableTestUtils.getHeadCell('Наименование')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

      await equipmentTableTestUtils.clickColTitle(user, 'Наименование')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      await equipmentTableTestUtils.clickColTitle(user, 'Наименование')
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      props.dataSource.forEach((item) => {
        const row = equipmentTableTestUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })
  })

  describe('Серийный номер', () => {
    test('Отображается', () => {
      render(<EquipmentTable {...props} />)

      const title = equipmentTableTestUtils.getColTitle('Серийный номер')
      const value = equipmentTableTestUtils.getColValue(
        equipmentListItem.id,
        equipmentListItem.serialNumber!,
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('При клике на заголовок обработчик вызывается корректно', async () => {
      const { user } = render(<EquipmentTable {...props} />)

      await equipmentTableTestUtils.clickColTitle(user, 'Серийный номер')

      expect(props.onChange).toBeCalledTimes(1)
      expect(props.onChange).toBeCalledWith(
        expect.anything(),
        expect.anything(),
        expect.anything(),
        expect.anything(),
      )
    })

    test.skip('Сортировка работает корректно', async () => {
      const { user } = render(<EquipmentTable {...props} />)

      await equipmentTableTestUtils.clickColTitle(user, 'Серийный номер')
      const headCell = equipmentTableTestUtils.getHeadCell('Серийный номер')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

      await equipmentTableTestUtils.clickColTitle(user, 'Серийный номер')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      await equipmentTableTestUtils.clickColTitle(user, 'Серийный номер')
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      props.dataSource.forEach((item) => {
        const row = equipmentTableTestUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })
  })

  describe('Инвентарный номер', () => {
    test('Отображается', () => {
      render(<EquipmentTable {...props} />)

      const title = equipmentTableTestUtils.getColTitle('Инвентарный номер')
      const value = equipmentTableTestUtils.getColValue(
        equipmentListItem.id,
        equipmentListItem.inventoryNumber!,
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('При клике на заголовок обработчик вызывается корректно', async () => {
      const { user } = render(<EquipmentTable {...props} />)

      await equipmentTableTestUtils.clickColTitle(user, 'Инвентарный номер')

      expect(props.onChange).toBeCalledTimes(1)
      expect(props.onChange).toBeCalledWith(
        expect.anything(),
        expect.anything(),
        expect.anything(),
        expect.anything(),
      )
    })

    test.skip('Сортировка работает корректно', async () => {
      const { user } = render(<EquipmentTable {...props} />)

      await equipmentTableTestUtils.clickColTitle(user, 'Инвентарный номер')
      const headCell = equipmentTableTestUtils.getHeadCell('Инвентарный номер')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

      await equipmentTableTestUtils.clickColTitle(user, 'Инвентарный номер')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      await equipmentTableTestUtils.clickColTitle(user, 'Инвентарный номер')
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      props.dataSource.forEach((item) => {
        const row = equipmentTableTestUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })
  })

  describe('Местонахождение', () => {
    test('Отображается', () => {
      render(<EquipmentTable {...props} />)

      const title = equipmentTableTestUtils.getColTitle('Местонахождение')
      const value = equipmentTableTestUtils.getColValue(
        equipmentListItem.id,
        equipmentListItem.location!.title,
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('При клике на заголовок обработчик вызывается корректно', async () => {
      const { user } = render(<EquipmentTable {...props} />)

      await equipmentTableTestUtils.clickColTitle(user, 'Местонахождение')

      expect(props.onChange).toBeCalledTimes(1)
      expect(props.onChange).toBeCalledWith(
        expect.anything(),
        expect.anything(),
        expect.anything(),
        expect.anything(),
      )
    })

    test.skip('Сортировка работает корректно', async () => {
      const { user } = render(<EquipmentTable {...props} />)

      await equipmentTableTestUtils.clickColTitle(user, 'Местонахождение')
      const headCell = equipmentTableTestUtils.getHeadCell('Местонахождение')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

      await equipmentTableTestUtils.clickColTitle(user, 'Местонахождение')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      await equipmentTableTestUtils.clickColTitle(user, 'Местонахождение')
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      props.dataSource.forEach((item) => {
        const row = equipmentTableTestUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })
  })

  describe('Оприходовано', () => {
    test('Отображается', () => {
      render(<EquipmentTable {...props} />)

      const title = equipmentTableTestUtils.getColTitle('Оприходовано')
      const value = equipmentTableTestUtils.getColValue(
        equipmentListItem.id,
        getYesNoWord(equipmentListItem.isCredited),
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })
  })

  describe('Состояние', () => {
    test('Отображается', () => {
      render(<EquipmentTable {...props} />)

      const title = equipmentTableTestUtils.getColTitle('Состояние')
      const value = equipmentTableTestUtils.getColValue(
        equipmentListItem.id,
        equipmentConditionDict[equipmentListItem.condition],
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('При клике на заголовок обработчик вызывается корректно', async () => {
      const { user } = render(<EquipmentTable {...props} />)

      await equipmentTableTestUtils.clickColTitle(user, 'Состояние')

      expect(props.onChange).toBeCalledTimes(1)
      expect(props.onChange).toBeCalledWith(
        expect.anything(),
        expect.anything(),
        expect.anything(),
        expect.anything(),
      )
    })

    test.skip('Сортировка работает корректно', async () => {
      const { user } = render(<EquipmentTable {...props} />)

      await equipmentTableTestUtils.clickColTitle(user, 'Состояние')
      const headCell = equipmentTableTestUtils.getHeadCell('Состояние')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

      await equipmentTableTestUtils.clickColTitle(user, 'Состояние')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      await equipmentTableTestUtils.clickColTitle(user, 'Состояние')
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      props.dataSource.forEach((item) => {
        const row = equipmentTableTestUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })
  })

  describe('Количество', () => {
    test('Отображается', () => {
      render(<EquipmentTable {...props} />)

      const title = equipmentTableTestUtils.getColTitle('Количество')
      const value = equipmentTableTestUtils.getColValue(
        equipmentListItem.id,
        equipmentListItem.quantity,
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('При клике на заголовок обработчик вызывается корректно', async () => {
      const { user } = render(<EquipmentTable {...props} />)

      await equipmentTableTestUtils.clickColTitle(user, 'Количество')

      expect(props.onChange).toBeCalledTimes(1)
      expect(props.onChange).toBeCalledWith(
        expect.anything(),
        expect.anything(),
        expect.anything(),
        expect.anything(),
      )
    })

    test.skip('Сортировка работает корректно', async () => {
      const { user } = render(<EquipmentTable {...props} />)

      await equipmentTableTestUtils.clickColTitle(user, 'Количество')
      const headCell = equipmentTableTestUtils.getHeadCell('Количество')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

      await equipmentTableTestUtils.clickColTitle(user, 'Количество')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      await equipmentTableTestUtils.clickColTitle(user, 'Количество')
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      props.dataSource.forEach((item) => {
        const row = equipmentTableTestUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })
  })

  describe('Категория', () => {
    test('Отображается', () => {
      render(<EquipmentTable {...props} />)

      const title = equipmentTableTestUtils.getColTitle('Категория')
      const value = equipmentTableTestUtils.getColValue(
        equipmentListItem.id,
        equipmentListItem.category.title,
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('При клике на заголовок обработчик вызывается корректно', async () => {
      const { user } = render(<EquipmentTable {...props} />)

      await equipmentTableTestUtils.clickColTitle(user, 'Категория')

      expect(props.onChange).toBeCalledTimes(1)
      expect(props.onChange).toBeCalledWith(
        expect.anything(),
        expect.anything(),
        expect.anything(),
        expect.anything(),
      )
    })

    test.skip('Сортировка работает корректно', async () => {
      const { user } = render(<EquipmentTable {...props} />)

      await equipmentTableTestUtils.clickColTitle(user, 'Категория')
      const headCell = equipmentTableTestUtils.getHeadCell('Категория')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

      await equipmentTableTestUtils.clickColTitle(user, 'Категория')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      await equipmentTableTestUtils.clickColTitle(user, 'Категория')
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      props.dataSource.forEach((item) => {
        const row = equipmentTableTestUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })
  })

  describe('Назначение', () => {
    test('Отображается', () => {
      render(<EquipmentTable {...props} />)

      const title = equipmentTableTestUtils.getColTitle('Назначение')
      const value = equipmentTableTestUtils.getColValue(
        equipmentListItem.id,
        equipmentListItem.purpose.title,
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('При клике на заголовок обработчик вызывается корректно', async () => {
      const { user } = render(<EquipmentTable {...props} />)

      await equipmentTableTestUtils.clickColTitle(user, 'Назначение')

      expect(props.onChange).toBeCalledTimes(1)
      expect(props.onChange).toBeCalledWith(
        expect.anything(),
        expect.anything(),
        expect.anything(),
        expect.anything(),
      )
    })

    test.skip('Сортировка работает корректно', async () => {
      const { user } = render(<EquipmentTable {...props} />)

      await equipmentTableTestUtils.clickColTitle(user, 'Назначение')
      const headCell = equipmentTableTestUtils.getHeadCell('Назначение')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

      await equipmentTableTestUtils.clickColTitle(user, 'Назначение')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      await equipmentTableTestUtils.clickColTitle(user, 'Назначение')
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      props.dataSource.forEach((item) => {
        const row = equipmentTableTestUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })
  })
})
