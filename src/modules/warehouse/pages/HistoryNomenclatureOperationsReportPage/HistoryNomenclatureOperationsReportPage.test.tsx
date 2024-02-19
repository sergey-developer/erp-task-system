import { screen } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { testUtils as historyNomenclatureOperationsReportFormTestUtils } from 'modules/reports/components/HistoryNomenclatureOperationsReportForm/HistoryNomenclatureOperationsReportForm.test'
import { testUtils as historyNomenclatureOperationsReportTableTestUtils } from 'modules/reports/components/HistoryNomenclatureOperationsReportTable/HistoryNomenclatureOperationsReportTable.test'
import { getRelocationColValue } from 'modules/reports/utils'
import { testUtils as equipmentDetailsTestUtils } from 'modules/warehouse/components/EquipmentDetails/EquipmentDetails.test'
import { testUtils as relocationTaskDetailsTestUtils } from 'modules/warehouse/components/RelocationTaskDetails/RelocationTaskDetails.test'

import { MimetypeEnum } from 'shared/constants/mimetype'
import * as base64Utils from 'shared/utils/common/base64'
import * as downloadFileUtils from 'shared/utils/file/downloadFile'

import catalogsFixtures from '_tests_/fixtures/catalogs'
import commonFixtures from '_tests_/fixtures/common'
import reportsFixtures from '_tests_/fixtures/reports'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import {
  mockGetEquipmentAttachmentListSuccess,
  mockGetEquipmentNomenclatureListSuccess,
  mockGetEquipmentSuccess,
  mockGetHistoryNomenclatureOperationsReportSuccess,
  mockGetHistoryNomenclatureOperationsReportXlsxSuccess,
  mockGetLocationListSuccess,
  mockGetRelocationEquipmentListSuccess,
  mockGetRelocationTaskSuccess,
} from '_tests_/mocks/api'
import { buttonTestUtils, fakeWord, render, setupApiTests } from '_tests_/utils'

import HistoryNomenclatureOperationsReportPage from './index'

const getContainer = () => screen.getByTestId('history-nomenclature-operations-report-page')

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

  getExportToExcelButton,
  clickExportToExcelButton,
  expectExportToExcelLoadingFinished,
}

setupApiTests()

describe('Страница отчета количества потраченного оборудования', () => {
  describe('Таблица отчета', () => {
    test('При клике на оборудование открывается карточка оборудования', async () => {
      const equipmentNomenclatureListItem = warehouseFixtures.equipmentNomenclatureListItem()
      mockGetEquipmentNomenclatureListSuccess({
        body: commonFixtures.paginatedListResponse([equipmentNomenclatureListItem]),
      })

      const reportListItem = reportsFixtures.historyNomenclatureOperationsReportListItem()
      mockGetHistoryNomenclatureOperationsReportSuccess(equipmentNomenclatureListItem.id, {
        body: commonFixtures.paginatedListResponse([reportListItem]),
      })

      const locationListItem = catalogsFixtures.locationListItem()
      mockGetLocationListSuccess({ body: [locationListItem] })

      mockGetEquipmentSuccess(reportListItem.id)
      mockGetEquipmentAttachmentListSuccess(reportListItem.id)

      const { user } = render(<HistoryNomenclatureOperationsReportPage />)

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
      mockGetEquipmentNomenclatureListSuccess({
        body: commonFixtures.paginatedListResponse([equipmentNomenclatureListItem]),
      })

      const reportListItem = reportsFixtures.historyNomenclatureOperationsReportListItem()
      mockGetHistoryNomenclatureOperationsReportSuccess(equipmentNomenclatureListItem.id, {
        body: commonFixtures.paginatedListResponse([reportListItem]),
      })

      const locationListItem = catalogsFixtures.locationListItem()
      mockGetLocationListSuccess({ body: [locationListItem] })

      mockGetRelocationTaskSuccess(reportListItem.lastRelocationTask.id)
      mockGetRelocationEquipmentListSuccess(reportListItem.lastRelocationTask.id)

      const { user } = render(<HistoryNomenclatureOperationsReportPage />)

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

  describe('Выгрузка в excel', () => {
    test('При успешном запросе вызывается функция открытия окна скачивания', async () => {
      const downloadFileSpy = jest.spyOn(downloadFileUtils, 'downloadFile')

      const base64ToArrayBufferSpy = jest.spyOn(base64Utils, 'base64ToArrayBuffer')
      const fakeArrayBuffer = new Uint8Array()
      base64ToArrayBufferSpy.mockReturnValueOnce(fakeArrayBuffer)

      const equipmentNomenclatureListItem = warehouseFixtures.equipmentNomenclatureListItem()
      mockGetEquipmentNomenclatureListSuccess({
        body: commonFixtures.paginatedListResponse([equipmentNomenclatureListItem]),
      })

      const reportListItem = reportsFixtures.historyNomenclatureOperationsReportListItem()
      mockGetHistoryNomenclatureOperationsReportSuccess(equipmentNomenclatureListItem.id, {
        body: commonFixtures.paginatedListResponse([reportListItem]),
      })

      const { user } = render(<HistoryNomenclatureOperationsReportPage />)

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

      expect(base64ToArrayBufferSpy).toBeCalledTimes(1)
      expect(base64ToArrayBufferSpy).toBeCalledWith(file)

      expect(downloadFileSpy).toBeCalledTimes(1)
      expect(downloadFileSpy).toBeCalledWith(
        fakeArrayBuffer,
        MimetypeEnum.Xlsx,
        'Отчет по истории операций по номенклатуре',
      )
    })
  })
})
