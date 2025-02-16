import { within } from '@testing-library/react'
import { relocationTaskStatusDict } from 'features/relocationTasks/constants'

import { formatDate } from 'shared/utils/date'

import {
  equipmentRelocationHistoryItem,
  props,
} from '_tests_/features/warehouses/components/EquipmentRelocationHistoryModal/constants'
import { equipmentRelocationHistoryModalTestUtils } from '_tests_/features/warehouses/components/EquipmentRelocationHistoryModal/testUtils'
import { render, tableTestUtils } from '_tests_/helpers'

import EquipmentRelocationHistoryModal from './index'

describe('Модалка истории заявок на перемещение', () => {
  test('Заголовок отображается', () => {
    render(<EquipmentRelocationHistoryModal {...props} />)
    const title = within(equipmentRelocationHistoryModalTestUtils.getContainer()).getByText(
      'История заявок на перемещение',
    )
    expect(title).toBeInTheDocument()
  })

  describe('Таблица', () => {
    test('Отображается корректно', () => {
      render(<EquipmentRelocationHistoryModal {...props} />)

      const table = equipmentRelocationHistoryModalTestUtils.getTable()
      tableTestUtils.expectPaginationEnabledIn(table)

      props.dataSource.forEach((item) => {
        const row = equipmentRelocationHistoryModalTestUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })

    test('Номер заявки отображается', () => {
      render(<EquipmentRelocationHistoryModal {...props} />)

      const title = equipmentRelocationHistoryModalTestUtils.getColTitle('№ заявки')
      const value = equipmentRelocationHistoryModalTestUtils.getColValue(
        props.dataSource[0].id,
        props.dataSource[0].id,
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('Инициировано отображается корректно', () => {
      render(<EquipmentRelocationHistoryModal {...props} />)

      const title = equipmentRelocationHistoryModalTestUtils.getColTitle('Инициировано')
      const value = equipmentRelocationHistoryModalTestUtils.getColValue(
        props.dataSource[0].id,
        formatDate(props.dataSource[0].createdAt),
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('Дата перемещения отображается корректно', () => {
      render(<EquipmentRelocationHistoryModal {...props} />)

      const title = equipmentRelocationHistoryModalTestUtils.getColTitle('Дата перемещения')
      const value = equipmentRelocationHistoryModalTestUtils.getColValue(
        props.dataSource[0].id,
        formatDate(props.dataSource[0].completedAt),
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('Объект выбытия отображается корректно', () => {
      render(<EquipmentRelocationHistoryModal {...props} />)

      const title = equipmentRelocationHistoryModalTestUtils.getColTitle('Объект выбытия')
      const value = equipmentRelocationHistoryModalTestUtils.getColValue(
        props.dataSource[0].id,
        props.dataSource[0].relocateFrom,
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('Объект прибытия отображается корректно', () => {
      render(<EquipmentRelocationHistoryModal {...props} />)

      const title = equipmentRelocationHistoryModalTestUtils.getColTitle('Объект прибытия')
      const value = equipmentRelocationHistoryModalTestUtils.getColValue(
        props.dataSource[0].id,
        props.dataSource[0].relocateTo,
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('Инициатор отображается корректно', () => {
      render(<EquipmentRelocationHistoryModal {...props} />)

      const title = equipmentRelocationHistoryModalTestUtils.getColTitle('Инициатор')
      const value = equipmentRelocationHistoryModalTestUtils.getColValue(
        props.dataSource[0].id,
        props.dataSource[0].createdBy,
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('Статус отображается корректно', () => {
      render(<EquipmentRelocationHistoryModal {...props} />)

      const title = equipmentRelocationHistoryModalTestUtils.getColTitle('Статус')
      const value = equipmentRelocationHistoryModalTestUtils.getColValue(
        props.dataSource[0].id,
        relocationTaskStatusDict[props.dataSource[0].status],
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('Вложения отображается', () => {
      render(<EquipmentRelocationHistoryModal {...props} />)

      const title = equipmentRelocationHistoryModalTestUtils.getColTitle('Вложения')
      const row = equipmentRelocationHistoryModalTestUtils.getRow(equipmentRelocationHistoryItem.id)
      const value = within(row).getByTestId('attachments')

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('Номер перемещения на портале заказчика отображается', () => {
      render(<EquipmentRelocationHistoryModal {...props} />)

      const title = equipmentRelocationHistoryModalTestUtils.getColTitle(
        'Номер перемещения на портале заказчика',
      )
      const value = equipmentRelocationHistoryModalTestUtils.getColValue(
        equipmentRelocationHistoryItem.id,
        equipmentRelocationHistoryItem.externalRelocation!.number!,
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('При клике на строку вызывается обработчик', async () => {
      const { user } = render(<EquipmentRelocationHistoryModal {...props} />)

      await equipmentRelocationHistoryModalTestUtils.clickRow(user, props.dataSource[0].id)

      expect(props.onRow).toBeCalled()
      expect(props.onRow).toBeCalledWith(
        props.dataSource[0],
        props.dataSource!.indexOf(props.dataSource[0]),
      )
    })
  })
})
