import { screen } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import * as reactRouterDom from 'react-router-dom'

import { getChangeInfrastructurePageLocationState } from 'modules/infrastructures/pages/ChangeInfrastructurePage/utils'
import { testUtils as amountEquipmentSpentReportFilterTestUtils } from 'modules/reports/components/AmountEquipmentSpentReportFilter/AmountEquipmentSpentReportFilter.test'
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
import taskFixtures from '_tests_/fixtures/task'
import { fakeUseLocationResult } from '_tests_/fixtures/useLocation'
import userFixtures from '_tests_/fixtures/user'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import {
  mockGetAmountEquipmentSpentReportSuccess,
  mockGetAmountEquipmentSpentReportXlsxSuccess,
  mockGetEquipmentAttachmentListSuccess,
  mockGetEquipmentCategoryListSuccess,
  mockGetEquipmentNomenclaturesSuccess,
  mockGetEquipmentSuccess,
  mockGetLocationListSuccess,
  mockGetRelocationEquipmentListSuccess,
  mockGetRelocationTaskSuccess,
} from '_tests_/mocks/api'
import { getUserMeQueryMock } from '_tests_/mocks/state/user'
import {
  buttonTestUtils,
  fakeId,
  fakeWord,
  getStoreWithAuth,
  render,
  setupApiTests,
} from '_tests_/utils'

import AmountEquipmentSpentReportPage from './index'

const getContainer = () => screen.getByTestId('amount-equipment-spent-report-page')

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

jest.mock('react-router-dom', () => ({
  __esModule: true,
  ...jest.requireActual('react-router-dom'),
}))

jest.mock('shared/utils/common/base64', () => ({
  __esModule: true,
  ...jest.requireActual('shared/utils/common/base64'),
  base64ToBytes: jest.fn(),
}))

setupApiTests()

describe('Страница отчета количества потраченного оборудования', () => {
  describe('Таблица отчета', () => {
    test('При клике на оборудование открывается карточка оборудования', async () => {
      jest.spyOn(reactRouterDom, 'useParams').mockReturnValue({ id: String(fakeId()) })

      const locationState = getChangeInfrastructurePageLocationState(taskFixtures.task())
      jest
        .spyOn(reactRouterDom, 'useLocation')
        .mockReturnValue(fakeUseLocationResult({ state: locationState }))

      const reportListItem = reportsFixtures.amountEquipmentSpentReportListItem()
      mockGetAmountEquipmentSpentReportSuccess({
        body: commonFixtures.paginatedListResponse([reportListItem]),
      })

      const equipmentNomenclatureListItem = warehouseFixtures.equipmentNomenclatureListItem()
      mockGetEquipmentNomenclaturesSuccess({
        body: commonFixtures.paginatedListResponse([equipmentNomenclatureListItem]),
      })

      const locationListItem = catalogsFixtures.locationListItem()
      mockGetLocationListSuccess({ body: [locationListItem] })

      const equipment = warehouseFixtures.equipment()
      mockGetEquipmentSuccess(reportListItem.equipment.id, { body: equipment })
      mockGetEquipmentAttachmentListSuccess(reportListItem.equipment.id)

      const { user } = render(<AmountEquipmentSpentReportPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

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
      jest.spyOn(reactRouterDom, 'useParams').mockReturnValue({ id: String(fakeId()) })

      const locationState = getChangeInfrastructurePageLocationState(taskFixtures.task())
      jest
        .spyOn(reactRouterDom, 'useLocation')
        .mockReturnValue(fakeUseLocationResult({ state: locationState }))

      const reportListItem = reportsFixtures.amountEquipmentSpentReportListItem()
      mockGetAmountEquipmentSpentReportSuccess({
        body: commonFixtures.paginatedListResponse([reportListItem]),
      })

      const equipmentNomenclatureListItem = warehouseFixtures.equipmentNomenclatureListItem()
      mockGetEquipmentNomenclaturesSuccess({
        body: commonFixtures.paginatedListResponse([equipmentNomenclatureListItem]),
      })

      const locationListItem = catalogsFixtures.locationListItem()
      mockGetLocationListSuccess({ body: [locationListItem] })

      mockGetRelocationTaskSuccess({ relocationTaskId: reportListItem.relocationTask.id })
      mockGetRelocationEquipmentListSuccess({ relocationTaskId: reportListItem.relocationTask.id })

      const { user } = render(<AmountEquipmentSpentReportPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

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

  describe('Фильтры', () => {
    test('После применения отображается отчет', async () => {
      const reportListItem = reportsFixtures.amountEquipmentSpentReportListItem()
      mockGetAmountEquipmentSpentReportSuccess({
        body: commonFixtures.paginatedListResponse([reportListItem]),
        once: false,
      })

      const equipmentNomenclatureListItem = warehouseFixtures.equipmentNomenclatureListItem()
      mockGetEquipmentNomenclaturesSuccess({
        body: commonFixtures.paginatedListResponse([equipmentNomenclatureListItem]),
        once: false,
      })

      const locationListItem = catalogsFixtures.locationListItem()
      mockGetLocationListSuccess({ body: [locationListItem] })

      const equipmentCategoryListItem = warehouseFixtures.equipmentCategoryListItem()
      mockGetEquipmentCategoryListSuccess({ body: [equipmentCategoryListItem] })

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
      await testUtils.clickFilterButton(user)
      await amountEquipmentSpentReportFilterTestUtils.findContainer()
      await amountEquipmentSpentReportFilterTestUtils.expectCategoryLoadingFinished()
      await amountEquipmentSpentReportFilterTestUtils.openCategoriesSelect(user)
      await amountEquipmentSpentReportFilterTestUtils.setCategory(
        user,
        equipmentCategoryListItem.title,
      )
      await amountEquipmentSpentReportFilterTestUtils.clickApplyButton(user)
      await amountEquipmentSpentReportTableTestUtils.expectLoadingStarted()
      await amountEquipmentSpentReportTableTestUtils.expectLoadingFinished()
    })
  })

  describe('Выгрузка в excel', () => {
    test('При успешном запросе вызывается функция открытия окна скачивания', async () => {
      const downloadFileSpy = jest.spyOn(downloadFileUtils, 'downloadFile')

      const base64ToBytesSpy = jest.spyOn(base64Utils, 'base64ToBytes')
      const fakeArrayBuffer = new Uint8Array()
      base64ToBytesSpy.mockReturnValueOnce(fakeArrayBuffer)

      const reportListItem = reportsFixtures.amountEquipmentSpentReportListItem()
      mockGetAmountEquipmentSpentReportSuccess({
        body: commonFixtures.paginatedListResponse([reportListItem]),
      })

      const equipmentNomenclatureListItem = warehouseFixtures.equipmentNomenclatureListItem()
      mockGetEquipmentNomenclaturesSuccess({
        body: commonFixtures.paginatedListResponse([equipmentNomenclatureListItem]),
      })

      const locationListItem = catalogsFixtures.locationListItem()
      mockGetLocationListSuccess({ body: [locationListItem] })

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

      const file = fakeWord()
      mockGetAmountEquipmentSpentReportXlsxSuccess({ body: file })

      await testUtils.clickExportToExcelButton(user)
      await testUtils.expectExportToExcelLoadingFinished()

      expect(base64ToBytesSpy).toBeCalledTimes(1)
      expect(base64ToBytesSpy).toBeCalledWith(file)

      expect(downloadFileSpy).toBeCalledTimes(1)
      expect(downloadFileSpy).toBeCalledWith(fakeArrayBuffer, MimetypeEnum.Xlsx, 'filename')
    })
  })
})
