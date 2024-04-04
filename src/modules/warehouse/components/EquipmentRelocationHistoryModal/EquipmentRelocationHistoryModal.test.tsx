import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { relocationTaskStatusDict } from 'modules/warehouse/constants/relocationTask'

import { IdType } from 'shared/types/common'
import { NumberOrString } from 'shared/types/utils'
import { formatDate } from 'shared/utils/date'

import warehouseFixtures from '_tests_/fixtures/warehouse'
import { render, tableTestUtils } from '_tests_/utils'

import EquipmentRelocationHistoryModal from './index'
import { EquipmentRelocationHistoryModalProps } from './types'

const props: EquipmentRelocationHistoryModalProps = {
  open: true,
  loading: false,
  dataSource: [warehouseFixtures.equipmentRelocationHistoryItem()],
  onCancel: jest.fn(),
  onRow: jest.fn(),
}

const getContainer = () => screen.getByTestId('equipment-relocation-history-modal')
const findContainer = () => screen.findByTestId('equipment-relocation-history-modal')

const getTable = () => within(getContainer()).getByTestId('equipment-relocation-history-table')
const getRow = (id: IdType) => tableTestUtils.getRowIn(getTable(), id)
const clickRow = async (user: UserEvent, id: IdType) =>
  tableTestUtils.clickRowIn(getTable(), user, id)
const getColTitle = (text: string) => within(getTable()).getByText(text)
const getColValue = (id: IdType, value: NumberOrString): HTMLElement =>
  within(getRow(id)).getByText(value)

// loading
const expectLoadingStarted = () => tableTestUtils.expectLoadingStarted(getTable())
const expectLoadingFinished = () => tableTestUtils.expectLoadingFinished(getTable())

export const testUtils = {
  getContainer,
  findContainer,

  getTable,
  getRow,
  clickRow,
  getColTitle,
  getColValue,

  expectLoadingStarted,
  expectLoadingFinished,
}

describe('Модалка истории заявок на перемещение', () => {
  test('Заголовок отображается', () => {
    render(<EquipmentRelocationHistoryModal {...props} />)
    const title = within(getContainer()).getByText('История заявок на перемещение')
    expect(title).toBeInTheDocument()
  })

  describe('Таблица', () => {
    test('Отображается корректно', () => {
      render(<EquipmentRelocationHistoryModal {...props} />)

      const table = testUtils.getTable()
      tableTestUtils.expectPaginationEnabledIn(table)

      props.dataSource.forEach((item) => {
        const row = testUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })

    test('Инициировано отображается корректно', () => {
      render(<EquipmentRelocationHistoryModal {...props} />)

      const title = testUtils.getColTitle('Инициировано')
      const value = testUtils.getColValue(
        props.dataSource[0].id,
        formatDate(props.dataSource[0].createdAt),
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('Дата перемещения отображается корректно', () => {
      render(<EquipmentRelocationHistoryModal {...props} />)

      const title = testUtils.getColTitle('Дата перемещения')
      const value = testUtils.getColValue(
        props.dataSource[0].id,
        formatDate(props.dataSource[0].completedAt),
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('Объект выбытия отображается корректно', () => {
      render(<EquipmentRelocationHistoryModal {...props} />)

      const title = testUtils.getColTitle('Объект выбытия')
      const value = testUtils.getColValue(props.dataSource[0].id, props.dataSource[0].relocateFrom)

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('Объект прибытия отображается корректно', () => {
      render(<EquipmentRelocationHistoryModal {...props} />)

      const title = testUtils.getColTitle('Объект прибытия')
      const value = testUtils.getColValue(props.dataSource[0].id, props.dataSource[0].relocateTo)

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('Инициатор отображается корректно', () => {
      render(<EquipmentRelocationHistoryModal {...props} />)

      const title = testUtils.getColTitle('Инициатор')
      const value = testUtils.getColValue(props.dataSource[0].id, props.dataSource[0].createdBy)

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('Статус отображается корректно', () => {
      render(<EquipmentRelocationHistoryModal {...props} />)

      const title = testUtils.getColTitle('Статус')
      const value = testUtils.getColValue(
        props.dataSource[0].id,
        relocationTaskStatusDict[props.dataSource[0].status],
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('При клике на строку вызывается обработчик', async () => {
      const { user } = render(<EquipmentRelocationHistoryModal {...props} />)

      await testUtils.clickRow(user, props.dataSource[0].id)

      expect(props.onRow).toBeCalled()
      expect(props.onRow).toBeCalledWith(
        props.dataSource[0],
        props.dataSource!.indexOf(props.dataSource[0]),
      )
    })
  })
})
