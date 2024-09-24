import { within } from '@testing-library/react'
import pick from 'lodash/pick'

import { EquipmentCategoryEnum } from 'modules/warehouse/constants/equipment'

import { undefinedSelectOption } from 'shared/constants/selectField'

import theme from 'styles/theme'

import {
  inventorizationEquipmentListItem,
  props,
} from '_tests_/features/warehouse/components/ReviseEquipmentTable/constants'
import { reviseEquipmentTableTestUtils } from '_tests_/features/warehouse/components/ReviseEquipmentTable/testUtils'
import catalogsFixtures from '_tests_/fixtures/catalogs'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import {
  fakeId,
  fakeIdStr,
  fakeInteger,
  fakeWord,
  iconTestUtils,
  render,
  tableTestUtils,
} from '_tests_/utils'

import ReviseEquipmentTable from './index'

describe('Таблица сверки оборудования', () => {
  test('Отображается', () => {
    render(<ReviseEquipmentTable {...props} />)

    const table = reviseEquipmentTableTestUtils.getContainer()

    expect(table).toBeInTheDocument()
    tableTestUtils.expectPaginationEnabledIn(table)

    props.dataSource.forEach((item) => {
      const row = reviseEquipmentTableTestUtils.getRow(item.id)
      expect(row).toBeInTheDocument()
    })
  })

  test('Пагинация работает', async () => {
    const inventorizationEquipments = warehouseFixtures.inventorizationEquipments(21)

    const { user } = render(
      <ReviseEquipmentTable {...props} dataSource={inventorizationEquipments} />,
    )

    const table = reviseEquipmentTableTestUtils.getContainer()
    await tableTestUtils.clickPaginationNextButtonIn(user, table)

    expect(props.onTableChange).toBeCalledTimes(1)
    expect(props.onTableChange).toBeCalledWith(
      expect.anything(),
      expect.anything(),
      expect.anything(),
      expect.anything(),
    )

    inventorizationEquipments.slice(-1).forEach((item) => {
      const row = reviseEquipmentTableTestUtils.getRow(item.id)
      expect(row).toBeInTheDocument()
    })
  })

  describe('Наименование', () => {
    test('Отображается корректно', () => {
      render(<ReviseEquipmentTable {...props} />)

      const title = reviseEquipmentTableTestUtils.getColTitle('Наименование')
      const input = within(
        reviseEquipmentTableTestUtils.getRow(inventorizationEquipmentListItem.id),
      ).getByDisplayValue(inventorizationEquipmentListItem.equipment.title)

      expect(title).toBeInTheDocument()
      expect(input).toBeInTheDocument()
      expect(input).toBeDisabled()
    })
  })

  describe('Серийный номер', () => {
    test('Отображается корректно', () => {
      render(<ReviseEquipmentTable {...props} />)

      const title = reviseEquipmentTableTestUtils.getColTitle('Серийный номер')
      const input = within(
        reviseEquipmentTableTestUtils.getRow(inventorizationEquipmentListItem.id),
      ).getByDisplayValue(inventorizationEquipmentListItem.equipment.serialNumber)

      expect(title).toBeInTheDocument()
      expect(input).toBeInTheDocument()
      expect(input).toBeDisabled()
    })
  })

  describe('Инвентарный номер', () => {
    test('Отображается корректно', () => {
      render(<ReviseEquipmentTable {...props} />)

      const title = reviseEquipmentTableTestUtils.getColTitle('Инвентарный номер')
      const input = within(
        reviseEquipmentTableTestUtils.getRow(inventorizationEquipmentListItem.id),
      ).getByDisplayValue(inventorizationEquipmentListItem.equipment.inventoryNumber)

      expect(title).toBeInTheDocument()
      expect(input).toBeInTheDocument()
      expect(input).toBeDisabled()
    })
  })

  describe('Плановое местонахождение', () => {
    test('Отображается корректно', () => {
      render(<ReviseEquipmentTable {...props} />)

      const title = reviseEquipmentTableTestUtils.getColTitle('Плановое местонахождение')
      const input = within(
        reviseEquipmentTableTestUtils.getRow(inventorizationEquipmentListItem.id),
      ).getByDisplayValue(inventorizationEquipmentListItem.locationPlan!.title)

      expect(title).toBeInTheDocument()
      expect(input).toBeInTheDocument()
      expect(input).toBeDisabled()
    })
  })

  describe('Количество', () => {
    test('Отображается корректно', () => {
      render(<ReviseEquipmentTable {...props} />)

      const title = reviseEquipmentTableTestUtils.getColTitle('Количество')
      const input = within(
        reviseEquipmentTableTestUtils.getRow(inventorizationEquipmentListItem.id),
      ).getByDisplayValue(inventorizationEquipmentListItem.quantity.plan)

      expect(title).toBeInTheDocument()
      expect(input).toBeInTheDocument()
      expect(input).toBeDisabled()
    })
  })

  describe('Наличие', () => {
    test('Отображается и активно', () => {
      render(<ReviseEquipmentTable {...props} />)

      const title = reviseEquipmentTableTestUtils.getColTitle('Наличие')
      const input = reviseEquipmentTableTestUtils.getQuantityFactInput(
        inventorizationEquipmentListItem.id,
      )

      expect(title).toBeInTheDocument()
      expect(input).toBeInTheDocument()
      expect(input).toBeEnabled()
    })

    test('Можно установить значение', async () => {
      const { user } = render(<ReviseEquipmentTable {...props} />)

      const value = fakeInteger()
      const input = reviseEquipmentTableTestUtils.getQuantityFactInput(
        inventorizationEquipmentListItem.id,
      )
      await user.clear(input)
      await reviseEquipmentTableTestUtils.setQuantityFact(
        user,
        inventorizationEquipmentListItem.id,
        value,
      )
      await user.tab()

      expect(input).toHaveDisplayValue(String(value))
      expect(props.onChangeQuantityFact).toBeCalledTimes(1)
      expect(props.onChangeQuantityFact).toBeCalledWith(
        inventorizationEquipmentListItem,
        value,
        inventorizationEquipmentListItem.locationFact!.id,
      )
    })

    test('Подсвечивается зелёным если значение равно количеству', () => {
      const inventorizationEquipmentListItem = warehouseFixtures.inventorizationEquipmentListItem({
        quantity: { plan: 1, fact: 1, diff: fakeInteger() },
      })

      render(<ReviseEquipmentTable {...props} dataSource={[inventorizationEquipmentListItem]} />)

      const formItem = reviseEquipmentTableTestUtils.getQuantityFactFormItem(
        inventorizationEquipmentListItem.id,
      )
      // eslint-disable-next-line testing-library/no-node-access
      const inputWrapper = formItem.querySelector('.ant-input-number-in-form-item')
      expect(inputWrapper).toHaveStyle({ borderColor: theme.colors.green })
    })

    test('Подсвечивается красным если значение не равно количеству', () => {
      const inventorizationEquipmentListItem = warehouseFixtures.inventorizationEquipmentListItem({
        quantity: { plan: 2, fact: 1, diff: fakeInteger() },
      })

      render(<ReviseEquipmentTable {...props} dataSource={[inventorizationEquipmentListItem]} />)

      const formItem = reviseEquipmentTableTestUtils.getQuantityFactFormItem(
        inventorizationEquipmentListItem.id,
      )
      // eslint-disable-next-line testing-library/no-node-access
      const inputWrapper = formItem.querySelector('.ant-input-number-in-form-item')
      expect(inputWrapper).toHaveClass('ant-input-number-status-error')
    })
  })

  describe('Фактическое местонахождение', () => {
    test('Отображается и активно', () => {
      render(<ReviseEquipmentTable {...props} />)

      const title = reviseEquipmentTableTestUtils.getColTitle('Фактическое местонахождение')
      const select = reviseEquipmentTableTestUtils.getLocationFactSelect(
        inventorizationEquipmentListItem.id,
      )

      expect(title).toBeInTheDocument()
      expect(select).toBeInTheDocument()
      expect(select).toBeEnabled()
    })

    describe('Не активно если условия соблюдены', () => {
      test('Но загружаются местонахождения', () => {
        render(<ReviseEquipmentTable {...props} locationsIsLoading />)
        const select = reviseEquipmentTableTestUtils.getLocationFactSelect(
          inventorizationEquipmentListItem.id,
        )
        expect(select).toBeDisabled()
      })

      test('Но quantityFact=null', () => {
        const inventorizationEquipmentListItem = warehouseFixtures.inventorizationEquipmentListItem(
          {
            quantity: { fact: null, diff: fakeInteger(), plan: fakeInteger() },
            equipment: {
              id: fakeId(),
              title: fakeWord(),
              serialNumber: fakeIdStr(),
              inventoryNumber: fakeIdStr(),
              category: pick(
                warehouseFixtures.equipmentCategory({ code: EquipmentCategoryEnum.Consumable }),
                'id',
                'title',
                'code',
              ),
            },
          },
        )

        render(<ReviseEquipmentTable {...props} dataSource={[inventorizationEquipmentListItem]} />)

        const select = reviseEquipmentTableTestUtils.getLocationFactSelect(
          inventorizationEquipmentListItem.id,
        )
        expect(select).toBeDisabled()
      })

      test('Категория оборудования расходный материал но quantityPlan не равен 0', () => {
        const inventorizationEquipmentListItem = warehouseFixtures.inventorizationEquipmentListItem(
          {
            quantity: { fact: fakeInteger(), diff: fakeInteger(), plan: 1 },
            equipment: {
              id: fakeId(),
              title: fakeWord(),
              serialNumber: fakeIdStr(),
              inventoryNumber: fakeIdStr(),
              category: pick(
                warehouseFixtures.equipmentCategory({ code: EquipmentCategoryEnum.Consumable }),
                'id',
                'title',
                'code',
              ),
            },
          },
        )

        render(<ReviseEquipmentTable {...props} dataSource={[inventorizationEquipmentListItem]} />)

        const select = reviseEquipmentTableTestUtils.getLocationFactSelect(
          inventorizationEquipmentListItem.id,
        )
        expect(select).toBeDisabled()
      })
    })

    test('Устанавливается значение по умолчанию если оно есть', async () => {
      const locationListItem = catalogsFixtures.locationCatalogListItem()
      const inventorizationEquipmentListItem = warehouseFixtures.inventorizationEquipmentListItem({
        locationFact: locationListItem,
      })

      const { user } = render(
        <ReviseEquipmentTable
          {...props}
          locations={[locationListItem]}
          dataSource={[inventorizationEquipmentListItem]}
        />,
      )

      await reviseEquipmentTableTestUtils.openLocationFactSelect(
        user,
        inventorizationEquipmentListItem.id,
      )
      const selectedOption = reviseEquipmentTableTestUtils.getSelectedLocationFact(
        inventorizationEquipmentListItem.id,
      )

      expect(selectedOption).toBeInTheDocument()
      expect(selectedOption).toHaveTextContent(locationListItem.title)
    })

    test(`Устанавливается значение по умолчанию "${undefinedSelectOption.label}" если isLocationFactUndefined=true`, async () => {
      const locationListItem = catalogsFixtures.locationCatalogListItem()
      const inventorizationEquipmentListItem = warehouseFixtures.inventorizationEquipmentListItem({
        isLocationFactUndefined: true,
      })

      const { user } = render(
        <ReviseEquipmentTable
          {...props}
          locations={[locationListItem]}
          dataSource={[inventorizationEquipmentListItem]}
        />,
      )

      await reviseEquipmentTableTestUtils.openLocationFactSelect(
        user,
        inventorizationEquipmentListItem.id,
      )
      const selectedOption = reviseEquipmentTableTestUtils.getSelectedLocationFact(
        inventorizationEquipmentListItem.id,
      )

      expect(selectedOption).toBeInTheDocument()
      expect(selectedOption).toHaveTextContent(undefinedSelectOption.label as string)
    })

    test('Можно установить значение', async () => {
      const locationListItem = catalogsFixtures.locationCatalogListItem()

      const { user } = render(<ReviseEquipmentTable {...props} locations={[locationListItem]} />)

      await reviseEquipmentTableTestUtils.openLocationFactSelect(
        user,
        inventorizationEquipmentListItem.id,
      )
      await reviseEquipmentTableTestUtils.setLocationFact(user, locationListItem.title)
      const selectedOption = reviseEquipmentTableTestUtils.getSelectedLocationFact(
        inventorizationEquipmentListItem.id,
      )

      expect(selectedOption).toBeInTheDocument()
      expect(selectedOption).toHaveTextContent(locationListItem.title)
      expect(props.onChangeLocationFact).toBeCalledTimes(1)
      expect(props.onChangeLocationFact).toBeCalledWith(
        inventorizationEquipmentListItem,
        locationListItem.id,
        inventorizationEquipmentListItem.quantity.fact,
      )
    })

    test('Подсвечивается зелёным если значение равно плановому местонахождению', async () => {
      const locationListItem = catalogsFixtures.locationCatalogListItem()
      const inventorizationEquipmentListItem = warehouseFixtures.inventorizationEquipmentListItem({
        locationFact: locationListItem,
        locationPlan: locationListItem,
      })

      render(
        <ReviseEquipmentTable
          {...props}
          locations={[locationListItem]}
          dataSource={[inventorizationEquipmentListItem]}
        />,
      )

      const formItem = reviseEquipmentTableTestUtils.getLocationFactFormItem(
        inventorizationEquipmentListItem.id,
      )
      // eslint-disable-next-line testing-library/no-node-access
      const select = formItem.querySelector('.ant-select')

      expect(select).toHaveStyle({ borderColor: theme.colors.green })
    })

    test('Подсвечивается красным если значение не равно плановому местонахождению', () => {
      const locationListItem1 = catalogsFixtures.locationCatalogListItem()
      const locationListItem2 = catalogsFixtures.locationCatalogListItem()
      const inventorizationEquipmentListItem = warehouseFixtures.inventorizationEquipmentListItem({
        locationFact: locationListItem1,
        locationPlan: locationListItem2,
      })

      render(
        <ReviseEquipmentTable
          {...props}
          locations={[locationListItem1, locationListItem2]}
          dataSource={[inventorizationEquipmentListItem]}
        />,
      )

      const formItem = reviseEquipmentTableTestUtils.getLocationFactFormItem(
        inventorizationEquipmentListItem.id,
      )
      // eslint-disable-next-line testing-library/no-node-access
      const select = formItem.querySelector('.ant-select')

      expect(select).toHaveClass('ant-select-status-error')
    })
  })

  describe('Индикатор расхождения', () => {
    describe('Иконка восклицательного знака', () => {
      test('Отображается если условия соблюдены', () => {
        const inventorizationEquipmentListItem = warehouseFixtures.inventorizationEquipmentListItem(
          { isFilled: true, hasDiff: true },
        )

        render(<ReviseEquipmentTable {...props} dataSource={[inventorizationEquipmentListItem]} />)

        const row = reviseEquipmentTableTestUtils.getRow(inventorizationEquipmentListItem.id)
        const icon = iconTestUtils.getIconByNameIn(row, 'exclamation-circle')

        expect(icon).toBeInTheDocument()
      })

      test('Не отображается если условия соблюдены но поле isFilled=false', () => {
        const inventorizationEquipmentListItem = warehouseFixtures.inventorizationEquipmentListItem(
          { isFilled: false, hasDiff: true },
        )

        render(<ReviseEquipmentTable {...props} dataSource={[inventorizationEquipmentListItem]} />)

        const row = reviseEquipmentTableTestUtils.getRow(inventorizationEquipmentListItem.id)
        const icon = iconTestUtils.queryIconByNameIn(row, 'exclamation-circle')

        expect(icon).not.toBeInTheDocument()
      })

      test('Не отображается если условия соблюдены но поле hasDiff=null', () => {
        const inventorizationEquipmentListItem = warehouseFixtures.inventorizationEquipmentListItem(
          { isFilled: true, hasDiff: null },
        )

        render(<ReviseEquipmentTable {...props} dataSource={[inventorizationEquipmentListItem]} />)

        const row = reviseEquipmentTableTestUtils.getRow(inventorizationEquipmentListItem.id)
        const icon = iconTestUtils.queryIconByNameIn(row, 'exclamation-circle')

        expect(icon).not.toBeInTheDocument()
      })
    })

    describe('Иконка галочка', () => {
      test('Отображается если условия соблюдены', () => {
        const inventorizationEquipmentListItem = warehouseFixtures.inventorizationEquipmentListItem(
          { isFilled: true, hasDiff: false },
        )

        render(<ReviseEquipmentTable {...props} dataSource={[inventorizationEquipmentListItem]} />)

        const row = reviseEquipmentTableTestUtils.getRow(inventorizationEquipmentListItem.id)
        const icon = iconTestUtils.getIconByNameIn(row, 'check-circle')

        expect(icon).toBeInTheDocument()
      })

      test('Не отображается если условия соблюдены но поле hasDiff=true', () => {
        const inventorizationEquipmentListItem = warehouseFixtures.inventorizationEquipmentListItem(
          { isFilled: true, hasDiff: true },
        )

        render(<ReviseEquipmentTable {...props} dataSource={[inventorizationEquipmentListItem]} />)

        const row = reviseEquipmentTableTestUtils.getRow(inventorizationEquipmentListItem.id)
        const icon = iconTestUtils.queryIconByNameIn(row, 'check-circle')

        expect(icon).not.toBeInTheDocument()
      })

      test('Не отображается если условия соблюдены но поле isFilled=false', () => {
        const inventorizationEquipmentListItem = warehouseFixtures.inventorizationEquipmentListItem(
          { isFilled: false, hasDiff: true },
        )

        render(<ReviseEquipmentTable {...props} dataSource={[inventorizationEquipmentListItem]} />)

        const row = reviseEquipmentTableTestUtils.getRow(inventorizationEquipmentListItem.id)
        const icon = iconTestUtils.queryIconByNameIn(row, 'check-circle')

        expect(icon).not.toBeInTheDocument()
      })

      test('Не отображается если условия соблюдены но поле hasDiff=null', () => {
        const inventorizationEquipmentListItem = warehouseFixtures.inventorizationEquipmentListItem(
          { isFilled: true, hasDiff: null },
        )

        render(<ReviseEquipmentTable {...props} dataSource={[inventorizationEquipmentListItem]} />)

        const row = reviseEquipmentTableTestUtils.getRow(inventorizationEquipmentListItem.id)
        const icon = iconTestUtils.queryIconByNameIn(row, 'check-circle')

        expect(icon).not.toBeInTheDocument()
      })
    })
  })
})
