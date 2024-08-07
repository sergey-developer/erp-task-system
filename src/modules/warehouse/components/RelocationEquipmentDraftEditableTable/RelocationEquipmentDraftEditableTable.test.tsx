import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import { Form } from 'antd'

import { makeString } from 'shared/utils/string'

import warehouseFixtures from '_tests_/fixtures/warehouse'
import { buttonTestUtils, render, selectTestUtils, tableTestUtils } from '_tests_/utils'

import RelocationEquipmentEditableTable from './index'
import { RelocationEquipmentDraftEditableTableProps } from './types'

const props: RelocationEquipmentDraftEditableTableProps = {
  name: 'equipments',
  editableKeys: undefined,
  setEditableKeys: jest.fn(),

  isLoading: false,

  currencies: [],
  currenciesIsLoading: false,

  equipments: [],
  equipmentsIsLoading: false,

  equipmentIsLoading: false,

  onClickCreateImage: jest.fn(),
}

const getContainer = () => screen.getByTestId('relocation-equipment-draft-editable-table-container')

const getRowByRole = () => tableTestUtils.getOneRowByRole(getContainer())

// add equipment button
const getAddEquipmentButton = () =>
  buttonTestUtils.getButtonIn(getContainer(), /Добавить оборудование/)

const clickAddEquipmentButton = async (user: UserEvent) => user.click(getAddEquipmentButton())

// delete equipment button
const getDeleteEquipmentButton = (row: HTMLElement) =>
  buttonTestUtils.getButtonIn(row, 'minus-circle')

const clickDeleteEquipmentButton = async (user: UserEvent, row: HTMLElement) =>
  user.click(getDeleteEquipmentButton(row))

// equipment field
const getEquipmentFormItem = (row: HTMLElement) => within(row).getByTestId('equipment-form-item')

const getEquipmentSelect = (row: HTMLElement) =>
  selectTestUtils.getSelect(getEquipmentFormItem(row))

const setEquipment = selectTestUtils.clickSelectOption

const openEquipmentSelect = async (user: UserEvent, row: HTMLElement) =>
  selectTestUtils.openSelect(user, getEquipmentFormItem(row))

const findEquipmentError = (error: string, row: HTMLElement) =>
  within(getEquipmentFormItem(row)).findByText(error)

const expectEquipmentsLoadingFinished = (row: HTMLElement) =>
  selectTestUtils.expectLoadingFinished(getEquipmentFormItem(row))

// serial number field
const getSerialNumberFormItem = (row: HTMLElement) =>
  within(row).getByTestId('serial-number-form-item')

const getSerialNumberField = (row: HTMLElement) =>
  within(getSerialNumberFormItem(row)).getByRole('textbox')

const setSerialNumber = async (user: UserEvent, value: string, row: HTMLElement) =>
  user.type(getSerialNumberField(row), value)

// condition field
const getConditionFormItem = (row: HTMLElement) => within(row).getByTestId('condition-form-item')

const getConditionSelect = (row: HTMLElement) =>
  selectTestUtils.getSelect(getConditionFormItem(row))

const setCondition = selectTestUtils.clickSelectOption

const openConditionSelect = async (user: UserEvent, row: HTMLElement) =>
  selectTestUtils.openSelect(user, getConditionFormItem(row))

const findConditionError = (error: string, row: HTMLElement) =>
  within(getConditionFormItem(row)).findByText(error)

// price field
const getPriceFormItem = (row: HTMLElement) => within(row).getByTestId('price-form-item')
const getPriceField = (row: HTMLElement) => within(getPriceFormItem(row)).getByRole('spinbutton')
const setPrice = async (user: UserEvent, value: number, row: HTMLElement) =>
  user.type(getPriceField(row), String(value))

// currency field
const getCurrencyFormItem = (row: HTMLElement) => within(row).getByTestId('currency-form-item')
const getCurrencySelect = (row: HTMLElement) => selectTestUtils.getSelect(getCurrencyFormItem(row))
const setCurrency = selectTestUtils.clickSelectOption
const openCurrencySelect = async (user: UserEvent, row: HTMLElement) =>
  selectTestUtils.openSelect(user, getCurrencyFormItem(row))

