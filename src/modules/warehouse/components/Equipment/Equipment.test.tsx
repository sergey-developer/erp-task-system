import { screen, within } from '@testing-library/react'

import { equipmentConditionDict } from 'modules/warehouse/constants'

import { DATE_FORMAT } from 'shared/constants/dateTime'
import { NumberOrString } from 'shared/types/utils'
import { getYesNo } from 'shared/utils/common'
import { formatDate } from 'shared/utils/date'

import warehouseFixtures from 'fixtures/warehouse'

import { render } from '_tests_/utils'

import Equipment from './index'
import { EquipmentProps } from './types'

const props: EquipmentProps = {
  visible: true,
  title: '',
  equipment: warehouseFixtures.equipment(),
  displayableFields: [],
  onClose: jest.fn(),
}

const getContainer = () => screen.getByTestId('equipment')

// title
const getBlock = (testId: string) => within(getContainer()).getByTestId(testId)

const queryBlock = (testId: string) =>
  within(getContainer()).queryByTestId(testId)

const getInfoInBlock = (block: HTMLElement, value: NumberOrString | RegExp) =>
  within(block).getByText(value)

const queryInfoInBlock = (block: HTMLElement, value: NumberOrString | RegExp) =>
  within(block).queryByText(value)

export const testUtils = {
  getContainer,

  getBlock,
  queryBlock,

  getInfoInBlock,
  queryInfoInBlock,
}

