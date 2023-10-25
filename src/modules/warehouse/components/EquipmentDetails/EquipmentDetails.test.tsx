import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import {
  EquipmentCategoryEnum,
  equipmentConditionDict,
  getEquipmentMessages,
} from 'modules/warehouse/constants/equipment'

import { DATE_FORMAT } from 'shared/constants/dateTime'
import { NumberOrString } from 'shared/types/utils'
import { getYesNoWord } from 'shared/utils/common'
import { formatDate } from 'shared/utils/date'

import warehouseFixtures from '_tests_/fixtures/warehouse'
import {
  mockGetEquipmentForbiddenError,
  mockGetEquipmentNotFoundError,
  mockGetEquipmentServerError,
  mockGetEquipmentSuccess,
} from '_tests_/mocks/api'
import {
  buttonTestUtils,
  fakeInteger,
  fakeWord,
  notificationTestUtils,
  render,
  setupApiTests,
  spinnerTestUtils,
} from '_tests_/utils'

import EquipmentDetails from './index'
import { EquipmentDetailsProps } from './types'

const props: Readonly<EquipmentDetailsProps> = {
  open: true,
  onClose: jest.fn(),
  equipmentId: fakeInteger(),
}

export const blockTestIds = [
  'title',
  'category',
  'nomenclature',
  'customer-inventory-number',
  'inventory-number',
  'serial-number',
  'warehouse',
  'condition',
  'created-at',
  'created-by',
  'quantity',
  'price',
  'is-new',
  'is-warranty',
  'is-repaired',
  'usage-counter',
  'owner',
  'purpose',
  'comment',
]

const getContainer = () => screen.getByTestId('equipment-details')
const findContainer = (): Promise<HTMLElement> => screen.findByTestId('equipment-details')

const getBlock = (testId: string) => within(getContainer()).getByTestId(testId)
const queryBlock = (testId: string) => within(getContainer()).queryByTestId(testId)

const getInfoInBlock = (block: HTMLElement, value: NumberOrString | RegExp) =>
  within(block).getByText(value)

const queryInfoInBlock = (block: HTMLElement, value: NumberOrString | RegExp) =>
  within(block).queryByText(value)

// close button
const getCloseButton = () => buttonTestUtils.getButtonIn(getContainer(), /close/i)

const clickCloseButton = async (user: UserEvent) => {
  const button = getCloseButton()
  await user.click(button)
}

// loading
const expectLoadingStarted = spinnerTestUtils.expectLoadingFinished('equipment-details-loading')
const expectLoadingFinished = spinnerTestUtils.expectLoadingFinished('equipment-details-loading')

export const testUtils = {
  getContainer,
  findContainer,

  getBlock,
  queryBlock,

  getInfoInBlock,
  queryInfoInBlock,

  getCloseButton,
  clickCloseButton,

  expectLoadingStarted,
  expectLoadingFinished,
}

setupApiTests()
notificationTestUtils.setupNotifications()