// quantity field
const getQuantityFormItem = (row: HTMLElement) => within(row).getByTestId('quantity-form-item')

const getQuantityField = (row: HTMLElement) =>
  within(getQuantityFormItem(row)).getByRole('spinbutton')

const setQuantity = async (user: UserEvent, value: number, row: HTMLElement) =>
  user.type(getQuantityField(row), String(value))

// attachments
const getAttachmentsFormItem = (row: HTMLElement) =>
  within(row).getByTestId('attachments-form-item')

const getAttachmentsButton = (row: HTMLElement) =>
  buttonTestUtils.getButtonIn(getAttachmentsFormItem(row), 'Добавить')

const clickAttachmentsButton = async (user: UserEvent, row: HTMLElement) =>
  user.click(getAttachmentsButton(row))

// loading
const expectLoadingStarted = () => tableTestUtils.expectLoadingStarted(getContainer())
const expectLoadingFinished = () => tableTestUtils.expectLoadingFinished(getContainer())

export const testUtils = {
  getContainer,
  getRowByRole,

  getEquipmentSelect,
  setEquipment,
  openEquipmentSelect,
  findEquipmentError,
  expectEquipmentsLoadingFinished,

  getSerialNumberField,
  setSerialNumber,

  getConditionSelect,
  setCondition,
  openConditionSelect,
  findConditionError,

  getPriceField,
  setPrice,

  getCurrencySelect,
  setCurrency,
  openCurrencySelect,

  getQuantityField,
  setQuantity,

  getAttachmentsButton,
  clickAttachmentsButton,

  clickAddEquipmentButton,
  clickDeleteEquipmentButton,

  expectLoadingStarted,
  expectLoadingFinished,
}

