import { Form } from 'antd'

import { makeString } from 'shared/utils/string'

import { props } from '_tests_/features/warehouses/components/RelocationEquipmentDraftEditableTable/constants'
import { relocationEquipmentDraftEditableTableTestUtils } from '_tests_/features/warehouses/components/RelocationEquipmentDraftEditableTable/testUtils'
import warehousesFixtures from '_tests_/fixtures/warehouse'
import { render, tableTestUtils } from '_tests_/helpers'

import RelocationEquipmentEditableTable from './index'

describe('Таблица добавления оборудования для перемещения', () => {
  test('Все колонки отображаются', async () => {
    const { user } = render(
      <Form>
        <RelocationEquipmentEditableTable {...props} />
      </Form>,
    )

    await relocationEquipmentDraftEditableTableTestUtils.clickAddEquipmentButton(user)
    const container = relocationEquipmentDraftEditableTableTestUtils.getContainer()
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

    await relocationEquipmentDraftEditableTableTestUtils.clickAddEquipmentButton(user)
    const row = relocationEquipmentDraftEditableTableTestUtils.getRowByRole()
    expect(row).toBeInTheDocument()
  })

  test('Кнопка удаления оборудование удаляет добавленную строку', async () => {
    const { user } = render(
      <Form>
        <RelocationEquipmentEditableTable {...props} />
      </Form>,
    )

    await relocationEquipmentDraftEditableTableTestUtils.clickAddEquipmentButton(user)
    const row = relocationEquipmentDraftEditableTableTestUtils.getRowByRole()
    await relocationEquipmentDraftEditableTableTestUtils.clickDeleteEquipmentButton(user, row)
    expect(row).not.toBeInTheDocument()
  })

  test('Поле оборудования отображается и активно', async () => {
    const { user } = render(
      <Form>
        <RelocationEquipmentEditableTable {...props} />
      </Form>,
    )

    await relocationEquipmentDraftEditableTableTestUtils.clickAddEquipmentButton(user)
    const row = relocationEquipmentDraftEditableTableTestUtils.getRowByRole()
    const field = relocationEquipmentDraftEditableTableTestUtils.getEquipmentSelect(row)

    expect(field).toBeInTheDocument()
    expect(field).toBeEnabled()
  })

  test('Поле серийного номера отображается и не активно', async () => {
    const { user } = render(
      <Form>
        <RelocationEquipmentEditableTable {...props} />
      </Form>,
    )

    await relocationEquipmentDraftEditableTableTestUtils.clickAddEquipmentButton(user)
    const row = relocationEquipmentDraftEditableTableTestUtils.getRowByRole()
    const field = relocationEquipmentDraftEditableTableTestUtils.getSerialNumberField(row)

    expect(field).toBeInTheDocument()
    expect(field).toBeDisabled()
  })

  test('Поле состояния отображается и активно', async () => {
    const { user } = render(
      <Form>
        <RelocationEquipmentEditableTable {...props} />
      </Form>,
    )

    await relocationEquipmentDraftEditableTableTestUtils.clickAddEquipmentButton(user)
    const row = relocationEquipmentDraftEditableTableTestUtils.getRowByRole()
    const field = relocationEquipmentDraftEditableTableTestUtils.getConditionSelect(row)

    expect(field).toBeInTheDocument()
    expect(field).toBeEnabled()
  })

  test('Поле стоимости отображается и активно', async () => {
    const { user } = render(
      <Form>
        <RelocationEquipmentEditableTable {...props} />
      </Form>,
    )

    await relocationEquipmentDraftEditableTableTestUtils.clickAddEquipmentButton(user)
    const row = relocationEquipmentDraftEditableTableTestUtils.getRowByRole()
    const field = relocationEquipmentDraftEditableTableTestUtils.getPriceField(row)

    expect(field).toBeInTheDocument()
    expect(field).toBeEnabled()
  })

  test('Поле валюты отображается и активно', async () => {
    const { user } = render(
      <Form>
        <RelocationEquipmentEditableTable {...props} />
      </Form>,
    )

    await relocationEquipmentDraftEditableTableTestUtils.clickAddEquipmentButton(user)
    const row = relocationEquipmentDraftEditableTableTestUtils.getRowByRole()
    const field = relocationEquipmentDraftEditableTableTestUtils.getCurrencySelect(row)

    expect(field).toBeInTheDocument()
    expect(field).toBeEnabled()
  })

  test('Поле количества отображается и активно', async () => {
    const { user } = render(
      <Form>
        <RelocationEquipmentEditableTable {...props} />
      </Form>,
    )

    await relocationEquipmentDraftEditableTableTestUtils.clickAddEquipmentButton(user)
    const row = relocationEquipmentDraftEditableTableTestUtils.getRowByRole()
    const field = relocationEquipmentDraftEditableTableTestUtils.getQuantityField(row)

    expect(field).toBeInTheDocument()
    expect(field).toBeDisabled()
  })

  describe('Кнопка изображения', () => {
    test('Отображается. Активна если выбрано оборудование', async () => {
      const inventorizationEquipmentListItem = warehousesFixtures.inventorizationEquipmentListItem()

      const { user } = render(
        <Form>
          <RelocationEquipmentEditableTable
            {...props}
            equipments={[inventorizationEquipmentListItem]}
          />
        </Form>,
      )

      await relocationEquipmentDraftEditableTableTestUtils.clickAddEquipmentButton(user)
      const row = relocationEquipmentDraftEditableTableTestUtils.getRowByRole()

      await relocationEquipmentDraftEditableTableTestUtils.openEquipmentSelect(user, row)
      await relocationEquipmentDraftEditableTableTestUtils.setEquipment(
        user,
        makeString(
          ', ',
          inventorizationEquipmentListItem.equipment.title,
          inventorizationEquipmentListItem.equipment.serialNumber,
          inventorizationEquipmentListItem.equipment.inventoryNumber,
        ),
      )

      const button = relocationEquipmentDraftEditableTableTestUtils.getAttachmentsButton(row)
      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Не активна если не выбрано оборудование', async () => {
      const { user } = render(
        <Form>
          <RelocationEquipmentEditableTable {...props} />
        </Form>,
      )

      await relocationEquipmentDraftEditableTableTestUtils.clickAddEquipmentButton(user)
      const row = relocationEquipmentDraftEditableTableTestUtils.getRowByRole()
      const button = relocationEquipmentDraftEditableTableTestUtils.getAttachmentsButton(row)
      expect(button).toBeDisabled()
    })

    test('При клике вызывается обработчик', async () => {
      const inventorizationEquipmentListItem = warehousesFixtures.inventorizationEquipmentListItem()

      const { user } = render(
        <Form>
          <RelocationEquipmentEditableTable
            {...props}
            equipments={[inventorizationEquipmentListItem]}
          />
        </Form>,
      )

      await relocationEquipmentDraftEditableTableTestUtils.clickAddEquipmentButton(user)
      const row = relocationEquipmentDraftEditableTableTestUtils.getRowByRole()
      await relocationEquipmentDraftEditableTableTestUtils.openEquipmentSelect(user, row)
      await relocationEquipmentDraftEditableTableTestUtils.setEquipment(
        user,
        makeString(
          ', ',
          inventorizationEquipmentListItem.equipment.title,
          inventorizationEquipmentListItem.equipment.serialNumber,
          inventorizationEquipmentListItem.equipment.inventoryNumber,
        ),
      )
      await relocationEquipmentDraftEditableTableTestUtils.clickAttachmentsButton(user, row)

      expect(props.onClickCreateImage).toBeCalledTimes(1)
      expect(props.onClickCreateImage).toBeCalledWith(expect.anything())
    })
  })
})
