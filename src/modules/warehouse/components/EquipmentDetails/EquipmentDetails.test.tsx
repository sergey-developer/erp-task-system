import { within } from '@testing-library/react'

import { testUtils as attachmentImagesTestUtils } from 'modules/attachment/components/AttachmentImages/AttachmentImages.test'
import { testUtils as attachmentListModalTestUtils } from 'modules/attachment/components/AttachmentListModal/AttachmentListModal.test'
import { testUtils as technicalExaminationsHistoryModalTestUtils } from 'modules/technicalExaminations/components/TechnicalExaminationsHistoryModal/TechnicalExaminationsHistoryModal.test'
import { UserPermissionsEnum } from 'modules/user/constants'
import { testUtils as equipmentRelocationHistoryModalTestUtils } from 'modules/warehouse/components/EquipmentRelocationHistoryModal/EquipmentRelocationHistoryModal.test'
import { testUtils as relocationTaskDetailsTestUtils } from 'modules/warehouse/components/RelocationTaskDetails/RelocationTaskDetails.test'
import {
  EquipmentCategoryEnum,
  equipmentConditionDict,
  EquipmentConditionEnum,
  getEquipmentAttachmentListErrMsg,
  getEquipmentMessages,
  getEquipmentRelocationHistoryMessages,
} from 'modules/warehouse/constants/equipment'

import { DATE_FORMAT } from 'shared/constants/dateTime'
import * as commonUtils from 'shared/utils/common'
import { getYesNoWord } from 'shared/utils/common'
import { formatDate } from 'shared/utils/date'
import { makeString } from 'shared/utils/string'

import { createEquipmentTechnicalExaminationModalTestUtils } from '_tests_/features/warehouse/CreateEquipmentTechnicalExaminationModal/testUtils'
import { props } from '_tests_/features/warehouse/EquipmentDetails/constants'
import { equipmentDetailsTestUtils } from '_tests_/features/warehouse/EquipmentDetails/testUtils'
import { equipmentFormModalTestUtils } from '_tests_/features/warehouse/EquipmentFormModal/testUtils'
import attachmentFixtures from '_tests_/fixtures/attachments'
import commonFixtures from '_tests_/fixtures/common'
import userFixtures from '_tests_/fixtures/user'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import {
  mockGetCurrencyListSuccess,
  mockGetCustomerListSuccess,
  mockGetEquipmentAttachmentListForbiddenError,
  mockGetEquipmentAttachmentListNotFoundError,
  mockGetEquipmentAttachmentListServerError,
  mockGetEquipmentAttachmentListSuccess,
  mockGetEquipmentCategoryListSuccess,
  mockGetEquipmentForbiddenError,
  mockGetEquipmentNotFoundError,
  mockGetEquipmentRelocationHistoryForbiddenError,
  mockGetEquipmentRelocationHistoryNotFoundError,
  mockGetEquipmentRelocationHistoryServerError,
  mockGetEquipmentRelocationHistorySuccess,
  mockGetEquipmentServerError,
  mockGetEquipmentSuccess,
  mockGetNomenclatureListSuccess,
  mockGetNomenclatureSuccess,
  mockGetRelocationEquipmentListSuccess,
  mockGetRelocationTaskSuccess,
  mockGetTechnicalExaminationsSuccess,
  mockGetWarehouseListSuccess,
  mockGetWorkTypesSuccess,
} from '_tests_/mocks/api'
import { getUserMeQueryMock } from '_tests_/mocks/state/user'
import {
  buttonTestUtils,
  fakeWord,
  getStoreWithAuth,
  menuTestUtils,
  notificationTestUtils,
  render,
  setupApiTests,
} from '_tests_/utils'

import EquipmentDetails from './index'

jest.mock('shared/utils/common', () => ({
  __esModule: true,
  ...jest.requireActual('shared/utils/common'),
  printImage: jest.fn(),
}))

setupApiTests()
notificationTestUtils.setupNotifications()

