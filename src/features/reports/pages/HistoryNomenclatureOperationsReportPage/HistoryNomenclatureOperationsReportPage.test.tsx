import { EquipmentConditionEnum } from 'features/equipments/api/constants'
import { equipmentConditionDict } from 'features/equipments/constants'
import { testUtils as historyNomenclatureOperationsReportFilterTestUtils } from 'features/reports/components/HistoryNomenclatureOperationsReportFilter/HistoryNomenclatureOperationsReportFilter.test'
import { testUtils as historyNomenclatureOperationsReportFormTestUtils } from 'features/reports/components/HistoryNomenclatureOperationsReportForm/HistoryNomenclatureOperationsReportForm.test'
import { testUtils as historyNomenclatureOperationsReportTableTestUtils } from 'features/reports/components/HistoryNomenclatureOperationsReportTable/HistoryNomenclatureOperationsReportTable.test'
import { getRelocationTaskReportTableColValue } from 'features/reports/helpers'

import { DEFAULT_FILE_NAME } from 'shared/constants/common'
import { MimetypeEnum } from 'shared/constants/mimetype'
import * as base64Utils from 'shared/utils/common/base64'
import * as downloadFileUtils from 'shared/utils/file/downloadFile'

import { equipmentDetailsTestUtils } from '_tests_/features/warehouses/components/EquipmentDetails/testUtils'
import { relocationTaskDetailsTestUtils } from '_tests_/features/warehouses/components/RelocationTaskDetails/testUtils'
import { historyNomenclatureOperationsReportPageTestUtils } from '_tests_/features/warehouses/pages/HistoryNomenclatureOperationsReportPage/testUtils'
import commonFixtures from '_tests_/fixtures/api/common'
import catalogsFixtures from '_tests_/fixtures/api/data/catalogs'
import equipmentsFixtures from '_tests_/fixtures/api/data/equipments'
import reportsFixtures from '_tests_/fixtures/api/data/reports'
import userFixtures from '_tests_/fixtures/api/data/users'
import {
  mockGetCustomersSuccess,
  mockGetEquipmentAttachmentsSuccess,
  mockGetEquipmentNomenclaturesSuccess,
  mockGetEquipmentSuccess,
  mockGetHistoryNomenclatureOperationsReportSuccess,
  mockGetHistoryNomenclatureOperationsReportXlsxSuccess,
  mockGetLocationsCatalogSuccess,
  mockGetRelocationEquipmentsSuccess,
  mockGetRelocationTaskSuccess,
} from '_tests_/mocks/api'
import { getStoreWithAuth } from '_tests_/fixtures/store/auth'
import { getUserMeQueryMock } from '_tests_/fixtures/store/users'
import { fakeWord, render, setupApiTests } from '_tests_/helpers'

import HistoryNomenclatureOperationsReportPage from './index'

setupApiTests()

