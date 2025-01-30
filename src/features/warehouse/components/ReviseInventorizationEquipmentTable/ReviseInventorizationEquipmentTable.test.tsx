import { within } from '@testing-library/react'
import pick from 'lodash/pick'

import { EquipmentCategoryEnum } from 'features/warehouse/constants/equipment'

import { undefinedSelectOption } from 'shared/constants/selectField'

import theme from 'styles/theme'

import {
  inventorizationEquipmentListItem,
  props,
} from '_tests_/features/warehouse/components/ReviseInventorizationEquipmentTable/constants'
import { reviseEquipmentTableTestUtils as testUtils } from '_tests_/features/warehouse/components/ReviseInventorizationEquipmentTable/testUtils'
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

import ReviseInventorizationEquipmentTable from './index'

describe('Таблица сверки оборудования', () => {
  test('Отображается', () => {
    render(<ReviseInventorizationEquipmentTable {...props} />)

    const table = testUtils.getContainer()

    expect(table).toBeInTheDocument()
    tableTestUtils.expectPaginationEnabledIn(table)

    props.dataSource.forEach((item) => {
      const row = testUtils.getRow(item.id)
      expect(row).toBeInTheDocument()
    })
  })

  test('Пагинация работает', async () => {
    const inventorizationEquipments = warehouseFixtures.inventorizationEquipments(21)

    const { user } = render(
      <ReviseInventorizationEquipmentTable {...props} dataSource={inventorizationEquipments} />,
    )

    const table = testUtils.getContainer()
    await tableTestUtils.clickPaginationNextButtonIn(user, table)

    expect(props.onTableChange).toBeCalledTimes(1)
    expect(props.onTableChange).toBeCalledWith(
      expect.anything(),
      expect.anything(),
      expect.anything(),
      expect.anything(),
    )

    inventorizationEquipments.slice(-1).forEach((item) => {
      const row = testUtils.getRow(item.id)
      expect(row).toBeInTheDocument()
    })
  })

  describe('Наименование', () => {
    test('Отображается корректно', () => {
      render(<ReviseInventorizationEquipmentTable {...props} />)

      const title = testUtils.getColTitle('Наименование')
      const input = within(testUtils.getRow(inventorizationEquipmentListItem.id)).getByDisplayValue(
        inventorizationEquipmentListItem.equipment.title,
      )

      expect(title).toBeInTheDocument()
      expect(input).toBeInTheDocument()
      expect(input).toBeDisabled()
    })
  })

  describe('Серийный номер', () => {
    test('Отображается корректно', () => {
      render(<ReviseInventorizationEquipmentTable {...props} />)

      const title = testUtils.getColTitle('Серийный номер')
      const input = within(testUtils.getRow(inventorizationEquipmentListItem.id)).getByDisplayValue(
        inventorizationEquipmentListItem.equipment.serialNumber!,
      )

      expect(title).toBeInTheDocument()
      expect(input).toBeInTheDocument()
      expect(input).toBeDisabled()
    })
  })

  describe('Инвентарный номер', () => {
    test('Отображается корректно', () => {
      render(<ReviseInventorizationEquipmentTable {...props} />)

      const title = testUtils.getColTitle('Инвентарный номер')
      const input = within(testUtils.getRow(inventorizationEquipmentListItem.id)).getByDisplayValue(
        inventorizationEquipmentListItem.equipment.inventoryNumber!,
      )

      expect(title).toBeInTheDocument()
      expect(input).toBeInTheDocument()
      expect(input).toBeDisabled()
    })
  })

  describe('Плановое местонахождение', () => {
    test('Отображается корректно', () => {
      render(<ReviseInventorizationEquipmentTable {...props} />)

      const title = testUtils.getColTitle('Плановое местонахождение')
      const input = within(testUtils.getRow(inventorizationEquipmentListItem.id)).getByDisplayValue(
        inventorizationEquipmentListItem.locationPlan!.title,
      )

      expect(title).toBeInTheDocument()
      expect(input).toBeInTheDocument()
      expect(input).toBeDisabled()
    })
  })

  describe('Количество', () => {
    test('Отображается корректно', () => {
      render(<ReviseInventorizationEquipmentTable {...props} />)

      const title = testUtils.getColTitle('Количество')
      const input = within(testUtils.getRow(inventorizationEquipmentListItem.id)).getByDisplayValue(
        inventorizationEquipmentListItem.quantity.plan,
      )

      expect(title).toBeInTheDocument()
      expect(input).toBeInTheDocument()
      expect(input).toBeDisabled()
    })
  })

  describe('Наличие', () => {
    test('Отображается и активно', () => {
      render(<ReviseInventorizationEquipmentTable {...props} />)

      const title = testUtils.getColTitle('Наличие')
      const input = testUtils.getQuantityFactInput(inventorizationEquipmentListItem.id)

      expect(title).toBeInTheDocument()
      expect(input).toBeInTheDocument()
      expect(input).toBeEnabled()
    })

    test('Можно установить значение', async () => {
      const { user } = render(<ReviseInventorizationEquipmentTable {...props} />)

      const value = fakeInteger()
      const input = testUtils.getQuantityFactInput(inventorizationEquipmentListItem.id)
      await user.clear(input)
      await testUtils.setQuantityFact(user, inventorizationEquipmentListItem.id, value)
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

      render(
        <ReviseInventorizationEquipmentTable
          {...props}
          dataSource={[inventorizationEquipmentListItem]}
        />,
      )

      const formItem = testUtils.getQuantityFactFormItem(inventorizationEquipmentListItem.id)
      // eslint-disable-next-line testing-library/no-node-access
      const inputWrapper = formItem.querySelector('.ant-input-number-in-form-item')
      expect(inputWrapper).toHaveStyle({ borderColor: theme.colors.green })
    })

    test('Подсвечивается красным если значение не равно количеству', () => {
      const inventorizationEquipmentListItem = warehouseFixtures.inventorizationEquipmentListItem({
        quantity: { plan: 2, fact: 1, diff: fakeInteger() },
      })

      render(
        <ReviseInventorizationEquipmentTable
          {...props}
          dataSource={[inventorizationEquipmentListItem]}
        />,
      )

      const formItem = testUtils.getQuantityFactFormItem(inventorizationEquipmentListItem.id)
      // eslint-disable-next-line testing-library/no-node-access
      const inputWrapper = formItem.querySelector('.ant-input-number-in-form-item')
      expect(inputWrapper).toHaveClass('ant-input-number-status-error')
    })
  })

  describe('Фактическое местонахождение', () => {
    test('Отображается и активно', () => {
      render(<ReviseInventorizationEquipmentTable {...props} />)

      const title = testUtils.getColTitle('Фактическое местонахождение')
      const select = testUtils.getLocationFactSelect(inventorizationEquipmentListItem.id)

      expect(title).toBeInTheDocument()
      expect(select).toBeInTheDocument()
      expect(select).toBeEnabled()
    })

    describe('Не активно если условия соблюдены', () => {
      test('Но загружаются местонахождения', () => {
        render(<ReviseInventorizationEquipmentTable {...props} locationsIsLoading />)
        const select = testUtils.getLocationFactSelect(inventorizationEquipmentListItem.id)
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

        render(
          <ReviseInventorizationEquipmentTable
            {...props}
            dataSource={[inventorizationEquipmentListItem]}
          />,
        )

        const select = testUtils.getLocationFactSelect(inventorizationEquipmentListItem.id)
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

        render(
          <ReviseInventorizationEquipmentTable
            {...props}
            dataSource={[inventorizationEquipmentListItem]}
          />,
        )

        const select = testUtils.getLocationFactSelect(inventorizationEquipmentListItem.id)
        expect(select).toBeDisabled()
      })
    })

    test('Устанавливается значение по умолчанию если оно есть', async () => {
      const locationCatalogListItem = catalogsFixtures.locationCatalogListItem()
      const inventorizationEquipmentListItem = warehouseFixtures.inventorizationEquipmentListItem({
        locationFact: locationCatalogListItem,
      })

      const { user } = render(
        <ReviseInventorizationEquipmentTable
          {...props}
          locations={[locationCatalogListItem]}
          dataSource={[inventorizationEquipmentListItem]}
        />,
      )

      await testUtils.openLocationFactSelect(user, inventorizationEquipmentListItem.id)
      const selectedOption = testUtils.getSelectedLocationFact(inventorizationEquipmentListItem.id)

      expect(selectedOption).toBeInTheDocument()
      expect(selectedOption).toHaveTextContent(locationCatalogListItem.title)
    })

    test(`Устанавливается значение по умолчанию "${undefinedSelectOption.label}" если isLocationFactUndefined=true`, async () => {
      const locationCatalogListItem = catalogsFixtures.locationCatalogListItem()
      const inventorizationEquipmentListItem = warehouseFixtures.inventorizationEquipmentListItem({
        isLocationFactUndefined: true,
      })

      const { user } = render(
        <ReviseInventorizationEquipmentTable
          {...props}
          locations={[locationCatalogListItem]}
          dataSource={[inventorizationEquipmentListItem]}
        />,
      )

      await testUtils.openLocationFactSelect(user, inventorizationEquipmentListItem.id)
      const selectedOption = testUtils.getSelectedLocationFact(inventorizationEquipmentListItem.id)

      expect(selectedOption).toBeInTheDocument()
      expect(selectedOption).toHaveTextContent(undefinedSelectOption.label as string)
    })

    test('Можно установить значение', async () => {
      const locationCatalogListItem = catalogsFixtures.locationCatalogListItem()

      const { user } = render(
        <ReviseInventorizationEquipmentTable {...props} locations={[locationCatalogListItem]} />,
      )

      await testUtils.openLocationFactSelect(user, inventorizationEquipmentListItem.id)
      await testUtils.setLocationFact(user, locationCatalogListItem.title)
      const selectedOption = testUtils.getSelectedLocationFact(inventorizationEquipmentListItem.id)

      expect(selectedOption).toBeInTheDocument()
      expect(selectedOption).toHaveTextContent(locationCatalogListItem.title)
      expect(props.onChangeLocationFact).toBeCalledTimes(1)
      expect(props.onChangeLocationFact).toBeCalledWith(
        inventorizationEquipmentListItem,
        locationCatalogListItem.id,
        inventorizationEquipmentListItem.quantity.fact,
      )
    })

    test('Подсвечивается зелёным если значение равно плановому местонахождению', async () => {
      const locationCatalogListItem = catalogsFixtures.locationCatalogListItem()
      const inventorizationEquipmentListItem = warehouseFixtures.inventorizationEquipmentListItem({
        locationFact: locationCatalogListItem,
        locationPlan: locationCatalogListItem,
      })

      render(
        <ReviseInventorizationEquipmentTable
          {...props}
          locations={[locationCatalogListItem]}
          dataSource={[inventorizationEquipmentListItem]}
        />,
      )

      const formItem = testUtils.getLocationFactFormItem(inventorizationEquipmentListItem.id)
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
        <ReviseInventorizationEquipmentTable
          {...props}
          locations={[locationListItem1, locationListItem2]}
          dataSource={[inventorizationEquipmentListItem]}
        />,
      )

      const formItem = testUtils.getLocationFactFormItem(inventorizationEquipmentListItem.id)
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

        render(
          <ReviseInventorizationEquipmentTable
            {...props}
            dataSource={[inventorizationEquipmentListItem]}
          />,
        )

        const row = testUtils.getRow(inventorizationEquipmentListItem.id)
        const icon = iconTestUtils.getIconByNameIn(row, 'exclamation-circle')

        expect(icon).toBeInTheDocument()
      })

      test('Не отображается если условия соблюдены но поле isFilled=false', () => {
        const inventorizationEquipmentListItem = warehouseFixtures.inventorizationEquipmentListItem(
          { isFilled: false, hasDiff: true },
        )

        render(
          <ReviseInventorizationEquipmentTable
            {...props}
            dataSource={[inventorizationEquipmentListItem]}
          />,
        )

        const row = testUtils.getRow(inventorizationEquipmentListItem.id)
        const icon = iconTestUtils.queryIconByNameIn(row, 'exclamation-circle')

        expect(icon).not.toBeInTheDocument()
      })

      test('Не отображается если условия соблюдены но поле hasDiff=null', () => {
        const inventorizationEquipmentListItem = warehouseFixtures.inventorizationEquipmentListItem(
          { isFilled: true, hasDiff: null },
        )

        render(
          <ReviseInventorizationEquipmentTable
            {...props}
            dataSource={[inventorizationEquipmentListItem]}
          />,
        )

        const row = testUtils.getRow(inventorizationEquipmentListItem.id)
        const icon = iconTestUtils.queryIconByNameIn(row, 'exclamation-circle')

        expect(icon).not.toBeInTheDocument()
      })
    })

    describe('Иконка галочка', () => {
      test('Отображается если условия соблюдены', () => {
        const inventorizationEquipmentListItem = warehouseFixtures.inventorizationEquipmentListItem(
          { isFilled: true, hasDiff: false },
        )

        render(
          <ReviseInventorizationEquipmentTable
            {...props}
            dataSource={[inventorizationEquipmentListItem]}
          />,
        )

        const row = testUtils.getRow(inventorizationEquipmentListItem.id)
        const icon = iconTestUtils.getIconByNameIn(row, 'check-circle')

        expect(icon).toBeInTheDocument()
      })

      test('Не отображается если условия соблюдены но поле hasDiff=true', () => {
        const inventorizationEquipmentListItem = warehouseFixtures.inventorizationEquipmentListItem(
          { isFilled: true, hasDiff: true },
        )

        render(
          <ReviseInventorizationEquipmentTable
            {...props}
            dataSource={[inventorizationEquipmentListItem]}
          />,
        )

        const row = testUtils.getRow(inventorizationEquipmentListItem.id)
        const icon = iconTestUtils.queryIconByNameIn(row, 'check-circle')

        expect(icon).not.toBeInTheDocument()
      })

      test('Не отображается если условия соблюдены но поле isFilled=false', () => {
        const inventorizationEquipmentListItem = warehouseFixtures.inventorizationEquipmentListItem(
          { isFilled: false, hasDiff: true },
        )

        render(
          <ReviseInventorizationEquipmentTable
            {...props}
            dataSource={[inventorizationEquipmentListItem]}
          />,
        )

        const row = testUtils.getRow(inventorizationEquipmentListItem.id)
        const icon = iconTestUtils.queryIconByNameIn(row, 'check-circle')

        expect(icon).not.toBeInTheDocument()
      })

      test('Не отображается если условия соблюдены но поле hasDiff=null', () => {
        const inventorizationEquipmentListItem = warehouseFixtures.inventorizationEquipmentListItem(
          { isFilled: true, hasDiff: null },
        )

        render(
          <ReviseInventorizationEquipmentTable
            {...props}
            dataSource={[inventorizationEquipmentListItem]}
          />,
        )

        const row = testUtils.getRow(inventorizationEquipmentListItem.id)
        const icon = iconTestUtils.queryIconByNameIn(row, 'check-circle')

        expect(icon).not.toBeInTheDocument()
      })
    })
  })
})