describe('Таблица добавления оборудования для перемещения', () => {
  test('Все колонки отображаются', async () => {
    const { user } = render(
      <Form>
        <RelocationEquipmentEditableTable {...props} />
      </Form>,
    )

    await testUtils.clickAddEquipmentButton(user)
    const container = testUtils.getContainer()
    const equipmentCol = tableTestUtils.getHeadCell(container, 'Оборудование')
    const serialNumberCol = tableTestUtils.getHeadCell(container, 'Серийный номер')
    const conditionCol = tableTestUtils.getHeadCell(container, 'Состояние')
    const priceCol = tableTestUtils.getHeadCell(container, 'Стоимость')
    const currencyCol = tableTestUtils.getHeadCell(container, 'Валюта')
    const quantityCol = tableTestUtils.getHeadCell(container, 'Количество')
    const attachmentsCol = tableTestUtils.getHeadCell(container, 'Изображения')

    expect(equipmentCol).toBeInTheDocument()
    expect(serialNumberCol).toBeInTheDocument()
    expect(conditionCol).toBeInTheDocument()
    expect(priceCol).toBeInTheDocument()
    expect(currencyCol).toBeInTheDocument()
    expect(quantityCol).toBeInTheDocument()
    expect(attachmentsCol).toBeInTheDocument()
  })

  test('Кнопка добавить оборудование добавляет пустую строку в таблицу', async () => {
    const { user } = render(
      <Form>
        <RelocationEquipmentEditableTable {...props} />
      </Form>,
    )

    await testUtils.clickAddEquipmentButton(user)
    const row = testUtils.getRowByRole()
    expect(row).toBeInTheDocument()
  })

  test('Кнопка удаления оборудование удаляет добавленную строку', async () => {
    const { user } = render(
      <Form>
        <RelocationEquipmentEditableTable {...props} />
      </Form>,
    )

    await testUtils.clickAddEquipmentButton(user)
    const row = testUtils.getRowByRole()
    await testUtils.clickDeleteEquipmentButton(user, row)
    expect(row).not.toBeInTheDocument()
  })

  test('Поле оборудования отображается и активно', async () => {
    const { user } = render(
      <Form>
        <RelocationEquipmentEditableTable {...props} />
      </Form>,
    )

    await testUtils.clickAddEquipmentButton(user)
    const row = testUtils.getRowByRole()
    const field = testUtils.getEquipmentSelect(row)

    expect(field).toBeInTheDocument()
    expect(field).toBeEnabled()
  })

  test('Поле серийного номера отображается и не активно', async () => {
    const { user } = render(
      <Form>
        <RelocationEquipmentEditableTable {...props} />
      </Form>,
    )

    await testUtils.clickAddEquipmentButton(user)
    const row = testUtils.getRowByRole()
    const field = testUtils.getSerialNumberField(row)

    expect(field).toBeInTheDocument()
    expect(field).toBeDisabled()
  })

  test('Поле состояния отображается и активно', async () => {
    const { user } = render(
      <Form>
        <RelocationEquipmentEditableTable {...props} />
      </Form>,
    )

    await testUtils.clickAddEquipmentButton(user)
    const row = testUtils.getRowByRole()
    const field = testUtils.getConditionSelect(row)

    expect(field).toBeInTheDocument()
    expect(field).toBeEnabled()
  })

  test('Поле стоимости отображается и активно', async () => {
    const { user } = render(
      <Form>
        <RelocationEquipmentEditableTable {...props} />
      </Form>,
    )

    await testUtils.clickAddEquipmentButton(user)
    const row = testUtils.getRowByRole()
    const field = testUtils.getPriceField(row)

    expect(field).toBeInTheDocument()
    expect(field).toBeEnabled()
  })

  test('Поле валюты отображается и активно', async () => {
    const { user } = render(
      <Form>
        <RelocationEquipmentEditableTable {...props} />
      </Form>,
    )

    await testUtils.clickAddEquipmentButton(user)
    const row = testUtils.getRowByRole()
    const field = testUtils.getCurrencySelect(row)

    expect(field).toBeInTheDocument()
    expect(field).toBeEnabled()
  })

  test('Поле количества отображается и активно', async () => {
    const { user } = render(
      <Form>
        <RelocationEquipmentEditableTable {...props} />
      </Form>,
    )

    await testUtils.clickAddEquipmentButton(user)
    const row = testUtils.getRowByRole()
    const field = testUtils.getQuantityField(row)

    expect(field).toBeInTheDocument()
    expect(field).toBeDisabled()
  })

  describe('Кнопка изображения', () => {
    test('Отображается. Активна если выбрано оборудование', async () => {
      const inventorizationEquipmentListItem = warehouseFixtures.inventorizationEquipmentListItem()

      const { user } = render(
        <Form>
          <RelocationEquipmentEditableTable
            {...props}
            equipments={[inventorizationEquipmentListItem]}
          />
        </Form>,
      )

      await testUtils.clickAddEquipmentButton(user)
      const row = testUtils.getRowByRole()

      await testUtils.openEquipmentSelect(user, row)
      await testUtils.setEquipment(
        user,
        makeString(
          ', ',
          inventorizationEquipmentListItem.equipment.title,
          inventorizationEquipmentListItem.equipment.serialNumber,
          inventorizationEquipmentListItem.equipment.inventoryNumber,
        ),
      )

      const button = testUtils.getAttachmentsButton(row)
      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Не активна если не выбрано оборудование', async () => {
      const { user } = render(
        <Form>
          <RelocationEquipmentEditableTable {...props} />
        </Form>,
      )

      await testUtils.clickAddEquipmentButton(user)
      const row = testUtils.getRowByRole()
      const button = testUtils.getAttachmentsButton(row)
      expect(button).toBeDisabled()
    })

    test('При клике вызывается обработчик', async () => {
      const inventorizationEquipmentListItem = warehouseFixtures.inventorizationEquipmentListItem()

      const { user } = render(
        <Form>
          <RelocationEquipmentEditableTable
            {...props}
            equipments={[inventorizationEquipmentListItem]}
          />
        </Form>,
      )

      await testUtils.clickAddEquipmentButton(user)
      const row = testUtils.getRowByRole()
      await testUtils.openEquipmentSelect(user, row)
      await testUtils.setEquipment(
        user,
        makeString(
          ', ',
          inventorizationEquipmentListItem.equipment.title,
          inventorizationEquipmentListItem.equipment.serialNumber,
          inventorizationEquipmentListItem.equipment.inventoryNumber,
        ),
      )
      await testUtils.clickAttachmentsButton(user, row)

      expect(props.onClickCreateImage).toBeCalledTimes(1)
      expect(props.onClickCreateImage).toBeCalledWith(expect.anything())
    })
  })
})