describe('Информация об оборудовании', () => {
  test('При клике на кнопку закрытия вызывается обработчик', async () => {
    mockGetEquipmentSuccess(props.equipmentId)
    mockGetEquipmentAttachmentListSuccess(props.equipmentId)

    const { user } = render(<EquipmentDetails {...props} />, {
      store: getStoreWithAuth(undefined, undefined, undefined, {
        queries: { ...getUserMeQueryMock(userFixtures.user()) },
      }),
    })

    await equipmentDetailsTestUtils.clickCloseButton(user)
    expect(props.onClose).toBeCalledTimes(1)
  })

  describe('При успешном запросе', () => {
    test('Наименование отображается', async () => {
      const equipment = warehouseFixtures.equipment()
      mockGetEquipmentSuccess(props.equipmentId, { body: equipment })
      mockGetEquipmentAttachmentListSuccess(props.equipmentId)

      render(<EquipmentDetails {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await equipmentDetailsTestUtils.expectLoadingFinished()
      const block = equipmentDetailsTestUtils.getBlock('title')
      const label = equipmentDetailsTestUtils.getInfoInBlock(block, /Наименование/)
      const value = equipmentDetailsTestUtils.getInfoInBlock(block, equipment.title)

      expect(label).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('Категория отображается', async () => {
      const equipment = warehouseFixtures.equipment()
      mockGetEquipmentSuccess(props.equipmentId, { body: equipment })
      mockGetEquipmentAttachmentListSuccess(props.equipmentId)

      render(<EquipmentDetails {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await equipmentDetailsTestUtils.expectLoadingFinished()
      const block = equipmentDetailsTestUtils.getBlock('category')
      const label = equipmentDetailsTestUtils.getInfoInBlock(block, /Категория/)
      const value = equipmentDetailsTestUtils.getInfoInBlock(block, equipment.category.title)

      expect(label).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('Номенклатура отображается', async () => {
      const equipment = warehouseFixtures.equipment()
      mockGetEquipmentSuccess(props.equipmentId, { body: equipment })
      mockGetEquipmentAttachmentListSuccess(props.equipmentId)

      render(<EquipmentDetails {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await equipmentDetailsTestUtils.expectLoadingFinished()
      const block = equipmentDetailsTestUtils.getBlock('nomenclature')
      const label = equipmentDetailsTestUtils.getInfoInBlock(block, /Номенклатура/)
      const value = equipmentDetailsTestUtils.getInfoInBlock(block, equipment.nomenclature.title)

      expect(label).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    describe('Инвентарный номер', () => {
      test('Отображается если нет в списке скрытых', async () => {
        const equipment = warehouseFixtures.equipment()
        mockGetEquipmentSuccess(props.equipmentId, { body: equipment })
        mockGetEquipmentAttachmentListSuccess(props.equipmentId)

        render(<EquipmentDetails {...props} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        })

        await equipmentDetailsTestUtils.expectLoadingFinished()
        const block = equipmentDetailsTestUtils.getBlock('inventory-number')
        const label = equipmentDetailsTestUtils.getInfoInBlock(block, /Инвентарный номер/)
        const value = equipmentDetailsTestUtils.getInfoInBlock(block, equipment.inventoryNumber!)

        expect(label).toBeInTheDocument()
        expect(value).toBeInTheDocument()
      })

      test('Не отображается если категория расходный материал', async () => {
        const equipment = warehouseFixtures.equipment({
          category: warehouseFixtures.equipmentCategory({ code: EquipmentCategoryEnum.Consumable }),
        })
        mockGetEquipmentSuccess(props.equipmentId, { body: equipment })
        mockGetEquipmentAttachmentListSuccess(props.equipmentId)

        render(<EquipmentDetails {...props} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        })

        await equipmentDetailsTestUtils.expectLoadingFinished()
        const block = equipmentDetailsTestUtils.queryBlock('inventory-number')
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
        mockGetEquipmentAttachmentListSuccess(props.equipmentId)

        render(<EquipmentDetails {...props} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        })

        await equipmentDetailsTestUtils.expectLoadingFinished()
        const block = equipmentDetailsTestUtils.getBlock('serial-number')
        const label = equipmentDetailsTestUtils.getInfoInBlock(block, /Серийный номер/)
        const value = equipmentDetailsTestUtils.getInfoInBlock(block, equipment.serialNumber!)

        expect(label).toBeInTheDocument()
        expect(value).toBeInTheDocument()
      })

      test('Не отображается если у оборудования его нет', async () => {
        const equipment = warehouseFixtures.equipment({
          nomenclature: warehouseFixtures.nomenclature({ equipmentHasSerialNumber: false }),
          category: warehouseFixtures.equipmentCategory({ code: EquipmentCategoryEnum.Consumable }),
        })
        mockGetEquipmentSuccess(props.equipmentId, { body: equipment })
        mockGetEquipmentAttachmentListSuccess(props.equipmentId)

        render(<EquipmentDetails {...props} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        })

        await equipmentDetailsTestUtils.expectLoadingFinished()

        const block = equipmentDetailsTestUtils.queryBlock('serial-number')
        expect(block).not.toBeInTheDocument()
      })
    })

    test('Местонахождение отображается', async () => {
      const equipment = warehouseFixtures.equipment()
      mockGetEquipmentSuccess(props.equipmentId, { body: equipment })
      mockGetEquipmentAttachmentListSuccess(props.equipmentId)

      render(<EquipmentDetails {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await equipmentDetailsTestUtils.expectLoadingFinished()
      const block = equipmentDetailsTestUtils.getBlock('location')
      const label = equipmentDetailsTestUtils.getInfoInBlock(block, /Местонахождение/)
      const value = equipmentDetailsTestUtils.getInfoInBlock(block, equipment.location!.title)

      expect(label).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('Оприходовано отображается', async () => {
      const equipment = warehouseFixtures.equipment()
      mockGetEquipmentSuccess(props.equipmentId, { body: equipment })
      mockGetEquipmentAttachmentListSuccess(props.equipmentId)

      render(<EquipmentDetails {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await equipmentDetailsTestUtils.expectLoadingFinished()
      const block = equipmentDetailsTestUtils.getBlock('is-credited')
      const label = equipmentDetailsTestUtils.getInfoInBlock(block, /Оприходовано/)
      const value = equipmentDetailsTestUtils.getInfoInBlock(
        block,
        getYesNoWord(equipment.isCredited),
      )

      expect(label).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('Состояние отображается', async () => {
      const equipment = warehouseFixtures.equipment()
      mockGetEquipmentSuccess(props.equipmentId, { body: equipment })
      mockGetEquipmentAttachmentListSuccess(props.equipmentId)

      render(<EquipmentDetails {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await equipmentDetailsTestUtils.expectLoadingFinished()
      const block = equipmentDetailsTestUtils.getBlock('condition')
      const label = equipmentDetailsTestUtils.getInfoInBlock(block, /Состояние/)
      const value = equipmentDetailsTestUtils.getInfoInBlock(
        block,
        equipmentConditionDict[equipment.condition],
      )

      expect(label).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('Дата оприходования отображается', async () => {
      const equipment = warehouseFixtures.equipment()
      mockGetEquipmentSuccess(props.equipmentId, { body: equipment })
      mockGetEquipmentAttachmentListSuccess(props.equipmentId)

      render(<EquipmentDetails {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await equipmentDetailsTestUtils.expectLoadingFinished()
      const block = equipmentDetailsTestUtils.getBlock('created-at')
      const label = equipmentDetailsTestUtils.getInfoInBlock(block, /Дата оприходования/)
      const value = equipmentDetailsTestUtils.getInfoInBlock(
        block,
        formatDate(equipment.createdAt, DATE_FORMAT),
      )

      expect(label).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('Кем оприходовано отображается', async () => {
      const equipment = warehouseFixtures.equipment()
      mockGetEquipmentSuccess(props.equipmentId, { body: equipment })
      mockGetEquipmentAttachmentListSuccess(props.equipmentId)

      render(<EquipmentDetails {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await equipmentDetailsTestUtils.expectLoadingFinished()
      const block = equipmentDetailsTestUtils.getBlock('created-by')
      const label = equipmentDetailsTestUtils.getInfoInBlock(block, /Кем оприходовано/)
      const value = equipmentDetailsTestUtils.getInfoInBlock(block, equipment.createdBy.fullName)

      expect(label).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('Количество отображается', async () => {
      const equipment = warehouseFixtures.equipment()
      mockGetEquipmentSuccess(props.equipmentId, { body: equipment })
      mockGetEquipmentAttachmentListSuccess(props.equipmentId)

      render(<EquipmentDetails {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await equipmentDetailsTestUtils.expectLoadingFinished()
      const block = equipmentDetailsTestUtils.getBlock('quantity')
      const quantityLabel = equipmentDetailsTestUtils.getInfoInBlock(block, /Количество/)
      const quantityValue = equipmentDetailsTestUtils.getInfoInBlock(block, equipment.quantity!)
      const measurementUnitLabel = equipmentDetailsTestUtils.getInfoInBlock(block, /Ед. изм/)
      const measurementUnitValue = equipmentDetailsTestUtils.getInfoInBlock(
        block,
        equipment.measurementUnit.title,
      )

      expect(quantityLabel).toBeInTheDocument()
      expect(quantityValue).toBeInTheDocument()
      expect(measurementUnitLabel).toBeInTheDocument()
      expect(measurementUnitValue).toBeInTheDocument()
    })

    test('Стоимость отображается', async () => {
      const equipment = warehouseFixtures.equipment()
      mockGetEquipmentSuccess(props.equipmentId, { body: equipment })
      mockGetEquipmentAttachmentListSuccess(props.equipmentId)

      render(<EquipmentDetails {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await equipmentDetailsTestUtils.expectLoadingFinished()
      const block = equipmentDetailsTestUtils.getBlock('price')
      const priceLabel = equipmentDetailsTestUtils.getInfoInBlock(block, /Стоимость/)
      const priceValue = equipmentDetailsTestUtils.getInfoInBlock(block, equipment.price!)
      const currencyLabel = equipmentDetailsTestUtils.getInfoInBlock(block, /Валюта/)
      const currencyValue = equipmentDetailsTestUtils.getInfoInBlock(
        block,
        equipment.currency!.title,
      )

      expect(priceLabel).toBeInTheDocument()
      expect(priceValue).toBeInTheDocument()
      expect(currencyLabel).toBeInTheDocument()
      expect(currencyValue).toBeInTheDocument()
    })

    describe('Новое', () => {
      test('Отображается если нет в списке скрытых', async () => {
        const equipment = warehouseFixtures.equipment()
        mockGetEquipmentSuccess(props.equipmentId, { body: equipment })
        mockGetEquipmentAttachmentListSuccess(props.equipmentId)

        render(<EquipmentDetails {...props} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        })

        await equipmentDetailsTestUtils.expectLoadingFinished()
        const block = equipmentDetailsTestUtils.getBlock('is-new')
        const label = equipmentDetailsTestUtils.getInfoInBlock(block, /Новое/)
        const value = equipmentDetailsTestUtils.getInfoInBlock(block, getYesNoWord(equipment.isNew))

        expect(label).toBeInTheDocument()
        expect(value).toBeInTheDocument()
      })

      test('Не отображается если категория расходный материал', async () => {
        const equipment = warehouseFixtures.equipment({
          category: warehouseFixtures.equipmentCategory({ code: EquipmentCategoryEnum.Consumable }),
        })
        mockGetEquipmentSuccess(props.equipmentId, { body: equipment })
        mockGetEquipmentAttachmentListSuccess(props.equipmentId)

        render(<EquipmentDetails {...props} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        })

        await equipmentDetailsTestUtils.expectLoadingFinished()
        const block = equipmentDetailsTestUtils.queryBlock('is-new')
        expect(block).not.toBeInTheDocument()
      })
    })

    describe('На гарантии', () => {
      test('Отображается если нет в списке скрытых', async () => {
        const equipment = warehouseFixtures.equipment()
        mockGetEquipmentSuccess(props.equipmentId, { body: equipment })
        mockGetEquipmentAttachmentListSuccess(props.equipmentId)

        render(<EquipmentDetails {...props} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        })

        await equipmentDetailsTestUtils.expectLoadingFinished()
        const block = equipmentDetailsTestUtils.getBlock('is-warranty')
        const label = equipmentDetailsTestUtils.getInfoInBlock(block, /На гарантии/)
        const value = equipmentDetailsTestUtils.getInfoInBlock(
          block,
          getYesNoWord(equipment.isWarranty),
        )

        expect(label).toBeInTheDocument()
        expect(value).toBeInTheDocument()
      })

      test('Не отображается если категория расходный материал', async () => {
        const equipment = warehouseFixtures.equipment({
          category: warehouseFixtures.equipmentCategory({ code: EquipmentCategoryEnum.Consumable }),
        })
        mockGetEquipmentSuccess(props.equipmentId, { body: equipment })
        mockGetEquipmentAttachmentListSuccess(props.equipmentId)

        render(<EquipmentDetails {...props} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        })

        await equipmentDetailsTestUtils.expectLoadingFinished()
        const block = equipmentDetailsTestUtils.queryBlock('is-warranty')
        expect(block).not.toBeInTheDocument()
      })
    })

    describe('Отремонтированное', () => {
      test('Отображается если нет в списке скрытых', async () => {
        const equipment = warehouseFixtures.equipment()
        mockGetEquipmentSuccess(props.equipmentId, { body: equipment })
        mockGetEquipmentAttachmentListSuccess(props.equipmentId)

        render(<EquipmentDetails {...props} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        })

        await equipmentDetailsTestUtils.expectLoadingFinished()
        const block = equipmentDetailsTestUtils.getBlock('is-repaired')
        const label = equipmentDetailsTestUtils.getInfoInBlock(block, /Отремонтированное/)
        const value = equipmentDetailsTestUtils.getInfoInBlock(
          block,
          getYesNoWord(equipment.isRepaired),
        )

        expect(label).toBeInTheDocument()
        expect(value).toBeInTheDocument()
      })

      test('Не отображается если категория расходный материал', async () => {
        const equipment = warehouseFixtures.equipment({
          category: warehouseFixtures.equipmentCategory({ code: EquipmentCategoryEnum.Consumable }),
        })
        mockGetEquipmentSuccess(props.equipmentId, { body: equipment })
        mockGetEquipmentAttachmentListSuccess(props.equipmentId)

        render(<EquipmentDetails {...props} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        })

        await equipmentDetailsTestUtils.expectLoadingFinished()
        const block = equipmentDetailsTestUtils.queryBlock('is-repaired')
        expect(block).not.toBeInTheDocument()
      })
    })

    describe('Счётчик пробега текущий', () => {
      test('Отображается если нет в списке скрытых', async () => {
        const equipment = warehouseFixtures.equipment()
        mockGetEquipmentSuccess(props.equipmentId, { body: equipment })
        mockGetEquipmentAttachmentListSuccess(props.equipmentId)

        render(<EquipmentDetails {...props} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        })

        await equipmentDetailsTestUtils.expectLoadingFinished()
        const block = equipmentDetailsTestUtils.getBlock('usage-counter')
        const label = equipmentDetailsTestUtils.getInfoInBlock(block, /Счётчик пробега текущий/)
        const value = equipmentDetailsTestUtils.getInfoInBlock(block, equipment.usageCounter!)

        expect(label).toBeInTheDocument()
        expect(value).toBeInTheDocument()
      })

      test('Не отображается если категория расходный материал', async () => {
        const equipment = warehouseFixtures.equipment({
          category: warehouseFixtures.equipmentCategory({ code: EquipmentCategoryEnum.Consumable }),
        })
        mockGetEquipmentSuccess(props.equipmentId, { body: equipment })
        mockGetEquipmentAttachmentListSuccess(props.equipmentId)

        render(<EquipmentDetails {...props} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        })

        await equipmentDetailsTestUtils.expectLoadingFinished()
        const block = equipmentDetailsTestUtils.queryBlock('usage-counter')
        expect(block).not.toBeInTheDocument()
      })
    })

    describe('Владелец оборудования', () => {
      test('Отображается вместе с макрорегионом если нет в списке скрытых', async () => {
        const equipment = warehouseFixtures.equipment()
        mockGetEquipmentSuccess(props.equipmentId, { body: equipment })
        mockGetEquipmentAttachmentListSuccess(props.equipmentId)

        render(<EquipmentDetails {...props} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        })

        await equipmentDetailsTestUtils.expectLoadingFinished()
        const block = equipmentDetailsTestUtils.getBlock('owner')
        const label = equipmentDetailsTestUtils.getInfoInBlock(block, /Владелец оборудования/)
        const value = equipmentDetailsTestUtils.getInfoInBlock(
          block,
          makeString(', ', equipment.owner!.title, equipment.macroregion!.title),
        )

        expect(label).toBeInTheDocument()
        expect(value).toBeInTheDocument()
      })

      test('Отображается значение по умолчанию', async () => {
        const equipment = warehouseFixtures.equipment({ owner: null })
        mockGetEquipmentSuccess(props.equipmentId, { body: equipment })
        mockGetEquipmentAttachmentListSuccess(props.equipmentId)

        render(<EquipmentDetails {...props} equipmentId={props.equipmentId} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        })

        await equipmentDetailsTestUtils.expectLoadingFinished()
        const block = equipmentDetailsTestUtils.getBlock('owner')
        const label = equipmentDetailsTestUtils.getInfoInBlock(block, /Владелец оборудования/)
        const value = equipmentDetailsTestUtils.getInfoInBlock(block, 'Obermeister')

        expect(label).toBeInTheDocument()
        expect(value).toBeInTheDocument()
      })

      test('Не отображается если категория расходный материал', async () => {
        const equipment = warehouseFixtures.equipment({
          category: warehouseFixtures.equipmentCategory({ code: EquipmentCategoryEnum.Consumable }),
        })
        mockGetEquipmentSuccess(props.equipmentId, { body: equipment })
        mockGetEquipmentAttachmentListSuccess(props.equipmentId)

        render(<EquipmentDetails {...props} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        })

        await equipmentDetailsTestUtils.expectLoadingFinished()
        const block = equipmentDetailsTestUtils.queryBlock('owner')
        expect(block).not.toBeInTheDocument()
      })
    })

    test('Назначение оборудования отображается', async () => {
      const equipment = warehouseFixtures.equipment()
      mockGetEquipmentSuccess(props.equipmentId, { body: equipment })
      mockGetEquipmentAttachmentListSuccess(props.equipmentId)

      render(<EquipmentDetails {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await equipmentDetailsTestUtils.expectLoadingFinished()
      const block = equipmentDetailsTestUtils.getBlock('purpose')
      const label = equipmentDetailsTestUtils.getInfoInBlock(block, /Назначение оборудования/)
      const value = equipmentDetailsTestUtils.getInfoInBlock(block, equipment.purpose.title)

      expect(label).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('Комментарий отображается', async () => {
      const equipment = warehouseFixtures.equipment()
      mockGetEquipmentSuccess(props.equipmentId, { body: equipment })
      mockGetEquipmentAttachmentListSuccess(props.equipmentId)

      render(<EquipmentDetails {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await equipmentDetailsTestUtils.expectLoadingFinished()
      const block = equipmentDetailsTestUtils.getBlock('comment')
      const label = equipmentDetailsTestUtils.getInfoInBlock(block, /Комментарий/)
      const value = equipmentDetailsTestUtils.getInfoInBlock(block, equipment.comment!)

      expect(label).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    describe('Изображения оборудования', () => {
      test('При успешном запросе отображаются корректно', async () => {
        mockGetEquipmentSuccess(props.equipmentId, { body: warehouseFixtures.equipment() })

        const attachmentList = attachmentFixtures.attachmentList()
        mockGetEquipmentAttachmentListSuccess(props.equipmentId, {
          body: commonFixtures.paginatedListResponse(attachmentList),
        })

        render(<EquipmentDetails {...props} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        })

        await equipmentDetailsTestUtils.expectLoadingStarted()
        await equipmentDetailsTestUtils.expectLoadingFinished()

        const block = equipmentDetailsTestUtils.getBlock('images')
        const label = equipmentDetailsTestUtils.getInfoInBlock(block, /Изображения оборудования/)
        const imagesContainer = equipmentDetailsTestUtils.getEquipmentImageList()

        expect(label).toBeInTheDocument()
        attachmentList.forEach((item) => {
          const image = attachmentImagesTestUtils.getImageIn(imagesContainer, item.name)
          expect(image).toBeInTheDocument()
        })
      })

      describe('При не успешном запросе', () => {
        test('Обрабатывается ошибка 403', async () => {
          mockGetEquipmentSuccess(props.equipmentId, { body: warehouseFixtures.equipment() })

          const errorMsg = fakeWord()
          mockGetEquipmentAttachmentListForbiddenError(props.equipmentId, {
            body: { detail: errorMsg },
          })

          render(<EquipmentDetails {...props} />, {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: { ...getUserMeQueryMock(userFixtures.user()) },
            }),
          })

          await equipmentDetailsTestUtils.expectLoadingStarted()
          await equipmentDetailsTestUtils.expectLoadingFinished()

          const notification = await notificationTestUtils.findNotification(errorMsg)
          expect(notification).toBeInTheDocument()
        })

        test('Обрабатывается ошибка 404', async () => {
          mockGetEquipmentSuccess(props.equipmentId, { body: warehouseFixtures.equipment() })

          const errorMsg = fakeWord()
          mockGetEquipmentAttachmentListNotFoundError(props.equipmentId, {
            body: { detail: errorMsg },
          })

          render(<EquipmentDetails {...props} />, {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: { ...getUserMeQueryMock(userFixtures.user()) },
            }),
          })

          await equipmentDetailsTestUtils.expectLoadingStarted()
          await equipmentDetailsTestUtils.expectLoadingFinished()

          const notification = await notificationTestUtils.findNotification(errorMsg)
          expect(notification).toBeInTheDocument()
        })

        test('Обрабатывается ошибка 500', async () => {
          mockGetEquipmentSuccess(props.equipmentId, { body: warehouseFixtures.equipment() })
          mockGetEquipmentAttachmentListServerError(props.equipmentId)

          render(<EquipmentDetails {...props} />, {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: { ...getUserMeQueryMock(userFixtures.user()) },
            }),
          })

          await equipmentDetailsTestUtils.expectLoadingStarted()
          await equipmentDetailsTestUtils.expectLoadingFinished()

          const notification = await notificationTestUtils.findNotification(
            getEquipmentAttachmentListErrMsg,
          )
          expect(notification).toBeInTheDocument()
        })
      })

      describe('Просмотр всех изображений', () => {
        test('Кнопка отображается корректно', async () => {
          mockGetEquipmentSuccess(props.equipmentId, { body: warehouseFixtures.equipment() })

          const attachmentListResponse = commonFixtures.paginatedListResponse(
            attachmentFixtures.attachmentList(),
          )
          mockGetEquipmentAttachmentListSuccess(props.equipmentId, {
            body: attachmentListResponse,
          })

          render(<EquipmentDetails {...props} />, {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: { ...getUserMeQueryMock(userFixtures.user()) },
            }),
          })

          await equipmentDetailsTestUtils.expectLoadingStarted()
          await equipmentDetailsTestUtils.expectLoadingFinished()

          const button = equipmentDetailsTestUtils.getViewAllImagesButton()

          expect(button).toBeInTheDocument()
          expect(button).toBeEnabled()
          expect(button).toHaveTextContent(`(${attachmentListResponse.count})`)
        })

        test('Модалка отображается корректно', async () => {
          mockGetEquipmentSuccess(props.equipmentId, { body: warehouseFixtures.equipment() })

          const attachmentList = attachmentFixtures.attachmentList()
          mockGetEquipmentAttachmentListSuccess(props.equipmentId, {
            body: commonFixtures.paginatedListResponse(attachmentList),
            once: false,
          })

          const { user } = render(<EquipmentDetails {...props} />, {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: { ...getUserMeQueryMock(userFixtures.user()) },
            }),
          })

          await equipmentDetailsTestUtils.expectLoadingStarted()
          await equipmentDetailsTestUtils.expectLoadingFinished()
          await equipmentDetailsTestUtils.clickViewAllImagesButton(user)

          const modal = await attachmentListModalTestUtils.findContainer()
          expect(modal).toBeInTheDocument()

          await equipmentDetailsTestUtils.expectTotalEquipmentImageListLoadingFinished()
          attachmentList.forEach((item) => {
            const image = attachmentImagesTestUtils.getImageIn(modal, item.name)
            expect(image).toBeInTheDocument()
          })
        })
      })
    })

    describe('QR код', () => {
      test('Отображается корректно', async () => {
        const equipment = warehouseFixtures.equipment()
        mockGetEquipmentSuccess(props.equipmentId, { body: equipment })
        mockGetEquipmentAttachmentListSuccess(props.equipmentId)

        render(<EquipmentDetails {...props} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        })

        await equipmentDetailsTestUtils.expectLoadingFinished()
        const block = equipmentDetailsTestUtils.getBlock('qr-code')
        const label = equipmentDetailsTestUtils.getInfoInBlock(block, /QR-код/)
        const image = within(block).getByRole('img')

        expect(label).toBeInTheDocument()
        expect(image).toHaveAttribute('width', '135')
        expect(image).toHaveAttribute('height', '155')
        expect(image).toHaveAttribute('src', equipment.qrCode)
      })

      describe('Кнопка печать', () => {
        test('Отображается корректно', async () => {
          const equipment = warehouseFixtures.equipment()
          mockGetEquipmentSuccess(props.equipmentId, { body: equipment })
          mockGetEquipmentAttachmentListSuccess(props.equipmentId)

          render(<EquipmentDetails {...props} />, {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: { ...getUserMeQueryMock(userFixtures.user()) },
            }),
          })

          await equipmentDetailsTestUtils.expectLoadingFinished()
          const block = equipmentDetailsTestUtils.getBlock('qr-code')
          const button = buttonTestUtils.getButtonIn(block, 'Печать')

          expect(button).toBeInTheDocument()
          expect(button).toBeEnabled()
        })

        test('При клике обработчик вызывается корректно', async () => {
          const printImageSpy = jest.spyOn(commonUtils, 'printImage')

          const equipment = warehouseFixtures.equipment()
          mockGetEquipmentSuccess(props.equipmentId, { body: equipment })
          mockGetEquipmentAttachmentListSuccess(props.equipmentId)

          const { user } = render(<EquipmentDetails {...props} />, {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: { ...getUserMeQueryMock(userFixtures.user()) },
            }),
          })

          await equipmentDetailsTestUtils.expectLoadingFinished()
          const block = equipmentDetailsTestUtils.getBlock('qr-code')
          const button = buttonTestUtils.getButtonIn(block, 'Печать')
          await user.click(button)

          expect(printImageSpy).toBeCalledTimes(1)
          expect(printImageSpy).toBeCalledWith(equipment.qrCode)
        })
      })
    })
  })

  describe('При не успешном запросе', () => {
    test('Обрабатывается ошибка 403', async () => {
      const errorMessage = fakeWord()
      mockGetEquipmentForbiddenError(props.equipmentId, { body: { detail: errorMessage } })
      mockGetEquipmentAttachmentListSuccess(props.equipmentId)

      render(<EquipmentDetails {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await equipmentDetailsTestUtils.expectLoadingFinished()
      const notification = await notificationTestUtils.findNotification(errorMessage)

      expect(notification).toBeInTheDocument()
    })

    test('Обрабатывается ошибка 404', async () => {
      const errorMessage = fakeWord()
      mockGetEquipmentNotFoundError(props.equipmentId, { body: { detail: errorMessage } })
      mockGetEquipmentAttachmentListSuccess(props.equipmentId)

      render(<EquipmentDetails {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await equipmentDetailsTestUtils.expectLoadingFinished()
      const notification = await notificationTestUtils.findNotification(errorMessage)

      expect(notification).toBeInTheDocument()
    })

    test('Обрабатывается ошибка 500', async () => {
      mockGetEquipmentServerError(props.equipmentId)
      mockGetEquipmentAttachmentListSuccess(props.equipmentId)

      render(<EquipmentDetails {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await equipmentDetailsTestUtils.expectLoadingFinished()
      const notification = await notificationTestUtils.findNotification(
        getEquipmentMessages.commonError,
      )

      expect(notification).toBeInTheDocument()
    })
  })

  describe('История перемещений', () => {
    test('Кнопка отображается', async () => {
      mockGetEquipmentSuccess(props.equipmentId, { body: warehouseFixtures.equipment() })
      mockGetEquipmentAttachmentListSuccess(props.equipmentId)

      const { user } = render(<EquipmentDetails {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await equipmentDetailsTestUtils.expectLoadingFinished()
      await equipmentDetailsTestUtils.openMenu(user)
      const menuItem = equipmentDetailsTestUtils.getRelocationHistoryMenuItem()

      expect(menuItem).toBeInTheDocument()
    })

    test('Кнопка активна если условия соблюдены', async () => {
      mockGetEquipmentSuccess(props.equipmentId, { body: warehouseFixtures.equipment() })
      mockGetEquipmentAttachmentListSuccess(props.equipmentId)

      const { user } = render(<EquipmentDetails {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: {
            ...getUserMeQueryMock({
              permissions: [
                UserPermissionsEnum.EquipmentsRead,
                UserPermissionsEnum.RelocationTasksRead,
              ],
            }),
          },
        }),
      })

      await equipmentDetailsTestUtils.expectLoadingFinished()
      await equipmentDetailsTestUtils.openMenu(user)
      const menuItem = equipmentDetailsTestUtils.getRelocationHistoryMenuItem()

      menuTestUtils.expectMenuItemNotDisabled(menuItem)
    })

    test('Кнопка не активна если условия соблюдены, но нет прав на чтение оборудования', async () => {
      mockGetEquipmentSuccess(props.equipmentId, { body: warehouseFixtures.equipment() })
      mockGetEquipmentAttachmentListSuccess(props.equipmentId)

      const { user } = render(<EquipmentDetails {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: {
            ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.RelocationTasksRead] }),
          },
        }),
      })

      await equipmentDetailsTestUtils.expectLoadingFinished()
      await equipmentDetailsTestUtils.openMenu(user)
      const menuItem = equipmentDetailsTestUtils.getRelocationHistoryMenuItem()

      menuTestUtils.expectMenuItemDisabled(menuItem)
    })

    test('Кнопка не активна если условия соблюдены, но нет прав на чтение заявок на перемещение', async () => {
      mockGetEquipmentSuccess(props.equipmentId, { body: warehouseFixtures.equipment() })
      mockGetEquipmentAttachmentListSuccess(props.equipmentId)

      const { user } = render(<EquipmentDetails {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: {
            ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.EquipmentsRead] }),
          },
        }),
      })

      await equipmentDetailsTestUtils.expectLoadingFinished()
      await equipmentDetailsTestUtils.openMenu(user)
      const menuItem = equipmentDetailsTestUtils.getRelocationHistoryMenuItem()

      menuTestUtils.expectMenuItemDisabled(menuItem)
    })

    test('При клике на кнопку открывается модалка', async () => {
      mockGetEquipmentSuccess(props.equipmentId, { body: warehouseFixtures.equipment() })
      mockGetEquipmentRelocationHistorySuccess(props.equipmentId)
      mockGetEquipmentAttachmentListSuccess(props.equipmentId)

      const { user } = render(<EquipmentDetails {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: {
            ...getUserMeQueryMock({
              permissions: [
                UserPermissionsEnum.EquipmentsRead,
                UserPermissionsEnum.RelocationTasksRead,
              ],
            }),
          },
        }),
      })

      await equipmentDetailsTestUtils.expectLoadingFinished()
      await equipmentDetailsTestUtils.openMenu(user)
      await equipmentDetailsTestUtils.clickRelocationHistoryMenuItem(user)
      const modal = await equipmentRelocationHistoryModalTestUtils.findContainer()

      expect(modal).toBeInTheDocument()
    })

    test('При успешном запросе данные отображаются', async () => {
      mockGetEquipmentSuccess(props.equipmentId, { body: warehouseFixtures.equipment() })
      mockGetEquipmentAttachmentListSuccess(props.equipmentId)

      const equipmentRelocationHistory = warehouseFixtures.equipmentRelocationHistory()
      mockGetEquipmentRelocationHistorySuccess(props.equipmentId, {
        body: equipmentRelocationHistory,
      })

      const { user } = render(<EquipmentDetails {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: {
            ...getUserMeQueryMock({
              permissions: [
                UserPermissionsEnum.EquipmentsRead,
                UserPermissionsEnum.RelocationTasksRead,
              ],
            }),
          },
        }),
      })

      await equipmentDetailsTestUtils.expectLoadingFinished()
      await equipmentDetailsTestUtils.openMenu(user)
      await equipmentDetailsTestUtils.clickRelocationHistoryMenuItem(user)
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
        mockGetEquipmentAttachmentListSuccess(props.equipmentId)

        const errorMsg = fakeWord()
        mockGetEquipmentRelocationHistoryForbiddenError(props.equipmentId, {
          body: { detail: errorMsg },
        })

        const { user } = render(<EquipmentDetails {...props} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock({
                permissions: [
                  UserPermissionsEnum.EquipmentsRead,
                  UserPermissionsEnum.RelocationTasksRead,
                ],
              }),
            },
          }),
        })

        await equipmentDetailsTestUtils.expectLoadingFinished()
        await equipmentDetailsTestUtils.openMenu(user)
        await equipmentDetailsTestUtils.clickRelocationHistoryMenuItem(user)
        await equipmentRelocationHistoryModalTestUtils.findContainer()

        const notification = await notificationTestUtils.findNotification(errorMsg)
        expect(notification).toBeInTheDocument()
      })

      test('Обрабатывается ошибка 404', async () => {
        mockGetEquipmentSuccess(props.equipmentId, { body: warehouseFixtures.equipment() })
        mockGetEquipmentAttachmentListSuccess(props.equipmentId)

        const errorMsg = fakeWord()
        mockGetEquipmentRelocationHistoryNotFoundError(props.equipmentId, {
          body: { detail: errorMsg },
        })

        const { user } = render(<EquipmentDetails {...props} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock({
                permissions: [
                  UserPermissionsEnum.EquipmentsRead,
                  UserPermissionsEnum.RelocationTasksRead,
                ],
              }),
            },
          }),
        })

        await equipmentDetailsTestUtils.expectLoadingFinished()
        await equipmentDetailsTestUtils.openMenu(user)
        await equipmentDetailsTestUtils.clickRelocationHistoryMenuItem(user)
        await equipmentRelocationHistoryModalTestUtils.findContainer()

        const notification = await notificationTestUtils.findNotification(errorMsg)
        expect(notification).toBeInTheDocument()
      })

      test('Обрабатывается ошибка 500', async () => {
        mockGetEquipmentSuccess(props.equipmentId, { body: warehouseFixtures.equipment() })
        mockGetEquipmentRelocationHistoryServerError(props.equipmentId)
        mockGetEquipmentAttachmentListSuccess(props.equipmentId)

        const { user } = render(<EquipmentDetails {...props} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock({
                permissions: [
                  UserPermissionsEnum.EquipmentsRead,
                  UserPermissionsEnum.RelocationTasksRead,
                ],
              }),
            },
          }),
        })

        await equipmentDetailsTestUtils.expectLoadingFinished()
        await equipmentDetailsTestUtils.openMenu(user)
        await equipmentDetailsTestUtils.clickRelocationHistoryMenuItem(user)
        await equipmentRelocationHistoryModalTestUtils.findContainer()

        const notification = await notificationTestUtils.findNotification(
          getEquipmentRelocationHistoryMessages.commonError,
        )
        expect(notification).toBeInTheDocument()
      })
    })

    test('При клике на строку истории открывается карточка заявки на перемещение', async () => {
      mockGetEquipmentSuccess(props.equipmentId, { body: warehouseFixtures.equipment() })
      mockGetEquipmentAttachmentListSuccess(props.equipmentId)

      const equipmentRelocationHistoryItem = warehouseFixtures.equipmentRelocationHistoryItem()
      mockGetEquipmentRelocationHistorySuccess(props.equipmentId, {
        body: [equipmentRelocationHistoryItem],
      })

      mockGetRelocationTaskSuccess(equipmentRelocationHistoryItem.id)
      mockGetRelocationEquipmentListSuccess(equipmentRelocationHistoryItem.id)

      const { user } = render(<EquipmentDetails {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: {
            ...getUserMeQueryMock({
              permissions: [
                UserPermissionsEnum.EquipmentsRead,
                UserPermissionsEnum.RelocationTasksRead,
              ],
            }),
          },
        }),
      })

      await equipmentDetailsTestUtils.expectLoadingFinished()
      await equipmentDetailsTestUtils.openMenu(user)
      await equipmentDetailsTestUtils.clickRelocationHistoryMenuItem(user)
      await equipmentRelocationHistoryModalTestUtils.findContainer()
      await equipmentRelocationHistoryModalTestUtils.expectLoadingFinished()
      await equipmentRelocationHistoryModalTestUtils.clickRow(
        user,
        equipmentRelocationHistoryItem.id,
      )
      const relocationTaskDetails = await relocationTaskDetailsTestUtils.findContainer()

      expect(relocationTaskDetails).toBeInTheDocument()
    })
  })

  describe('Редактирование', () => {
    test('Элемент в меню отображается и активен', async () => {
      const equipment = warehouseFixtures.equipment({ id: props.equipmentId })
      mockGetEquipmentSuccess(equipment.id, { body: equipment })
      mockGetEquipmentAttachmentListSuccess(props.equipmentId)

      const { user } = render(<EquipmentDetails {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await equipmentDetailsTestUtils.expectLoadingFinished()
      await equipmentDetailsTestUtils.openMenu(user)
      const menuItem = equipmentDetailsTestUtils.getEditMenuItem()

      expect(menuItem).toBeInTheDocument()
      expect(menuItem).toBeEnabled()
    })

    test('Модалка открывается', async () => {
      const equipment = warehouseFixtures.equipment({ id: props.equipmentId })
      mockGetEquipmentSuccess(equipment.id, { body: equipment })
      mockGetEquipmentAttachmentListSuccess(props.equipmentId)
      mockGetWarehouseListSuccess()
      mockGetWorkTypesSuccess()
      mockGetCurrencyListSuccess()
      mockGetEquipmentCategoryListSuccess()
      mockGetNomenclatureListSuccess()
      mockGetNomenclatureSuccess(equipment.nomenclature.id)
      mockGetCustomerListSuccess()

      const { user } = render(<EquipmentDetails {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await equipmentDetailsTestUtils.expectLoadingFinished()
      await equipmentDetailsTestUtils.openMenu(user)
      await equipmentDetailsTestUtils.clickEditMenuItem(user)
      const modal = await equipmentFormModalTestUtils.findContainer()

      expect(modal).toBeInTheDocument()
    })
  })

  describe('История АТЭ', () => {
    test('Элемент в меню отображается и активен', async () => {
      const equipment = warehouseFixtures.equipment({ id: props.equipmentId })
      mockGetEquipmentSuccess(equipment.id, { body: equipment })
      mockGetEquipmentAttachmentListSuccess(props.equipmentId)

      const { user } = render(<EquipmentDetails {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await equipmentDetailsTestUtils.expectLoadingFinished()
      await equipmentDetailsTestUtils.openMenu(user)
      const menuItem = equipmentDetailsTestUtils.getTechnicalExaminationsMenuItem()

      expect(menuItem).toBeInTheDocument()
      expect(menuItem).toBeEnabled()
    })

    test('Модалка открывается', async () => {
      const equipment = warehouseFixtures.equipment({ id: props.equipmentId })
      mockGetEquipmentSuccess(equipment.id, { body: equipment })
      mockGetEquipmentAttachmentListSuccess(props.equipmentId)
      mockGetTechnicalExaminationsSuccess()

      const { user } = render(<EquipmentDetails {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await equipmentDetailsTestUtils.expectLoadingFinished()
      await equipmentDetailsTestUtils.openMenu(user)
      await equipmentDetailsTestUtils.clickTechnicalExaminationsMenuItem(user)
      const modal = await technicalExaminationsHistoryModalTestUtils.findContainer()

      expect(modal).toBeInTheDocument()
    })
  })

  describe('Сформировать АТЭ', () => {
    test('Элемент в меню отображается', async () => {
      const equipment = warehouseFixtures.equipment({ id: props.equipmentId })
      mockGetEquipmentSuccess(equipment.id, { body: equipment })
      mockGetEquipmentAttachmentListSuccess(props.equipmentId)

      const { user } = render(<EquipmentDetails {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await equipmentDetailsTestUtils.expectLoadingFinished()
      await equipmentDetailsTestUtils.openMenu(user)
      const menuItem = equipmentDetailsTestUtils.getCreateEquipmentTechnicalExaminationMenuItem()
      expect(menuItem).toBeInTheDocument()
    })

    test(`Элемент в меню активен если есть права ${UserPermissionsEnum.EquipmentsRead}, состояние оборудования ${EquipmentConditionEnum.Broken}`, async () => {
      const equipment = warehouseFixtures.equipment({
        id: props.equipmentId,
        condition: EquipmentConditionEnum.Broken,
      })

      mockGetEquipmentSuccess(equipment.id, { body: equipment })
      mockGetEquipmentAttachmentListSuccess(props.equipmentId)

      const { user } = render(<EquipmentDetails {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: {
            ...getUserMeQueryMock(
              userFixtures.user({ permissions: [UserPermissionsEnum.EquipmentsRead] }),
            ),
          },
        }),
      })

      await equipmentDetailsTestUtils.expectLoadingFinished()
      await equipmentDetailsTestUtils.openMenu(user)
      const menuItem = equipmentDetailsTestUtils.getCreateEquipmentTechnicalExaminationMenuItem()
      menuTestUtils.expectMenuItemNotDisabled(menuItem)
    })

    test(`Элемент в меню активен если есть права ${UserPermissionsEnum.EquipmentsRead}, состояние оборудования ${EquipmentConditionEnum.NonRepairable}`, async () => {
      const equipment = warehouseFixtures.equipment({
        id: props.equipmentId,
        condition: EquipmentConditionEnum.NonRepairable,
      })

      mockGetEquipmentSuccess(equipment.id, { body: equipment })
      mockGetEquipmentAttachmentListSuccess(props.equipmentId)

      const { user } = render(<EquipmentDetails {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: {
            ...getUserMeQueryMock(
              userFixtures.user({ permissions: [UserPermissionsEnum.EquipmentsRead] }),
            ),
          },
        }),
      })

      await equipmentDetailsTestUtils.expectLoadingFinished()
      await equipmentDetailsTestUtils.openMenu(user)
      const menuItem = equipmentDetailsTestUtils.getCreateEquipmentTechnicalExaminationMenuItem()
      menuTestUtils.expectMenuItemNotDisabled(menuItem)
    })

    test(`Элемент в меню не активен если есть права ${UserPermissionsEnum.EquipmentsRead}, но состояние оборудования не ${EquipmentConditionEnum.Broken} или ${EquipmentConditionEnum.NonRepairable}`, async () => {
      const equipment = warehouseFixtures.equipment({
        id: props.equipmentId,
        condition: EquipmentConditionEnum.Working,
      })

      mockGetEquipmentSuccess(equipment.id, { body: equipment })
      mockGetEquipmentAttachmentListSuccess(props.equipmentId)

      const { user } = render(<EquipmentDetails {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: {
            ...getUserMeQueryMock(
              userFixtures.user({ permissions: [UserPermissionsEnum.EquipmentsRead] }),
            ),
          },
        }),
      })

      await equipmentDetailsTestUtils.expectLoadingFinished()
      await equipmentDetailsTestUtils.openMenu(user)
      const menuItem = equipmentDetailsTestUtils.getCreateEquipmentTechnicalExaminationMenuItem()
      menuTestUtils.expectMenuItemDisabled(menuItem)
    })

    test(`Элемент в меню не активен если нет прав ${UserPermissionsEnum.EquipmentsRead}, состояние оборудования ${EquipmentConditionEnum.Broken}`, async () => {
      const equipment = warehouseFixtures.equipment({
        id: props.equipmentId,
        condition: EquipmentConditionEnum.Broken,
      })

      mockGetEquipmentSuccess(equipment.id, { body: equipment })
      mockGetEquipmentAttachmentListSuccess(props.equipmentId)

      const { user } = render(<EquipmentDetails {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await equipmentDetailsTestUtils.expectLoadingFinished()
      await equipmentDetailsTestUtils.openMenu(user)
      const menuItem = equipmentDetailsTestUtils.getCreateEquipmentTechnicalExaminationMenuItem()
      menuTestUtils.expectMenuItemDisabled(menuItem)
    })

    test(`Элемент в меню не активен если нет прав ${UserPermissionsEnum.EquipmentsRead}, состояние оборудования ${EquipmentConditionEnum.NonRepairable}`, async () => {
      const equipment = warehouseFixtures.equipment({
        id: props.equipmentId,
        condition: EquipmentConditionEnum.NonRepairable,
      })

      mockGetEquipmentSuccess(equipment.id, { body: equipment })
      mockGetEquipmentAttachmentListSuccess(props.equipmentId)

      const { user } = render(<EquipmentDetails {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await equipmentDetailsTestUtils.expectLoadingFinished()
      await equipmentDetailsTestUtils.openMenu(user)
      const menuItem = equipmentDetailsTestUtils.getCreateEquipmentTechnicalExaminationMenuItem()
      menuTestUtils.expectMenuItemDisabled(menuItem)
    })

    test('Модалка открывается', async () => {
      const equipment = warehouseFixtures.equipment({
        id: props.equipmentId,
        condition: EquipmentConditionEnum.NonRepairable,
      })

      mockGetEquipmentSuccess(equipment.id, { body: equipment })
      mockGetEquipmentAttachmentListSuccess(props.equipmentId)

      const { user } = render(<EquipmentDetails {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: {
            ...getUserMeQueryMock(
              userFixtures.user({ permissions: [UserPermissionsEnum.EquipmentsRead] }),
            ),
          },
        }),
      })

      await equipmentDetailsTestUtils.expectLoadingFinished()
      await equipmentDetailsTestUtils.openMenu(user)
      await equipmentDetailsTestUtils.clickCreateEquipmentTechnicalExaminationMenuItem(user)
      const modal = await createEquipmentTechnicalExaminationModalTestUtils.findContainer()

      expect(modal).toBeInTheDocument()
    })
  })
})
