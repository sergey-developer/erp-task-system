import { within } from '@testing-library/react'
import { EquipmentCategoryEnum } from 'features/equipments/api/constants'
import pick from 'lodash/pick'

import { undefinedSelectOption } from 'shared/constants/selectField'

import theme from 'styles/theme'

import {
  inventorizationEquipmentListItem,
  props,
} from '_tests_/features/warehouses/components/ReviseInventorizationEquipmentTable/constants'
import { reviseEquipmentTableTestUtils as testUtils } from '_tests_/features/warehouses/components/ReviseInventorizationEquipmentTable/testUtils'
import catalogsFixtures from '_tests_/fixtures/catalogs'
import equipmentsFixtures from '_tests_/fixtures/equipments'
import inventorizationsFixtures from '_tests_/fixtures/inventorizations'
import {
  fakeId,
  fakeIdStr,
  fakeInteger,
  fakeWord,
  iconTestUtils,
  render,
  tableTestUtils,
} from '_tests_/helpers'

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
    const inventorizationEquipments = inventorizationsFixtures.inventorizationEquipments(21)

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
      const inventorizationEquipmentListItem = inventorizationsFixtures.inventorizationEquipment({
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
      const inventorizationEquipmentListItem = inventorizationsFixtures.inventorizationEquipment({
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
        const inventorizationEquipmentListItem = inventorizationsFixtures.inventorizationEquipment({
          quantity: { fact: null, diff: fakeInteger(), plan: fakeInteger() },
          equipment: {
            id: fakeId(),
            title: fakeWord(),
            serialNumber: fakeIdStr(),
            inventoryNumber: fakeIdStr(),
            category: pick(
              equipmentsFixtures.equipmentCategory({ code: EquipmentCategoryEnum.Consumable }),
              'id',
              'title',
              'code',
            ),
          },
        })

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
        const inventorizationEquipmentListItem = inventorizationsFixtures.inventorizationEquipment({
          quantity: { fact: fakeInteger(), diff: fakeInteger(), plan: 1 },
          equipment: {
            id: fakeId(),
            title: fakeWord(),
            serialNumber: fakeIdStr(),
            inventoryNumber: fakeIdStr(),
            category: pick(
              equipmentsFixtures.equipmentCategory({ code: EquipmentCategoryEnum.Consumable }),
              'id',
              'title',
              'code',
            ),
          },
        })

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
      const locationCatalogItem = catalogsFixtures.locationCatalogItem()
      const inventorizationEquipmentListItem = inventorizationsFixtures.inventorizationEquipment({
        locationFact: locationCatalogItem,
      })

      const { user } = render(
        <ReviseInventorizationEquipmentTable
          {...props}
          locations={[locationCatalogItem]}
          dataSource={[inventorizationEquipmentListItem]}
        />,
      )

      await testUtils.openLocationFactSelect(user, inventorizationEquipmentListItem.id)
      const selectedOption = testUtils.getSelectedLocationFact(inventorizationEquipmentListItem.id)

      expect(selectedOption).toBeInTheDocument()
      expect(selectedOption).toHaveTextContent(locationCatalogItem.title)
    })

    test(`Устанавливается значение по умолчанию "${undefinedSelectOption.label}" если isLocationFactUndefined=true`, async () => {
      const locationCatalogItem = catalogsFixtures.locationCatalogItem()
      const inventorizationEquipmentListItem = inventorizationsFixtures.inventorizationEquipment({
        isLocationFactUndefined: true,
      })

      const { user } = render(
        <ReviseInventorizationEquipmentTable
          {...props}
          locations={[locationCatalogItem]}
          dataSource={[inventorizationEquipmentListItem]}
        />,
      )

      await testUtils.openLocationFactSelect(user, inventorizationEquipmentListItem.id)
      const selectedOption = testUtils.getSelectedLocationFact(inventorizationEquipmentListItem.id)

      expect(selectedOption).toBeInTheDocument()
      expect(selectedOption).toHaveTextContent(undefinedSelectOption.label as string)
    })

    test('Можно установить значение', async () => {
      const locationCatalogItem = catalogsFixtures.locationCatalogItem()

      const { user } = render(
        <ReviseInventorizationEquipmentTable {...props} locations={[locationCatalogItem]} />,
      )

      await testUtils.openLocationFactSelect(user, inventorizationEquipmentListItem.id)
      await testUtils.setLocationFact(user, locationCatalogItem.title)
      const selectedOption = testUtils.getSelectedLocationFact(inventorizationEquipmentListItem.id)

      expect(selectedOption).toBeInTheDocument()
      expect(selectedOption).toHaveTextContent(locationCatalogItem.title)
      expect(props.onChangeLocationFact).toBeCalledTimes(1)
      expect(props.onChangeLocationFact).toBeCalledWith(
        inventorizationEquipmentListItem,
        locationCatalogItem.id,
        inventorizationEquipmentListItem.quantity.fact,
      )
    })

    test('Подсвечивается зелёным если значение равно плановому местонахождению', async () => {
      const locationCatalogItem = catalogsFixtures.locationCatalogItem()
      const inventorizationEquipmentListItem = inventorizationsFixtures.inventorizationEquipment({
        locationFact: locationCatalogItem,
        locationPlan: locationCatalogItem,
      })

      render(
        <ReviseInventorizationEquipmentTable
          {...props}
          locations={[locationCatalogItem]}
          dataSource={[inventorizationEquipmentListItem]}
        />,
      )

      const formItem = testUtils.getLocationFactFormItem(inventorizationEquipmentListItem.id)
      // eslint-disable-next-line testing-library/no-node-access
      const select = formItem.querySelector('.ant-select')

      expect(select).toHaveStyle({ borderColor: theme.colors.green })
    })

    test('Подсвечивается красным если значение не равно плановому местонахождению', () => {
      const locationListItem1 = catalogsFixtures.locationCatalogItem()
      const locationListItem2 = catalogsFixtures.locationCatalogItem()
      const inventorizationEquipmentListItem = inventorizationsFixtures.inventorizationEquipment({
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
        const inventorizationEquipmentListItem = inventorizationsFixtures.inventorizationEquipment({
          isFilled: true,
          hasDiff: true,
        })

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
        const inventorizationEquipmentListItem = inventorizationsFixtures.inventorizationEquipment({
          isFilled: false,
          hasDiff: true,
        })

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
        const inventorizationEquipmentListItem = inventorizationsFixtures.inventorizationEquipment({
          isFilled: true,
          hasDiff: null,
        })

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
        const inventorizationEquipmentListItem = inventorizationsFixtures.inventorizationEquipment({
          isFilled: true,
          hasDiff: false,
        })

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
        const inventorizationEquipmentListItem = inventorizationsFixtures.inventorizationEquipment({
          isFilled: true,
          hasDiff: true,
        })

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
        const inventorizationEquipmentListItem = inventorizationsFixtures.inventorizationEquipment({
          isFilled: false,
          hasDiff: true,
        })

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
        const inventorizationEquipmentListItem = inventorizationsFixtures.inventorizationEquipment({
          isFilled: true,
          hasDiff: null,
        })

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
