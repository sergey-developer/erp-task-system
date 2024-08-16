import { screen } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { testUtils as historyNomenclatureOperationsReportFilterTestUtils } from 'modules/reports/components/HistoryNomenclatureOperationsReportFilter/HistoryNomenclatureOperationsReportFilter.test'
import { testUtils as historyNomenclatureOperationsReportFormTestUtils } from 'modules/reports/components/HistoryNomenclatureOperationsReportForm/HistoryNomenclatureOperationsReportForm.test'
import { testUtils as historyNomenclatureOperationsReportTableTestUtils } from 'modules/reports/components/HistoryNomenclatureOperationsReportTable/HistoryNomenclatureOperationsReportTable.test'
import { getRelocationColValue } from 'modules/reports/utils'
import { testUtils as equipmentDetailsTestUtils } from 'modules/warehouse/components/EquipmentDetails/EquipmentDetails.test'
import { testUtils as relocationTaskDetailsTestUtils } from 'modules/warehouse/components/RelocationTaskDetails/RelocationTaskDetails.test'
import {
  equipmentConditionDict,
  EquipmentConditionEnum,
} from 'modules/warehouse/constants/equipment'

import { MimetypeEnum } from 'shared/constants/mimetype'
import * as base64Utils from 'shared/utils/common/base64'
import * as downloadFileUtils from 'shared/utils/file/downloadFile'

import catalogsFixtures from '_tests_/fixtures/catalogs'
import commonFixtures from '_tests_/fixtures/common'
import reportsFixtures from '_tests_/fixtures/reports'
import userFixtures from '_tests_/fixtures/user'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import {
  mockGetCustomerListSuccess,
  mockGetEquipmentAttachmentListSuccess,
  mockGetEquipmentNomenclaturesSuccess,
  mockGetEquipmentSuccess,
  mockGetHistoryNomenclatureOperationsReportSuccess,
  mockGetHistoryNomenclatureOperationsReportXlsxSuccess,
  mockGetLocationsCatalogSuccess,
  mockGetRelocationEquipmentListSuccess,
  mockGetRelocationTaskSuccess,
} from '_tests_/mocks/api'
import { getUserMeQueryMock } from '_tests_/mocks/state/user'
import { buttonTestUtils, fakeWord, getStoreWithAuth, render, setupApiTests } from '_tests_/utils'

import HistoryNomenclatureOperationsReportPage from './index'

const getContainer = () => screen.getByTestId('history-nomenclature-operations-report-page')

// filter button
const getFilterButton = () => buttonTestUtils.getButtonIn(getContainer(), /filter/)

const clickFilterButton = async (user: UserEvent) => {
  const button = getFilterButton()
  await user.click(button)
}

// export to excel button
const getExportToExcelButton = () =>
  buttonTestUtils.getButtonIn(getContainer(), /Выгрузить в Excel/)

const clickExportToExcelButton = async (user: UserEvent) => {
  const button = getExportToExcelButton()
  await user.click(button)
}

const expectExportToExcelLoadingFinished = () =>
  buttonTestUtils.expectLoadingFinished(getExportToExcelButton())

export const testUtils = {
  getContainer,

  clickFilterButton,

  getExportToExcelButton,
  clickExportToExcelButton,
  expectExportToExcelLoadingFinished,
}

setupApiTests()

describe('Страница отчета истории операций по номенклатуре', () => {
  describe('Таблица отчета', () => {
    test('При клике на оборудование открывается карточка оборудования', async () => {
      const equipmentNomenclatureListItem = warehouseFixtures.equipmentNomenclatureListItem()
      mockGetEquipmentNomenclaturesSuccess({
        body: commonFixtures.paginatedListResponse([equipmentNomenclatureListItem]),
      })

      const reportListItem = reportsFixtures.historyNomenclatureOperationsReportListItem()
      mockGetHistoryNomenclatureOperationsReportSuccess(equipmentNomenclatureListItem.id, {
        body: commonFixtures.paginatedListResponse([reportListItem]),
      })

      const locationListItem = catalogsFixtures.locationCatalogListItem()
      mockGetLocationsCatalogSuccess({ body: [locationListItem] })

      mockGetEquipmentSuccess(reportListItem.id)
      mockGetEquipmentAttachmentListSuccess(reportListItem.id)

      const { user } = render(<HistoryNomenclatureOperationsReportPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
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
      const equipmentNomenclatureListItem = warehouseFixtures.equipmentNomenclatureListItem()
      mockGetEquipmentNomenclaturesSuccess({
        body: commonFixtures.paginatedListResponse([equipmentNomenclatureListItem]),
      })

      const reportListItem = reportsFixtures.historyNomenclatureOperationsReportListItem()
      mockGetHistoryNomenclatureOperationsReportSuccess(equipmentNomenclatureListItem.id, {
        body: commonFixtures.paginatedListResponse([reportListItem]),
      })

      const locationListItem = catalogsFixtures.locationCatalogListItem()
      mockGetLocationsCatalogSuccess({ body: [locationListItem] })

      mockGetRelocationTaskSuccess(reportListItem.lastRelocationTask.id)
      mockGetRelocationEquipmentListSuccess(reportListItem.lastRelocationTask.id)

      const { user } = render(<HistoryNomenclatureOperationsReportPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
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
        getRelocationColValue(reportListItem.lastRelocationTask),
      )
      const details = await relocationTaskDetailsTestUtils.findContainer()

      expect(details).toBeInTheDocument()
    })
  })

  describe('Фильтры', () => {
    test('После применения отображается отчет', async () => {
      const equipmentNomenclatureListItem = warehouseFixtures.equipmentNomenclatureListItem()
      mockGetEquipmentNomenclaturesSuccess({
        body: commonFixtures.paginatedListResponse([equipmentNomenclatureListItem]),
      })

      const reportListItem = reportsFixtures.historyNomenclatureOperationsReportListItem()
      mockGetHistoryNomenclatureOperationsReportSuccess(equipmentNomenclatureListItem.id, {
        body: commonFixtures.paginatedListResponse([reportListItem]),
        once: false,
      })

      mockGetLocationsCatalogSuccess()
      mockGetCustomerListSuccess()

      const { user } = render(<HistoryNomenclatureOperationsReportPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
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
      await testUtils.clickFilterButton(user)
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

      const equipmentNomenclatureListItem = warehouseFixtures.equipmentNomenclatureListItem()
      mockGetEquipmentNomenclaturesSuccess({
        body: commonFixtures.paginatedListResponse([equipmentNomenclatureListItem]),
      })

      const reportListItem = reportsFixtures.historyNomenclatureOperationsReportListItem()
      mockGetHistoryNomenclatureOperationsReportSuccess(equipmentNomenclatureListItem.id, {
        body: commonFixtures.paginatedListResponse([reportListItem]),
      })

      const { user } = render(<HistoryNomenclatureOperationsReportPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
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

      await testUtils.clickExportToExcelButton(user)
      await testUtils.expectExportToExcelLoadingFinished()

      expect(base64ToBytes).toBeCalledTimes(1)
      expect(base64ToBytes).toBeCalledWith(file)

      expect(downloadFileSpy).toBeCalledTimes(1)
      expect(downloadFileSpy).toBeCalledWith(fakeArrayBuffer, MimetypeEnum.Xlsx, 'filename')
    })
  })
})