describe('Информация об оборудовании', () => {
  test('Наименование', () => {
    render(<Equipment {...props} />)

    const block = testUtils.getBlock('title')
    const label = testUtils.getInfoInBlock(block, /Наименование/)
    const value = testUtils.getInfoInBlock(block, props.equipment.title)

    expect(label).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Категория', () => {
    render(<Equipment {...props} />)

    const block = testUtils.getBlock('category')
    const label = testUtils.getInfoInBlock(block, /Категория/)
    const value = testUtils.getInfoInBlock(
      block,
      props.equipment.category.title,
    )

    expect(label).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Номенклатура', () => {
    render(<Equipment {...props} />)

    const block = testUtils.getBlock('nomenclature')
    const label = testUtils.getInfoInBlock(block, /Номенклатура/)
    const value = testUtils.getInfoInBlock(
      block,
      props.equipment.nomenclature.title,
    )

    expect(label).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  describe('Инвентарный номер заказчика', () => {
    test('Отображается если есть в списке отображаемых', () => {
      render(
        <Equipment
          {...props}
          displayableFields={['customerInventoryNumber']}
        />,
      )

      const block = testUtils.getBlock('customer-inventory-number')
      const label = testUtils.getInfoInBlock(
        block,
        /Инвентарный номер заказчика/,
      )
      const value = testUtils.getInfoInBlock(
        block,
        props.equipment.customerInventoryNumber!,
      )

      expect(label).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('Не отображается если нет в списке отображаемых', () => {
      render(<Equipment {...props} />)
      const block = testUtils.queryBlock('customer-inventory-number')
      expect(block).not.toBeInTheDocument()
    })
  })

  describe('Инвентарный номер', () => {
    test('Отображается если есть в списке отображаемых', () => {
      render(<Equipment {...props} displayableFields={['inventoryNumber']} />)

      const block = testUtils.getBlock('inventory-number')
      const label = testUtils.getInfoInBlock(block, /Инвентарный номер/)
      const value = testUtils.getInfoInBlock(
        block,
        props.equipment.inventoryNumber!,
      )

      expect(label).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('Не отображается если нет в списке отображаемых', () => {
      render(<Equipment {...props} />)
      const block = testUtils.queryBlock('inventory-number')
      expect(block).not.toBeInTheDocument()
    })
  })

  describe('Серийный номер', () => {
    test('Отображается если у оборудования он есть', () => {
      const equipment = warehouseFixtures.equipment({
        nomenclature: warehouseFixtures.nomenclature({
          equipmentHasSerialNumber: true,
        }),
      })

      render(<Equipment {...props} equipment={equipment} />)

      const block = testUtils.getBlock('serial-number')
      const label = testUtils.getInfoInBlock(block, /Серийный номер/)
      const value = testUtils.getInfoInBlock(block, equipment.serialNumber!)

      expect(label).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('Не отображается если у оборудования его нет', () => {
      render(
        <Equipment
          {...props}
          equipment={warehouseFixtures.equipment({
            nomenclature: warehouseFixtures.nomenclature({
              equipmentHasSerialNumber: false,
            }),
          })}
        />,
      )

      const block = testUtils.queryBlock('serial-number')
      expect(block).not.toBeInTheDocument()
    })
  })

  test('Склад', () => {
    render(<Equipment {...props} />)

    const block = testUtils.getBlock('warehouse')
    const label = testUtils.getInfoInBlock(block, /Склад/)
    const value = testUtils.getInfoInBlock(
      block,
      props.equipment.warehouse.title,
    )

    expect(label).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Состояние', () => {
    render(<Equipment {...props} />)

    const block = testUtils.getBlock('condition')
    const label = testUtils.getInfoInBlock(block, /Состояние/)
    const value = testUtils.getInfoInBlock(
      block,
      equipmentConditionDict[props.equipment.condition],
    )

    expect(label).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Дата оприходования', () => {
    render(<Equipment {...props} />)

    const block = testUtils.getBlock('created-at')
    const label = testUtils.getInfoInBlock(block, /Дата оприходования/)
    const value = testUtils.getInfoInBlock(
      block,
      formatDate(props.equipment.createdAt, DATE_FORMAT),
    )

    expect(label).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Кем оприходовано', () => {
    render(<Equipment {...props} />)

    const block = testUtils.getBlock('created-by')
    const label = testUtils.getInfoInBlock(block, /Кем оприходовано/)
    const value = testUtils.getInfoInBlock(
      block,
      props.equipment.createdBy.fullName,
    )

    expect(label).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Количество', () => {
    render(<Equipment {...props} />)

    const block = testUtils.getBlock('quantity')
    const quantityLabel = testUtils.getInfoInBlock(block, /Количество/)
    const quantityValue = testUtils.getInfoInBlock(
      block,
      props.equipment.quantity!,
    )
    const measurementUnitLabel = testUtils.getInfoInBlock(
      block,
      /Ед. измерения/,
    )
    const measurementUnitValue = testUtils.getInfoInBlock(
      block,
      props.equipment.measurementUnit.title,
    )

    expect(quantityLabel).toBeInTheDocument()
    expect(quantityValue).toBeInTheDocument()
    expect(measurementUnitLabel).toBeInTheDocument()
    expect(measurementUnitValue).toBeInTheDocument()
  })

  test('Стоимость', () => {
    render(<Equipment {...props} />)

    const block = testUtils.getBlock('price')
    const priceLabel = testUtils.getInfoInBlock(block, /Стоимость/)
    const priceValue = testUtils.getInfoInBlock(block, props.equipment.price!)
    const currencyLabel = testUtils.getInfoInBlock(block, /Валюта/)
    const currencyValue = testUtils.getInfoInBlock(
      block,
      props.equipment.currency!.title,
    )

    expect(priceLabel).toBeInTheDocument()
    expect(priceValue).toBeInTheDocument()
    expect(currencyLabel).toBeInTheDocument()
    expect(currencyValue).toBeInTheDocument()
  })

  describe('Новое', () => {
    test('Отображается если есть в списке отображаемых', () => {
      render(<Equipment {...props} displayableFields={['isNew']} />)

      const block = testUtils.getBlock('is-new')
      const label = testUtils.getInfoInBlock(block, /Новое/)
      const value = testUtils.getInfoInBlock(
        block,
        getYesNo(props.equipment.isNew),
      )

      expect(label).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('Не отображается если нет в списке отображаемых', () => {
      render(<Equipment {...props} />)
      const block = testUtils.queryBlock('is-new')
      expect(block).not.toBeInTheDocument()
    })
  })

  describe('На гарантии', () => {
    test('Отображается если есть в списке отображаемых', () => {
      render(<Equipment {...props} displayableFields={['isWarranty']} />)

      const block = testUtils.getBlock('is-warranty')
      const label = testUtils.getInfoInBlock(block, /На гарантии/)
      const value = testUtils.getInfoInBlock(
        block,
        getYesNo(props.equipment.isWarranty),
      )

      expect(label).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('Не отображается если нет в списке отображаемых', () => {
      render(<Equipment {...props} />)
      const block = testUtils.queryBlock('is-warranty')
      expect(block).not.toBeInTheDocument()
    })
  })

  describe('Отремонтированное', () => {
    test('Отображается если есть в списке отображаемых', () => {
      render(<Equipment {...props} displayableFields={['isRepaired']} />)

      const block = testUtils.getBlock('is-repaired')
      const label = testUtils.getInfoInBlock(block, /Отремонтированное/)
      const value = testUtils.getInfoInBlock(
        block,
        getYesNo(props.equipment.isRepaired),
      )

      expect(label).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('Не отображается если нет в списке отображаемых', () => {
      render(<Equipment {...props} />)
      const block = testUtils.queryBlock('is-repaired')
      expect(block).not.toBeInTheDocument()
    })
  })

  describe('Счётчик пробега текущий', () => {
    test('Отображается если есть в списке отображаемых', () => {
      render(<Equipment {...props} displayableFields={['usageCounter']} />)

      const block = testUtils.getBlock('usage-counter')
      const label = testUtils.getInfoInBlock(block, /Счётчик пробега текущий/)
      const value = testUtils.getInfoInBlock(
        block,
        props.equipment.usageCounter!,
      )

      expect(label).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('Не отображается если нет в списке отображаемых', () => {
      render(<Equipment {...props} />)
      const block = testUtils.queryBlock('usage-counter')
      expect(block).not.toBeInTheDocument()
    })
  })

  describe('Владелец оборудования', () => {
    test('Отображается если есть в списке отображаемых', () => {
      render(<Equipment {...props} displayableFields={['owner']} />)

      const block = testUtils.getBlock('owner')
      const label = testUtils.getInfoInBlock(block, /Владелец оборудования/)
      const value = testUtils.getInfoInBlock(
        block,
        props.equipment.owner!.title,
      )

      expect(label).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('Не отображается если нет в списке отображаемых', () => {
      render(<Equipment {...props} />)
      const block = testUtils.queryBlock('owner')
      expect(block).not.toBeInTheDocument()
    })
  })

  test('Назначение оборудования', () => {
    render(<Equipment {...props} />)

    const block = testUtils.getBlock('purpose')
    const label = testUtils.getInfoInBlock(block, /Назначение оборудования/)
    const value = testUtils.getInfoInBlock(block, props.equipment.purpose.title)

    expect(label).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Комментарий', () => {
    render(<Equipment {...props} />)

    const block = testUtils.getBlock('comment')
    const label = testUtils.getInfoInBlock(block, /Комментарий/)
    const value = testUtils.getInfoInBlock(block, props.equipment.comment!)

    expect(label).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })
})
