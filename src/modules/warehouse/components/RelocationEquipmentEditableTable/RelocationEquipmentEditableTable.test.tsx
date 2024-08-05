import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import { Form } from 'antd'

import { IdType } from 'shared/types/common'
import { MaybeNull, NumberOrString } from 'shared/types/utils'

import { buttonTestUtils, render, tableTestUtils } from '_tests_/utils'

import RelocationEquipmentEditableTable from './index'
import { RelocationEquipmentEditableTableProps } from './types'

const props: RelocationEquipmentEditableTableProps = {
  name: 'equipments',
  editableKeys: undefined,
  setEditableKeys: jest.fn(),

  isLoading: false,

  equipmentIsLoading: false,
  relocationEquipmentsIsLoading: false,

  currencies: [],
  currenciesIsLoading: false,

  equipments: [],
  equipmentsIsLoading: false,

  canCreateEquipment: false,
  createEquipmentBtnDisabled: false,
  onClickCreateEquipment: jest.fn(),

  onClickCreateImage: jest.fn(),
}

const getContainer = () => screen.getByTestId('relocation-equipment-editable-table-container')

const getRow = (id: IdType) => tableTestUtils.getRowById(getContainer(), id)
const clickRow = async (user: UserEvent, id: IdType) =>
  tableTestUtils.clickRowIn(getContainer(), user, id)

const getHeadCell = (text: string) => tableTestUtils.getHeadCell(getContainer(), text)
const getColTitle = (text: string) => within(getContainer()).getByText(text)
const getColValue = (id: IdType, value: NumberOrString): MaybeNull<HTMLElement> => {
  const row = getRow(id)
  return row ? within(row).getByText(value) : null
}
const clickColValue = async (user: UserEvent, id: IdType, value: NumberOrString) => {
  const colValue = getColValue(id, value)
  await user.click(colValue!)
}

// loading
const expectLoadingStarted = () => tableTestUtils.expectLoadingStarted(getContainer())
const expectLoadingFinished = () => tableTestUtils.expectLoadingFinished(getContainer())

export const testUtils = {
  getContainer,

  getRow,
  clickRow,
  getHeadCell,
  getColTitle,
  getColValue,
  clickColValue,

  expectLoadingStarted,
  expectLoadingFinished,
}

describe('Таблица добавления оборудования для перемещения', () => {
  describe('Кнопка добавить оборудование', () => {
    test('Отображается корректно', () => {
      render(
        <Form>
          <RelocationEquipmentEditableTable {...props} />
        </Form>,
      )

      const button = buttonTestUtils.getButtonIn(getContainer(), /Добавить оборудование/)

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })
  })
})
