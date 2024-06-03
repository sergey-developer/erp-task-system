import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import pick from 'lodash/pick'

import { EquipmentCategoryEnum } from 'modules/warehouse/constants/equipment'

import { IdType } from 'shared/types/common'
import { MaybeNull, NumberOrString } from 'shared/types/utils'

import catalogsFixtures from '_tests_/fixtures/catalogs'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import {
  fakeId,
  fakeIdStr,
  fakeInteger,
  fakeWord,
  iconTestUtils,
  render,
  selectTestUtils,
  tableTestUtils,
} from '_tests_/utils'

import ReviseEquipmentTable from './index'
import { ReviseEquipmentTableProps } from './types'

const inventorizationEquipmentListItem = warehouseFixtures.inventorizationEquipmentListItem()

const props: ReviseEquipmentTableProps = {
  dataSource: [inventorizationEquipmentListItem],
  pagination: {},
  loading: false,

  locations: [],
  locationsIsLoading: false,

  onTableChange: jest.fn(),
}

const getContainer = () => screen.getByTestId('revise-equipment-table')

const getRow = (id: IdType) => tableTestUtils.getRowIn(getContainer(), id)

const clickRow = async (user: UserEvent, id: IdType) =>
  tableTestUtils.clickRowIn(getContainer(), user, id)

const getHeadCell = (text: string) => tableTestUtils.getHeadCell(getContainer(), text)

const getColTitle = (text: string) => within(getContainer()).getByText(text)
const getColValue = (id: IdType, value: NumberOrString): MaybeNull<HTMLElement> => {
  const row = getRow(id)
  return row ? within(row).getByText(value) : null
}

// loading
const expectLoadingStarted = () => tableTestUtils.expectLoadingStarted(getContainer())
const expectLoadingFinished = () => tableTestUtils.expectLoadingFinished(getContainer())

// location fact
const getLocationFactFormItem = (id: IdType) =>
  within(getRow(id)).getByTestId('location-fact-form-item')

const getLocationFactSelect = (id: IdType) => selectTestUtils.getSelect(getLocationFactFormItem(id))

const openLocationFactSelect = (user: UserEvent, id: IdType) =>
  selectTestUtils.openSelect(user, testUtils.getLocationFactFormItem(id))

const getSelectedLocationFact = (id: IdType) =>
  selectTestUtils.getSelectedOption(getLocationFactFormItem(id))

export const testUtils = {
  getContainer,

  getRow,
  clickRow,
  getHeadCell,
  getColTitle,
  getColValue,

  expectLoadingStarted,
  expectLoadingFinished,

  getLocationFactFormItem,
  getLocationFactSelect,
  openLocationFactSelect,
  getSelectedLocationFact,
}

