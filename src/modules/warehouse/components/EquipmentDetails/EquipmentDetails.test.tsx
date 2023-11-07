import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { testUtils as equipmentRelocationHistoryModalTestUtils } from 'modules/warehouse/components/EquipmentRelocationHistoryModal/EquipmentRelocationHistoryModal.test'
import {
  EquipmentCategoryEnum,
  equipmentConditionDict,
  getEquipmentMessages,
  getEquipmentRelocationHistoryMessages,
} from 'modules/warehouse/constants/equipment'

import { DATE_FORMAT } from 'shared/constants/dateTime'
import { NumberOrString } from 'shared/types/utils'
import { getYesNoWord } from 'shared/utils/common'
import { formatDate } from 'shared/utils/date'

import warehouseFixtures from '_tests_/fixtures/warehouse'
import {
  mockGetEquipmentForbiddenError,
  mockGetEquipmentNotFoundError,
  mockGetEquipmentRelocationHistoryForbiddenError,
  mockGetEquipmentRelocationHistoryNotFoundError,
  mockGetEquipmentRelocationHistoryServerError,
  mockGetEquipmentRelocationHistorySuccess,
  mockGetEquipmentServerError,
  mockGetEquipmentSuccess,
} from '_tests_/mocks/api'
import { getUserMeQueryMock } from '_tests_/mocks/state/user'
import {
  buttonTestUtils,
  fakeInteger,
  fakeWord,
  getStoreWithAuth,
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

// relocation history button
const getRelocationHistoryButton = () =>
  buttonTestUtils.getButtonIn(getBlock('relocation-history'), /История перемещений/)

const clickRelocationHistoryButton = async (user: UserEvent) => {
  const button = getRelocationHistoryButton()
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

  getRelocationHistoryButton,
  clickRelocationHistoryButton,

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

  describe('История перемещений', () => {
    test('Кнопка отображается', async () => {
      mockGetEquipmentSuccess(props.equipmentId, { body: warehouseFixtures.equipment() })

      render(<EquipmentDetails {...props} />)

      await testUtils.expectLoadingFinished()
      const button = testUtils.getRelocationHistoryButton()

      expect(button).toBeInTheDocument()
    })

    test('Кнопка активна если условия соблюдены', async () => {
      mockGetEquipmentSuccess(props.equipmentId, { body: warehouseFixtures.equipment() })

      render(<EquipmentDetails {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: {
            ...getUserMeQueryMock({ permissions: ['EQUIPMENTS_READ', 'RELOCATION_TASKS_READ'] }),
          },
        }),
      })

      await testUtils.expectLoadingFinished()
      const button = testUtils.getRelocationHistoryButton()

      expect(button).toBeEnabled()
    })

    test('Кнопка не активна если условия соблюдены, но нет прав на чтение оборудования', async () => {
      mockGetEquipmentSuccess(props.equipmentId, { body: warehouseFixtures.equipment() })

      render(<EquipmentDetails {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: {
            ...getUserMeQueryMock({ permissions: ['RELOCATION_TASKS_READ'] }),
          },
        }),
      })

      await testUtils.expectLoadingFinished()
      const button = testUtils.getRelocationHistoryButton()

      expect(button).toBeDisabled()
    })

    test('Кнопка не активна если условия соблюдены, но нет прав на чтение заявок на перемещение', async () => {
      mockGetEquipmentSuccess(props.equipmentId, { body: warehouseFixtures.equipment() })

      render(<EquipmentDetails {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: {
            ...getUserMeQueryMock({ permissions: ['EQUIPMENTS_READ'] }),
          },
        }),
      })

      await testUtils.expectLoadingFinished()
      const button = testUtils.getRelocationHistoryButton()

      expect(button).toBeDisabled()
    })

    test('При клике открывается модалка', async () => {
      mockGetEquipmentSuccess(props.equipmentId, { body: warehouseFixtures.equipment() })
      mockGetEquipmentRelocationHistorySuccess(props.equipmentId)

      const { user } = render(<EquipmentDetails {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: {
            ...getUserMeQueryMock({ permissions: ['EQUIPMENTS_READ', 'RELOCATION_TASKS_READ'] }),
          },
        }),
      })

      await testUtils.expectLoadingFinished()
      await testUtils.clickRelocationHistoryButton(user)
      const modal = await equipmentRelocationHistoryModalTestUtils.findContainer()

      expect(modal).toBeInTheDocument()
    })

    test('При успешном запрос данные отображаются', async () => {
      mockGetEquipmentSuccess(props.equipmentId, { body: warehouseFixtures.equipment() })

      const equipmentRelocationHistory = warehouseFixtures.equipmentRelocationHistory()
      mockGetEquipmentRelocationHistorySuccess(props.equipmentId, {
        body: equipmentRelocationHistory,
      })

      const { user } = render(<EquipmentDetails {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: {
            ...getUserMeQueryMock({ permissions: ['EQUIPMENTS_READ', 'RELOCATION_TASKS_READ'] }),
          },
        }),
      })

      await testUtils.expectLoadingFinished()
      await testUtils.clickRelocationHistoryButton(user)
      await equipmentRelocationHistoryModalTestUtils.findContainer()
      await equipmentRelocationHistoryModalTestUtils.expectLoadingFinished()

      equipmentRelocationHistory.forEach((item) => {
        const row = equipmentRelocationHistoryModalTestUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })

    describe('При не успешном запросе', () => {
      test('Обрабатывается ошибка 403', async () => {
        mockGetEquipmentSuccess(props.equipmentId, { body: warehouseFixtures.equipment() })

        const errorMsg = fakeWord()
        mockGetEquipmentRelocationHistoryForbiddenError(props.equipmentId, {
          body: { detail: errorMsg },
        })

        const { user } = render(<EquipmentDetails {...props} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock({ permissions: ['EQUIPMENTS_READ', 'RELOCATION_TASKS_READ'] }),
            },
          }),
        })

        await testUtils.expectLoadingFinished()
        await testUtils.clickRelocationHistoryButton(user)
        await equipmentRelocationHistoryModalTestUtils.findContainer()

        const notification = await notificationTestUtils.findNotification(errorMsg)
        expect(notification).toBeInTheDocument()
      })

      test('Обрабатывается ошибка 404', async () => {
        mockGetEquipmentSuccess(props.equipmentId, { body: warehouseFixtures.equipment() })

        const errorMsg = fakeWord()
        mockGetEquipmentRelocationHistoryNotFoundError(props.equipmentId, {
          body: { detail: errorMsg },
        })

        const { user } = render(<EquipmentDetails {...props} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock({ permissions: ['EQUIPMENTS_READ', 'RELOCATION_TASKS_READ'] }),
            },
          }),
        })

        await testUtils.expectLoadingFinished()
        await testUtils.clickRelocationHistoryButton(user)
        await equipmentRelocationHistoryModalTestUtils.findContainer()

        const notification = await notificationTestUtils.findNotification(errorMsg)
        expect(notification).toBeInTheDocument()
      })

      test('Обрабатывается ошибка 500', async () => {
        mockGetEquipmentSuccess(props.equipmentId, { body: warehouseFixtures.equipment() })
        mockGetEquipmentRelocationHistoryServerError(props.equipmentId)

        const { user } = render(<EquipmentDetails {...props} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock({ permissions: ['EQUIPMENTS_READ', 'RELOCATION_TASKS_READ'] }),
            },
          }),
        })

        await testUtils.expectLoadingFinished()
        await testUtils.clickRelocationHistoryButton(user)
        await equipmentRelocationHistoryModalTestUtils.findContainer()

        const notification = await notificationTestUtils.findNotification(
          getEquipmentRelocationHistoryMessages.commonError,
        )
        expect(notification).toBeInTheDocument()
      })
    })
  })
})
