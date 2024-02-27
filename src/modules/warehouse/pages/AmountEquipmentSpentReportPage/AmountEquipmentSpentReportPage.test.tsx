import { screen } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { testUtils as amountEquipmentSpentReportFormTestUtils } from 'modules/reports/components/AmountEquipmentSpentReportForm/AmountEquipmentSpentReportForm.test'
import { testUtils as amountEquipmentSpentReportTableTestUtils } from 'modules/reports/components/AmountEquipmentSpentReportTable/AmountEquipmentSpentReportTable.test'
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
  mockGetAmountEquipmentSpentReportSuccess,
  mockGetEquipmentAttachmentListSuccess,
  mockGetEquipmentNomenclatureListSuccess,
  mockGetEquipmentSuccess,
  mockGetLocationListSuccess,
  mockGetRelocationEquipmentListSuccess,
  mockGetRelocationTaskSuccess,
} from '_tests_/mocks/api'
import { buttonTestUtils, render, setupApiTests } from '_tests_/utils'

import AmountEquipmentSpentReportPage from './index'

const getContainer = () => screen.getByTestId('amount-equipment-spent-report-page')

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
      const reportListItem = reportsFixtures.amountEquipmentSpentReportListItem()
      mockGetAmountEquipmentSpentReportSuccess({
        body: commonFixtures.paginatedListResponse([reportListItem]),
      })

      const equipmentNomenclatureListItem = warehouseFixtures.equipmentNomenclatureListItem()
      mockGetEquipmentNomenclatureListSuccess({
        body: commonFixtures.paginatedListResponse([equipmentNomenclatureListItem]),
      })

      const locationListItem = catalogsFixtures.locationListItem()
      mockGetLocationListSuccess({ body: [locationListItem] })

      mockGetEquipmentSuccess(reportListItem.equipment.id)
      mockGetEquipmentAttachmentListSuccess(reportListItem.equipment.id)

      const { user } = render(<AmountEquipmentSpentReportPage />)

      await amountEquipmentSpentReportFormTestUtils.expectNomenclaturesLoadingFinished()
      await amountEquipmentSpentReportFormTestUtils.expectRelocateFromLoadingFinished()
      await amountEquipmentSpentReportFormTestUtils.expectRelocateToLoadingFinished()
      await amountEquipmentSpentReportFormTestUtils.openNomenclatureSelect(user)
      await amountEquipmentSpentReportFormTestUtils.setNomenclature(
        user,
        equipmentNomenclatureListItem.title,
      )
      await amountEquipmentSpentReportFormTestUtils.openRelocateFromSelect(user)
      await amountEquipmentSpentReportFormTestUtils.setRelocateFrom(user, locationListItem.title)
      await amountEquipmentSpentReportFormTestUtils.clickSubmitButton(user)
      await amountEquipmentSpentReportTableTestUtils.expectLoadingFinished()
      await amountEquipmentSpentReportTableTestUtils.clickColValue(
        user,
        reportListItem.id,
        reportListItem.equipment.title,
      )
      const details = await equipmentDetailsTestUtils.findContainer()

      expect(details).toBeInTheDocument()
    })

    test('При клике на перемещение открывается карточка заявки на перемещение', async () => {
      const reportListItem = reportsFixtures.amountEquipmentSpentReportListItem()
      mockGetAmountEquipmentSpentReportSuccess({
        body: commonFixtures.paginatedListResponse([reportListItem]),
      })

      const equipmentNomenclatureListItem = warehouseFixtures.equipmentNomenclatureListItem()
      mockGetEquipmentNomenclatureListSuccess({
        body: commonFixtures.paginatedListResponse([equipmentNomenclatureListItem]),
      })

      const locationListItem = catalogsFixtures.locationListItem()
      mockGetLocationListSuccess({ body: [locationListItem] })

      mockGetRelocationTaskSuccess(reportListItem.relocationTask.id)
      mockGetRelocationEquipmentListSuccess(reportListItem.relocationTask.id)

      const { user } = render(<AmountEquipmentSpentReportPage />)

      await amountEquipmentSpentReportFormTestUtils.expectNomenclaturesLoadingFinished()
      await amountEquipmentSpentReportFormTestUtils.expectRelocateFromLoadingFinished()
      await amountEquipmentSpentReportFormTestUtils.expectRelocateToLoadingFinished()
      await amountEquipmentSpentReportFormTestUtils.openNomenclatureSelect(user)
      await amountEquipmentSpentReportFormTestUtils.setNomenclature(
        user,
        equipmentNomenclatureListItem.title,
      )
      await amountEquipmentSpentReportFormTestUtils.openRelocateFromSelect(user)
      await amountEquipmentSpentReportFormTestUtils.setRelocateFrom(user, locationListItem.title)
      await amountEquipmentSpentReportFormTestUtils.clickSubmitButton(user)
      await amountEquipmentSpentReportTableTestUtils.expectLoadingFinished()
      await amountEquipmentSpentReportTableTestUtils.clickColValue(
        user,
        reportListItem.id,
        getRelocationColValue(reportListItem.relocationTask),
      )
      const details = await relocationTaskDetailsTestUtils.findContainer()

      expect(details).toBeInTheDocument()
    })
  })

  describe('Выгрузка в excel', () => {
    // todo: выяснить почему не проходит
    test.skip('При успешном запросе вызывается функция открытия окна скачивания', async () => {
      const downloadFileSpy = jest.spyOn(downloadFileUtils, 'downloadFile')

      const base64ToArrayBufferSpy = jest.spyOn(base64Utils, 'base64ToArrayBuffer')
      const fakeArrayBuffer = new Uint8Array()
      base64ToArrayBufferSpy.mockReturnValueOnce(fakeArrayBuffer)

      const reportListItem = reportsFixtures.amountEquipmentSpentReportListItem()
      mockGetAmountEquipmentSpentReportSuccess({
        body: commonFixtures.paginatedListResponse([reportListItem]),
      })

      const equipmentNomenclatureListItem = warehouseFixtures.equipmentNomenclatureListItem()
      mockGetEquipmentNomenclatureListSuccess({
        body: commonFixtures.paginatedListResponse([equipmentNomenclatureListItem]),
      })

      const locationListItem = catalogsFixtures.locationListItem()
      mockGetLocationListSuccess({ body: [locationListItem] })

      mockGetEquipmentSuccess(reportListItem.equipment.id)
      mockGetEquipmentAttachmentListSuccess(reportListItem.equipment.id)

      const { user } = render(<AmountEquipmentSpentReportPage />)

      await amountEquipmentSpentReportFormTestUtils.expectNomenclaturesLoadingFinished()
      await amountEquipmentSpentReportFormTestUtils.expectRelocateFromLoadingFinished()
      await amountEquipmentSpentReportFormTestUtils.expectRelocateToLoadingFinished()
      await amountEquipmentSpentReportFormTestUtils.openNomenclatureSelect(user)
      await amountEquipmentSpentReportFormTestUtils.setNomenclature(
        user,
        equipmentNomenclatureListItem.title,
      )
      await amountEquipmentSpentReportFormTestUtils.openRelocateFromSelect(user)
      await amountEquipmentSpentReportFormTestUtils.setRelocateFrom(user, locationListItem.title)
      await amountEquipmentSpentReportFormTestUtils.clickSubmitButton(user)
      await amountEquipmentSpentReportTableTestUtils.expectLoadingFinished()

      // const file = fakeWord()
      // mockGetEmployeesActionsReportXlsxSuccess(userListItem.id, { body: file })

      // await testUtils.clickExportToExcelButton(user)
      // await testUtils.expectExportToExcelLoadingFinished()
      //
      // expect(base64ToArrayBufferSpy).toBeCalledTimes(1)
      // expect(base64ToArrayBufferSpy).toBeCalledWith(file)

      expect(downloadFileSpy).toBeCalledTimes(1)
      expect(downloadFileSpy).toBeCalledWith(
        fakeArrayBuffer,
        MimetypeEnum.Xlsx,
        'Отчет по действиям сотрудника',
      )
    })
  })
})