describe('Таблица сверки оборудования', () => {
  test('Отображается', () => {
    render(<ReviseEquipmentTable {...props} />)

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
      <ReviseEquipmentTable {...props} dataSource={inventorizationEquipments} />,
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
      render(<ReviseEquipmentTable {...props} />)

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
      render(<ReviseEquipmentTable {...props} />)

      const title = testUtils.getColTitle('Серийный номер')
      const input = within(testUtils.getRow(inventorizationEquipmentListItem.id)).getByDisplayValue(
        inventorizationEquipmentListItem.equipment.serialNumber,
      )

      expect(title).toBeInTheDocument()
      expect(input).toBeInTheDocument()
      expect(input).toBeDisabled()
    })
  })

  describe('Инвентарный номер', () => {
    test('Отображается корректно', () => {
      render(<ReviseEquipmentTable {...props} />)

      const title = testUtils.getColTitle('Инвентарный номер')
      const input = within(testUtils.getRow(inventorizationEquipmentListItem.id)).getByDisplayValue(
        inventorizationEquipmentListItem.equipment.inventoryNumber,
      )

      expect(title).toBeInTheDocument()
      expect(input).toBeInTheDocument()
      expect(input).toBeDisabled()
    })
  })

  describe('Плановое местонахождение', () => {
    test('Отображается корректно', () => {
      render(<ReviseEquipmentTable {...props} />)

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
      render(<ReviseEquipmentTable {...props} />)

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
    test('Отображается корректно', () => {
      render(<ReviseEquipmentTable {...props} />)

      const title = testUtils.getColTitle('Наличие')
      const input = within(testUtils.getRow(inventorizationEquipmentListItem.id)).getByDisplayValue(
        inventorizationEquipmentListItem.quantity.fact!,
      )

      expect(title).toBeInTheDocument()
      expect(input).toBeInTheDocument()
      expect(input).toBeEnabled()
    })

    test.todo('Можно установить значение')

    // todo: доделать
    test.skip('Подсвечивается зелёным если значение равно количеству', () => {
      const inventorizationEquipmentListItem = warehouseFixtures.inventorizationEquipmentListItem({
        quantity: { plan: 1, fact: 1, diff: fakeInteger() },
      })

      render(<ReviseEquipmentTable {...props} dataSource={[inventorizationEquipmentListItem]} />)

      const input = within(testUtils.getRow(inventorizationEquipmentListItem.id)).getByRole(
        'textbox',
      )

      expect(input).toBeInTheDocument()
    })

    test.todo('Подсвечивается красным если значение не равно количеству')
  })

  describe('Фактическое местонахождение', () => {
    test('Отображается и активно', () => {
      render(<ReviseEquipmentTable {...props} />)

      const title = testUtils.getColTitle('Фактическое местонахождение')
      const select = testUtils.getLocationFactSelect(inventorizationEquipmentListItem.id)

      expect(title).toBeInTheDocument()
      expect(select).toBeInTheDocument()
      expect(select).toBeEnabled()
    })

    describe('Не активно если условия соблюдены', () => {
      test('Но загружаются местонахождения', () => {
        render(<ReviseEquipmentTable {...props} locationsIsLoading />)
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

        render(<ReviseEquipmentTable {...props} dataSource={[inventorizationEquipmentListItem]} />)

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

        render(<ReviseEquipmentTable {...props} dataSource={[inventorizationEquipmentListItem]} />)

        const select = testUtils.getLocationFactSelect(inventorizationEquipmentListItem.id)
        expect(select).toBeDisabled()
      })
    })

    test('Устанавливается значение по умолчанию если оно есть', async () => {
      const locationListItem = catalogsFixtures.locationListItem()
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

      await testUtils.openLocationFactSelect(user, inventorizationEquipmentListItem.id)
      const selectedOption = testUtils.getSelectedLocationFact(inventorizationEquipmentListItem.id)

      expect(selectedOption).toBeInTheDocument()
      expect(selectedOption).toHaveTextContent(locationListItem.title)
    })

    test.todo('Устанавливается значение по умолчанию если его нет и поле isFilled=true')
    test.todo('Можно установить значение')
    test.todo('Подсвечивается зелёным если значение равно плановому местонахождению')
    test.todo('Подсвечивается красным если значение не равно плановому местонахождению')
  })

  describe('Индикатор расхождения', () => {
    describe('Иконка восклицательного знака', () => {
      test('Отображается если условия соблюдены', () => {
        const inventorizationEquipmentListItem = warehouseFixtures.inventorizationEquipmentListItem(
          { isFilled: true, hasDiff: true },
        )

        render(<ReviseEquipmentTable {...props} dataSource={[inventorizationEquipmentListItem]} />)

        const row = testUtils.getRow(inventorizationEquipmentListItem.id)
        const icon = iconTestUtils.getIconByNameIn(row, 'exclamation-circle')

        expect(icon).toBeInTheDocument()
      })

      test('Не отображается если условия соблюдены но поле isFilled=false', () => {
        const inventorizationEquipmentListItem = warehouseFixtures.inventorizationEquipmentListItem(
          { isFilled: false, hasDiff: true },
        )

        render(<ReviseEquipmentTable {...props} dataSource={[inventorizationEquipmentListItem]} />)

        const row = testUtils.getRow(inventorizationEquipmentListItem.id)
        const icon = iconTestUtils.queryIconByNameIn(row, 'exclamation-circle')

        expect(icon).not.toBeInTheDocument()
      })

      test('Не отображается если условия соблюдены но поле hasDiff=null', () => {
        const inventorizationEquipmentListItem = warehouseFixtures.inventorizationEquipmentListItem(
          { isFilled: true, hasDiff: null },
        )

        render(<ReviseEquipmentTable {...props} dataSource={[inventorizationEquipmentListItem]} />)

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

        render(<ReviseEquipmentTable {...props} dataSource={[inventorizationEquipmentListItem]} />)

        const row = testUtils.getRow(inventorizationEquipmentListItem.id)
        const icon = iconTestUtils.getIconByNameIn(row, 'check-circle')

        expect(icon).toBeInTheDocument()
      })

      test('Не отображается если условия соблюдены но поле hasDiff=true', () => {
        const inventorizationEquipmentListItem = warehouseFixtures.inventorizationEquipmentListItem(
          { isFilled: true, hasDiff: true },
        )

        render(<ReviseEquipmentTable {...props} dataSource={[inventorizationEquipmentListItem]} />)

        const row = testUtils.getRow(inventorizationEquipmentListItem.id)
        const icon = iconTestUtils.queryIconByNameIn(row, 'check-circle')

        expect(icon).not.toBeInTheDocument()
      })

      test('Не отображается если условия соблюдены но поле isFilled=false', () => {
        const inventorizationEquipmentListItem = warehouseFixtures.inventorizationEquipmentListItem(
          { isFilled: false, hasDiff: true },
        )

        render(<ReviseEquipmentTable {...props} dataSource={[inventorizationEquipmentListItem]} />)

        const row = testUtils.getRow(inventorizationEquipmentListItem.id)
        const icon = iconTestUtils.queryIconByNameIn(row, 'check-circle')

        expect(icon).not.toBeInTheDocument()
      })

      test('Не отображается если условия соблюдены но поле hasDiff=null', () => {
        const inventorizationEquipmentListItem = warehouseFixtures.inventorizationEquipmentListItem(
          { isFilled: true, hasDiff: null },
        )

        render(<ReviseEquipmentTable {...props} dataSource={[inventorizationEquipmentListItem]} />)

        const row = testUtils.getRow(inventorizationEquipmentListItem.id)
        const icon = iconTestUtils.queryIconByNameIn(row, 'check-circle')

        expect(icon).not.toBeInTheDocument()
      })
    })
  })
})