describe('Страница отчета истории операций по номенклатуре', () => {
  describe('Таблица отчета', () => {
    test('При клике на оборудование открывается карточка оборудования', async () => {
      const equipmentNomenclatureListItem = equipmentsFixtures.equipmentNomenclatureListItem()
      mockGetEquipmentNomenclaturesSuccess({
        body: commonFixtures.paginatedListResponse([equipmentNomenclatureListItem]),
      })

      const reportListItem = reportsFixtures.historyNomenclatureOperationsReportItem()
      mockGetHistoryNomenclatureOperationsReportSuccess(equipmentNomenclatureListItem.id, {
        body: commonFixtures.paginatedListResponse([reportListItem]),
      })

      const locationCatalogItem = catalogsFixtures.locationCatalogItem()
      mockGetLocationsCatalogSuccess({ body: [locationCatalogItem] })

      mockGetEquipmentSuccess(reportListItem.id)
      mockGetEquipmentAttachmentsSuccess(reportListItem.id)

      const { user } = render(<HistoryNomenclatureOperationsReportPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
        }),
      })

      await historyNomenclatureOperationsReportFormTestUtils.expectNomenclaturesLoadingFinished()
      await historyNomenclatureOperationsReportFormTestUtils.openNomenclatureSelect(user)
      await historyNomenclatureOperationsReportFormTestUtils.setNomenclature(
        user,
        equipmentNomenclatureListItem.title,
      )
      await historyNomenclatureOperationsReportFormTestUtils.clickSubmitButton(user)
      await historyNomenclatureOperationsReportTableTestUtils.expectLoadingFinished()
      await historyNomenclatureOperationsReportTableTestUtils.clickColValue(
        user,
        reportListItem.id,
        reportListItem.title,
      )
      const details = await equipmentDetailsTestUtils.findContainer()

      expect(details).toBeInTheDocument()
    })

    test('При клике на перемещение открывается карточка заявки на перемещение', async () => {
      const equipmentNomenclatureListItem = equipmentsFixtures.equipmentNomenclatureListItem()
      mockGetEquipmentNomenclaturesSuccess({
        body: commonFixtures.paginatedListResponse([equipmentNomenclatureListItem]),
      })

      const reportListItem = reportsFixtures.historyNomenclatureOperationsReportItem()
      mockGetHistoryNomenclatureOperationsReportSuccess(equipmentNomenclatureListItem.id, {
        body: commonFixtures.paginatedListResponse([reportListItem]),
      })

      const locationCatalogItem = catalogsFixtures.locationCatalogItem()
      mockGetLocationsCatalogSuccess({ body: [locationCatalogItem] })

      mockGetRelocationTaskSuccess({ relocationTaskId: reportListItem.lastRelocationTask.id })
      mockGetRelocationEquipmentsSuccess({
        relocationTaskId: reportListItem.lastRelocationTask.id,
      })

      const { user } = render(<HistoryNomenclatureOperationsReportPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
        }),
      })

      await historyNomenclatureOperationsReportFormTestUtils.expectNomenclaturesLoadingFinished()
      await historyNomenclatureOperationsReportFormTestUtils.openNomenclatureSelect(user)
      await historyNomenclatureOperationsReportFormTestUtils.setNomenclature(
        user,
        equipmentNomenclatureListItem.title,
      )
      await historyNomenclatureOperationsReportFormTestUtils.clickSubmitButton(user)
      await historyNomenclatureOperationsReportTableTestUtils.expectLoadingFinished()
      await historyNomenclatureOperationsReportTableTestUtils.clickColValue(
        user,
        reportListItem.id,
        getRelocationTaskReportTableColValue(reportListItem.lastRelocationTask),
      )
      const details = await relocationTaskDetailsTestUtils.findContainer()

      expect(details).toBeInTheDocument()
    })
  })

  describe('Фильтры', () => {
    test('После применения отображается отчет', async () => {
      const equipmentNomenclatureListItem = equipmentsFixtures.equipmentNomenclatureListItem()
      mockGetEquipmentNomenclaturesSuccess({
        body: commonFixtures.paginatedListResponse([equipmentNomenclatureListItem]),
      })

      const reportListItem = reportsFixtures.historyNomenclatureOperationsReportItem()
      mockGetHistoryNomenclatureOperationsReportSuccess(equipmentNomenclatureListItem.id, {
        body: commonFixtures.paginatedListResponse([reportListItem]),
        once: false,
      })

      mockGetLocationsCatalogSuccess()
      mockGetCustomersSuccess()

      const { user } = render(<HistoryNomenclatureOperationsReportPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
        }),
      })

      await historyNomenclatureOperationsReportFormTestUtils.expectNomenclaturesLoadingFinished()
      await historyNomenclatureOperationsReportFormTestUtils.openNomenclatureSelect(user)
      await historyNomenclatureOperationsReportFormTestUtils.setNomenclature(
        user,
        equipmentNomenclatureListItem.title,
      )
      await historyNomenclatureOperationsReportFormTestUtils.clickSubmitButton(user)
      await historyNomenclatureOperationsReportTableTestUtils.expectLoadingFinished()
      await historyNomenclatureOperationsReportPageTestUtils.clickFilterButton(user)
      await historyNomenclatureOperationsReportFilterTestUtils.findContainer()
      await historyNomenclatureOperationsReportFilterTestUtils.openConditionsSelect(user)
      await historyNomenclatureOperationsReportFilterTestUtils.setCondition(
        user,
        equipmentConditionDict[EquipmentConditionEnum.WrittenOff],
      )
      await historyNomenclatureOperationsReportFilterTestUtils.clickApplyButton(user)
      await historyNomenclatureOperationsReportTableTestUtils.expectLoadingStarted()
      await historyNomenclatureOperationsReportTableTestUtils.expectLoadingFinished()
    })
  })

  describe('Выгрузка в excel', () => {
    test('При успешном запросе вызывается функция открытия окна скачивания', async () => {
      const downloadFileSpy = jest.spyOn(downloadFileUtils, 'downloadFile')

      const base64ToBytes = jest.spyOn(base64Utils, 'base64ToBytes')
      const fakeArrayBuffer = new Uint8Array()
      base64ToBytes.mockReturnValueOnce(fakeArrayBuffer)

      const equipmentNomenclatureListItem = equipmentsFixtures.equipmentNomenclatureListItem()
      mockGetEquipmentNomenclaturesSuccess({
        body: commonFixtures.paginatedListResponse([equipmentNomenclatureListItem]),
      })

      const reportListItem = reportsFixtures.historyNomenclatureOperationsReportItem()
      mockGetHistoryNomenclatureOperationsReportSuccess(equipmentNomenclatureListItem.id, {
        body: commonFixtures.paginatedListResponse([reportListItem]),
      })

      const { user } = render(<HistoryNomenclatureOperationsReportPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
        }),
      })

      await historyNomenclatureOperationsReportFormTestUtils.expectNomenclaturesLoadingFinished()
      await historyNomenclatureOperationsReportFormTestUtils.openNomenclatureSelect(user)
      await historyNomenclatureOperationsReportFormTestUtils.setNomenclature(
        user,
        equipmentNomenclatureListItem.title,
      )
      await historyNomenclatureOperationsReportFormTestUtils.clickSubmitButton(user)
      await historyNomenclatureOperationsReportTableTestUtils.expectLoadingFinished()

      const file = fakeWord()
      mockGetHistoryNomenclatureOperationsReportXlsxSuccess(equipmentNomenclatureListItem.id, {
        body: file,
      })

      await historyNomenclatureOperationsReportPageTestUtils.clickExportToExcelButton(user)
      await historyNomenclatureOperationsReportPageTestUtils.expectExportToExcelLoadingFinished()

      expect(base64ToBytes).toBeCalledTimes(1)
      expect(base64ToBytes).toBeCalledWith(file)

      expect(downloadFileSpy).toBeCalledTimes(1)
      expect(downloadFileSpy).toBeCalledWith(fakeArrayBuffer, MimetypeEnum.Xlsx, DEFAULT_FILE_NAME)
    })
  })
})