describe('Информация об оборудовании', () => {
  test('При клике на кнопку закрытия вызывается обработчик', async () => {
    mockGetEquipmentSuccess(props.equipmentId)
    const { user } = render(<EquipmentDetails {...props} />)

    await testUtils.clickCloseButton(user)
    expect(props.onClose).toBeCalledTimes(1)
  })

  describe('При успешном запросе', () => {
    test('Наименование отображается', async () => {
      const equipment = warehouseFixtures.equipment()
      mockGetEquipmentSuccess(props.equipmentId, { body: equipment })

      render(<EquipmentDetails {...props} />)

      await testUtils.expectLoadingFinished()
      const block = testUtils.getBlock('title')
      const label = testUtils.getInfoInBlock(block, /Наименование/)
      const value = testUtils.getInfoInBlock(block, equipment.title)

      expect(label).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('Категория отображается', async () => {
      const equipment = warehouseFixtures.equipment()
      mockGetEquipmentSuccess(props.equipmentId, { body: equipment })

      render(<EquipmentDetails {...props} />)

      await testUtils.expectLoadingFinished()
      const block = testUtils.getBlock('category')
      const label = testUtils.getInfoInBlock(block, /Категория/)
      const value = testUtils.getInfoInBlock(block, equipment.category.title)

      expect(label).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('Номенклатура отображается', async () => {
      const equipment = warehouseFixtures.equipment()
      mockGetEquipmentSuccess(props.equipmentId, { body: equipment })

      render(<EquipmentDetails {...props} />)

      await testUtils.expectLoadingFinished()
      const block = testUtils.getBlock('nomenclature')
      const label = testUtils.getInfoInBlock(block, /Номенклатура/)
      const value = testUtils.getInfoInBlock(block, equipment.nomenclature.title)

      expect(label).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    describe('Инвентарный номер заказчика', () => {
      test('Отображается если нет в списке скрытых', async () => {
        const equipment = warehouseFixtures.equipment()
        mockGetEquipmentSuccess(props.equipmentId, { body: equipment })

        render(<EquipmentDetails {...props} />)

        await testUtils.expectLoadingFinished()
        const block = testUtils.getBlock('customer-inventory-number')
        const label = testUtils.getInfoInBlock(block, /Инвентарный номер заказчика/)
        const value = testUtils.getInfoInBlock(block, equipment.customerInventoryNumber!)

        expect(label).toBeInTheDocument()
        expect(value).toBeInTheDocument()
      })

      test('Не отображается если категория расходный материал', async () => {
        const equipment = warehouseFixtures.equipment({
          category: warehouseFixtures.equipmentCategory({ code: EquipmentCategoryEnum.Consumable }),
        })
        mockGetEquipmentSuccess(props.equipmentId, { body: equipment })

        render(<EquipmentDetails {...props} />)

        await testUtils.expectLoadingFinished()
        const block = testUtils.queryBlock('customer-inventory-number')
        expect(block).not.toBeInTheDocument()
      })
    })

    describe('Инвентарный номер', () => {
      test('Отображается если нет в списке скрытых', async () => {
        const equipment = warehouseFixtures.equipment()
        mockGetEquipmentSuccess(props.equipmentId, { body: equipment })

        render(<EquipmentDetails {...props} />)

        await testUtils.expectLoadingFinished()
        const block = testUtils.getBlock('inventory-number')
        const label = testUtils.getInfoInBlock(block, /Инвентарный номер/)
        const value = testUtils.getInfoInBlock(block, equipment.inventoryNumber!)

        expect(label).toBeInTheDocument()
        expect(value).toBeInTheDocument()
      })

      test('Не отображается если категория расходный материал', async () => {
        const equipment = warehouseFixtures.equipment({
          category: warehouseFixtures.equipmentCategory({ code: EquipmentCategoryEnum.Consumable }),
        })
        mockGetEquipmentSuccess(props.equipmentId, { body: equipment })

        render(<EquipmentDetails {...props} />)

        await testUtils.expectLoadingFinished()
        const block = testUtils.queryBlock('inventory-number')
        expect(block).not.toBeInTheDocument()
      })
    })

    describe('Серийный номер', () => {
      test('Отображается если у оборудования он есть', async () => {
        const equipment = warehouseFixtures.equipment({
          nomenclature: warehouseFixtures.nomenclature({ equipmentHasSerialNumber: true }),
          category: warehouseFixtures.equipmentCategory({ code: EquipmentCategoryEnum.Consumable }),
        })
        mockGetEquipmentSuccess(props.equipmentId, { body: equipment })

        render(<EquipmentDetails {...props} />)

        await testUtils.expectLoadingFinished()
        const block = testUtils.getBlock('serial-number')
        const label = testUtils.getInfoInBlock(block, /Серийный номер/)
        const value = testUtils.getInfoInBlock(block, equipment.serialNumber!)

        expect(label).toBeInTheDocument()
        expect(value).toBeInTheDocument()
      })

      test('Не отображается если у оборудования его нет', async () => {
        const equipment = warehouseFixtures.equipment({
          nomenclature: warehouseFixtures.nomenclature({ equipmentHasSerialNumber: false }),
          category: warehouseFixtures.equipmentCategory({ code: EquipmentCategoryEnum.Consumable }),
        })
        mockGetEquipmentSuccess(props.equipmentId, { body: equipment })

        render(<EquipmentDetails {...props} />)

        await testUtils.expectLoadingFinished()

        const block = testUtils.queryBlock('serial-number')
        expect(block).not.toBeInTheDocument()
      })
    })

    test('Склад отображается', async () => {
      const equipment = warehouseFixtures.equipment()
      mockGetEquipmentSuccess(props.equipmentId, { body: equipment })

      render(<EquipmentDetails {...props} />)

      await testUtils.expectLoadingFinished()
      const block = testUtils.getBlock('warehouse')
      const label = testUtils.getInfoInBlock(block, /Склад/)
      const value = testUtils.getInfoInBlock(block, equipment.warehouse!.title)

      expect(label).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('Состояние отображается', async () => {
      const equipment = warehouseFixtures.equipment()
      mockGetEquipmentSuccess(props.equipmentId, { body: equipment })

      render(<EquipmentDetails {...props} />)

      await testUtils.expectLoadingFinished()
      const block = testUtils.getBlock('condition')
      const label = testUtils.getInfoInBlock(block, /Состояние/)
      const value = testUtils.getInfoInBlock(block, equipmentConditionDict[equipment.condition])

      expect(label).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('Дата оприходования отображается', async () => {
      const equipment = warehouseFixtures.equipment()
      mockGetEquipmentSuccess(props.equipmentId, { body: equipment })

      render(<EquipmentDetails {...props} />)

      await testUtils.expectLoadingFinished()
      const block = testUtils.getBlock('created-at')
      const label = testUtils.getInfoInBlock(block, /Дата оприходования/)
      const value = testUtils.getInfoInBlock(block, formatDate(equipment.createdAt, DATE_FORMAT))

      expect(label).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('Кем оприходовано отображается', async () => {
      const equipment = warehouseFixtures.equipment()
      mockGetEquipmentSuccess(props.equipmentId, { body: equipment })

      render(<EquipmentDetails {...props} />)

      await testUtils.expectLoadingFinished()
      const block = testUtils.getBlock('created-by')
      const label = testUtils.getInfoInBlock(block, /Кем оприходовано/)
      const value = testUtils.getInfoInBlock(block, equipment.createdBy.fullName)

      expect(label).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('Количество отображается', async () => {
      const equipment = warehouseFixtures.equipment()
      mockGetEquipmentSuccess(props.equipmentId, { body: equipment })

      render(<EquipmentDetails {...props} />)

      await testUtils.expectLoadingFinished()
      const block = testUtils.getBlock('quantity')
      const quantityLabel = testUtils.getInfoInBlock(block, /Количество/)
      const quantityValue = testUtils.getInfoInBlock(block, equipment.quantity!)
      const measurementUnitLabel = testUtils.getInfoInBlock(block, /Ед. изм/)
      const measurementUnitValue = testUtils.getInfoInBlock(block, equipment.measurementUnit.title)

      expect(quantityLabel).toBeInTheDocument()
      expect(quantityValue).toBeInTheDocument()
      expect(measurementUnitLabel).toBeInTheDocument()
      expect(measurementUnitValue).toBeInTheDocument()
    })

    test('Стоимость отображается', async () => {
      const equipment = warehouseFixtures.equipment()
      mockGetEquipmentSuccess(props.equipmentId, { body: equipment })

      render(<EquipmentDetails {...props} />)

      await testUtils.expectLoadingFinished()
      const block = testUtils.getBlock('price')
      const priceLabel = testUtils.getInfoInBlock(block, /Стоимость/)
      const priceValue = testUtils.getInfoInBlock(block, equipment.price!)
      const currencyLabel = testUtils.getInfoInBlock(block, /Валюта/)
      const currencyValue = testUtils.getInfoInBlock(block, equipment.currency!.title)

      expect(priceLabel).toBeInTheDocument()
      expect(priceValue).toBeInTheDocument()
      expect(currencyLabel).toBeInTheDocument()
      expect(currencyValue).toBeInTheDocument()
    })

    describe('Новое', () => {
      test('Отображается если нет в списке скрытых', async () => {
        const equipment = warehouseFixtures.equipment()
        mockGetEquipmentSuccess(props.equipmentId, { body: equipment })

        render(<EquipmentDetails {...props} />)

        await testUtils.expectLoadingFinished()
        const block = testUtils.getBlock('is-new')
        const label = testUtils.getInfoInBlock(block, /Новое/)
        const value = testUtils.getInfoInBlock(block, getYesNoWord(equipment.isNew))

        expect(label).toBeInTheDocument()
        expect(value).toBeInTheDocument()
      })

      test('Не отображается если категория расходный материал', async () => {
        const equipment = warehouseFixtures.equipment({
          category: warehouseFixtures.equipmentCategory({ code: EquipmentCategoryEnum.Consumable }),
        })
        mockGetEquipmentSuccess(props.equipmentId, { body: equipment })

        render(<EquipmentDetails {...props} />)

        await testUtils.expectLoadingFinished()
        const block = testUtils.queryBlock('is-new')
        expect(block).not.toBeInTheDocument()
      })
    })

    describe('На гарантии', () => {
      test('Отображается если нет в списке скрытых', async () => {
        const equipment = warehouseFixtures.equipment()
        mockGetEquipmentSuccess(props.equipmentId, { body: equipment })

        render(<EquipmentDetails {...props} />)

        await testUtils.expectLoadingFinished()
        const block = testUtils.getBlock('is-warranty')
        const label = testUtils.getInfoInBlock(block, /На гарантии/)
        const value = testUtils.getInfoInBlock(block, getYesNoWord(equipment.isWarranty))

        expect(label).toBeInTheDocument()
        expect(value).toBeInTheDocument()
      })

      test('Не отображается если категория расходный материал', async () => {
        const equipment = warehouseFixtures.equipment({
          category: warehouseFixtures.equipmentCategory({ code: EquipmentCategoryEnum.Consumable }),
        })
        mockGetEquipmentSuccess(props.equipmentId, { body: equipment })

        render(<EquipmentDetails {...props} />)

        await testUtils.expectLoadingFinished()
        const block = testUtils.queryBlock('is-warranty')
        expect(block).not.toBeInTheDocument()
      })
    })

    describe('Отремонтированное', () => {
      test('Отображается если нет в списке скрытых', async () => {
        const equipment = warehouseFixtures.equipment()
        mockGetEquipmentSuccess(props.equipmentId, { body: equipment })

        render(<EquipmentDetails {...props} />)

        await testUtils.expectLoadingFinished()
        const block = testUtils.getBlock('is-repaired')
        const label = testUtils.getInfoInBlock(block, /Отремонтированное/)
        const value = testUtils.getInfoInBlock(block, getYesNoWord(equipment.isRepaired))

        expect(label).toBeInTheDocument()
        expect(value).toBeInTheDocument()
      })

      test('Не отображается если категория расходный материал', async () => {
        const equipment = warehouseFixtures.equipment({
          category: warehouseFixtures.equipmentCategory({ code: EquipmentCategoryEnum.Consumable }),
        })
        mockGetEquipmentSuccess(props.equipmentId, { body: equipment })

        render(<EquipmentDetails {...props} />)

        await testUtils.expectLoadingFinished()
        const block = testUtils.queryBlock('is-repaired')
        expect(block).not.toBeInTheDocument()
      })
    })

    describe('Счётчик пробега текущий', () => {
      test('Отображается если нет в списке скрытых', async () => {
        const equipment = warehouseFixtures.equipment()
        mockGetEquipmentSuccess(props.equipmentId, { body: equipment })

        render(<EquipmentDetails {...props} />)

        await testUtils.expectLoadingFinished()
        const block = testUtils.getBlock('usage-counter')
        const label = testUtils.getInfoInBlock(block, /Счётчик пробега текущий/)
        const value = testUtils.getInfoInBlock(block, equipment.usageCounter!)

        expect(label).toBeInTheDocument()
        expect(value).toBeInTheDocument()
      })

      test('Не отображается если категория расходный материал', async () => {
        const equipment = warehouseFixtures.equipment({
          category: warehouseFixtures.equipmentCategory({ code: EquipmentCategoryEnum.Consumable }),
        })
        mockGetEquipmentSuccess(props.equipmentId, { body: equipment })

        render(<EquipmentDetails {...props} />)

        await testUtils.expectLoadingFinished()
        const block = testUtils.queryBlock('usage-counter')
        expect(block).not.toBeInTheDocument()
      })
    })

    describe('Владелец оборудования', () => {
      test('Отображается если нет в списке скрытых', async () => {
        const equipment = warehouseFixtures.equipment()
        mockGetEquipmentSuccess(props.equipmentId, { body: equipment })

        render(<EquipmentDetails {...props} />)

        await testUtils.expectLoadingFinished()
        const block = testUtils.getBlock('owner')
        const label = testUtils.getInfoInBlock(block, /Владелец оборудования/)
        const value = testUtils.getInfoInBlock(block, equipment.owner!.title)

        expect(label).toBeInTheDocument()
        expect(value).toBeInTheDocument()
      })

      test('Не отображается если категория расходный материал', async () => {
        const equipment = warehouseFixtures.equipment({
          category: warehouseFixtures.equipmentCategory({ code: EquipmentCategoryEnum.Consumable }),
        })
        mockGetEquipmentSuccess(props.equipmentId, { body: equipment })

        render(<EquipmentDetails {...props} />)

        await testUtils.expectLoadingFinished()
        const block = testUtils.queryBlock('owner')
        expect(block).not.toBeInTheDocument()
      })
    })

    test('Назначение оборудования отображается', async () => {
      const equipment = warehouseFixtures.equipment()
      mockGetEquipmentSuccess(props.equipmentId, { body: equipment })

      render(<EquipmentDetails {...props} />)

      await testUtils.expectLoadingFinished()
      const block = testUtils.getBlock('purpose')
      const label = testUtils.getInfoInBlock(block, /Назначение оборудования/)
      const value = testUtils.getInfoInBlock(block, equipment.purpose.title)

      expect(label).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('Комментарий отображается', async () => {
      const equipment = warehouseFixtures.equipment()
      mockGetEquipmentSuccess(props.equipmentId, { body: equipment })

      render(<EquipmentDetails {...props} />)

      await testUtils.expectLoadingFinished()
      const block = testUtils.getBlock('comment')
      const label = testUtils.getInfoInBlock(block, /Комментарий/)
      const value = testUtils.getInfoInBlock(block, equipment.comment!)

      expect(label).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })
  })

  describe('При не успешном запросе', () => {
    test('Обрабатывается ошибка 403', async () => {
      const errorMessage = fakeWord()
      mockGetEquipmentForbiddenError(props.equipmentId, { body: { detail: errorMessage } })

      render(<EquipmentDetails {...props} />)

      await testUtils.expectLoadingFinished()
      const notification = await notificationTestUtils.findNotification(errorMessage)

      expect(notification).toBeInTheDocument()
    })

    test('Обрабатывается ошибка 404', async () => {
      const errorMessage = fakeWord()
      mockGetEquipmentNotFoundError(props.equipmentId, { body: { detail: errorMessage } })

      render(<EquipmentDetails {...props} />)

      await testUtils.expectLoadingFinished()
      const notification = await notificationTestUtils.findNotification(errorMessage)

      expect(notification).toBeInTheDocument()
    })

    test('Обрабатывается ошибка 500', async () => {
      mockGetEquipmentServerError(props.equipmentId)

      render(<EquipmentDetails {...props} />)

      await testUtils.expectLoadingFinished()
      const notification = await notificationTestUtils.findNotification(
        getEquipmentMessages.commonError,
      )

      expect(notification).toBeInTheDocument()
    })
  })
})
