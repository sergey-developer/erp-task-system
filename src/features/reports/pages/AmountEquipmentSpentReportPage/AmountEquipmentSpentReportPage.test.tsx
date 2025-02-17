import { getChangeInfrastructurePageLocationState } from 'features/infrastructures/pages/ChangeInfrastructurePage/utils'
import { testUtils as amountEquipmentSpentReportFilterTestUtils } from 'features/reports/components/AmountEquipmentSpentReportFilter/AmountEquipmentSpentReportFilter.test'
import { testUtils as amountEquipmentSpentReportFormTestUtils } from 'features/reports/components/AmountEquipmentSpentReportForm/AmountEquipmentSpentReportForm.test'
import { testUtils as amountEquipmentSpentReportTableTestUtils } from 'features/reports/components/AmountEquipmentSpentReportTable/AmountEquipmentSpentReportTable.test'
import { getRelocationTaskReportTableColValue } from 'features/reports/helpers'
import * as reactRouterDom from 'react-router-dom'

import { DEFAULT_FILE_NAME } from 'shared/constants/common'
import { MimetypeEnum } from 'shared/constants/mimetype'
import * as base64Utils from 'shared/utils/common/base64'
import * as downloadFileUtils from 'shared/utils/file/downloadFile'

import { equipmentDetailsTestUtils } from '_tests_/features/warehouses/components/EquipmentDetails/testUtils'
import { relocationTaskDetailsTestUtils } from '_tests_/features/warehouses/components/RelocationTaskDetails/testUtils'
import { amountEquipmentSpentReportPageTestUtils } from '_tests_/features/warehouses/pages/AmountEquipmentSpentReportPage/testUtils'
import catalogsFixtures from '_tests_/fixtures/catalogs'
import commonFixtures from '_tests_/fixtures/common'
import { fakeUseLocationResult } from '_tests_/fixtures/common/hooks/useLocation'
import equipmentsFixtures from '_tests_/fixtures/equipments'
import reportsFixtures from '_tests_/fixtures/reports'
import tasksFixtures from '_tests_/fixtures/tasks'
import userFixtures from '_tests_/fixtures/users'
import { fakeId, fakeWord, getStoreWithAuth, render, setupApiTests } from '_tests_/helpers'
import {
  mockGetAmountEquipmentSpentReportSuccess,
  mockGetAmountEquipmentSpentReportXlsxSuccess,
  mockGetEquipmentAttachmentsSuccess,
  mockGetEquipmentCategoriesSuccess,
  mockGetEquipmentNomenclaturesSuccess,
  mockGetEquipmentSuccess,
  mockGetLocationsCatalogSuccess,
  mockGetRelocationEquipmentsSuccess,
  mockGetRelocationTaskSuccess,
} from '_tests_/mocks/api'
import { getUserMeQueryMock } from '_tests_/mocks/store/users'

import AmountEquipmentSpentReportPage from './index'

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

      const locationState = getChangeInfrastructurePageLocationState(tasksFixtures.taskDetail())
      jest
        .spyOn(reactRouterDom, 'useLocation')
        .mockReturnValue(fakeUseLocationResult({ state: locationState }))

      const reportListItem = reportsFixtures.amountEquipmentSpentReportItem()
      mockGetAmountEquipmentSpentReportSuccess({
        body: commonFixtures.paginatedListResponse([reportListItem]),
      })

      const equipmentNomenclatureListItem = equipmentsFixtures.equipmentNomenclatureListItem()
      mockGetEquipmentNomenclaturesSuccess({
        body: commonFixtures.paginatedListResponse([equipmentNomenclatureListItem]),
      })

      const locationCatalogItem = catalogsFixtures.locationCatalogItem()
      mockGetLocationsCatalogSuccess({ body: [locationCatalogItem] })

      const equipment = equipmentsFixtures.equipmentDetail()
      mockGetEquipmentSuccess(reportListItem.equipment.id, { body: equipment })
      mockGetEquipmentAttachmentsSuccess(reportListItem.equipment.id)

      const { user } = render(<AmountEquipmentSpentReportPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
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
      await amountEquipmentSpentReportFormTestUtils.setRelocateFrom(user, locationCatalogItem.title)
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

      const locationState = getChangeInfrastructurePageLocationState(tasksFixtures.taskDetail())
      jest
        .spyOn(reactRouterDom, 'useLocation')
        .mockReturnValue(fakeUseLocationResult({ state: locationState }))

      const reportListItem = reportsFixtures.amountEquipmentSpentReportItem()
      mockGetAmountEquipmentSpentReportSuccess({
        body: commonFixtures.paginatedListResponse([reportListItem]),
      })

      const equipmentNomenclatureListItem = equipmentsFixtures.equipmentNomenclatureListItem()
      mockGetEquipmentNomenclaturesSuccess({
        body: commonFixtures.paginatedListResponse([equipmentNomenclatureListItem]),
      })

      const locationCatalogItem = catalogsFixtures.locationCatalogItem()
      mockGetLocationsCatalogSuccess({ body: [locationCatalogItem] })

      mockGetRelocationTaskSuccess({ relocationTaskId: reportListItem.relocationTask.id })
      mockGetRelocationEquipmentsSuccess({ relocationTaskId: reportListItem.relocationTask.id })

      const { user } = render(<AmountEquipmentSpentReportPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
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
      await amountEquipmentSpentReportFormTestUtils.setRelocateFrom(user, locationCatalogItem.title)
      await amountEquipmentSpentReportFormTestUtils.clickSubmitButton(user)
      await amountEquipmentSpentReportTableTestUtils.expectLoadingFinished()
      await amountEquipmentSpentReportTableTestUtils.clickColValue(
        user,
        reportListItem.id,
        getRelocationTaskReportTableColValue(reportListItem.relocationTask),
      )
      const details = await relocationTaskDetailsTestUtils.findContainer()

      expect(details).toBeInTheDocument()
    })
  })

  describe('Фильтры', () => {
    test('После применения отображается отчет', async () => {
      const reportListItem = reportsFixtures.amountEquipmentSpentReportItem()
      mockGetAmountEquipmentSpentReportSuccess({
        body: commonFixtures.paginatedListResponse([reportListItem]),
        once: false,
      })

      const equipmentNomenclatureListItem = equipmentsFixtures.equipmentNomenclatureListItem()
      mockGetEquipmentNomenclaturesSuccess({
        body: commonFixtures.paginatedListResponse([equipmentNomenclatureListItem]),
        once: false,
      })

      const locationCatalogItem = catalogsFixtures.locationCatalogItem()
      mockGetLocationsCatalogSuccess({ body: [locationCatalogItem] })

      const equipmentCategoryListItem = equipmentsFixtures.equipmentCategoryListItem()
      mockGetEquipmentCategoriesSuccess({ body: [equipmentCategoryListItem] })

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
      await amountEquipmentSpentReportFormTestUtils.setRelocateFrom(user, locationCatalogItem.title)
      await amountEquipmentSpentReportFormTestUtils.clickSubmitButton(user)
      await amountEquipmentSpentReportTableTestUtils.expectLoadingFinished()
      await amountEquipmentSpentReportPageTestUtils.clickFilterButton(user)
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

      const reportListItem = reportsFixtures.amountEquipmentSpentReportItem()
      mockGetAmountEquipmentSpentReportSuccess({
        body: commonFixtures.paginatedListResponse([reportListItem]),
      })

      const equipmentNomenclatureListItem = equipmentsFixtures.equipmentNomenclatureListItem()
      mockGetEquipmentNomenclaturesSuccess({
        body: commonFixtures.paginatedListResponse([equipmentNomenclatureListItem]),
      })

      const locationCatalogItem = catalogsFixtures.locationCatalogItem()
      mockGetLocationsCatalogSuccess({ body: [locationCatalogItem] })

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
      await amountEquipmentSpentReportFormTestUtils.setRelocateFrom(user, locationCatalogItem.title)
      await amountEquipmentSpentReportFormTestUtils.clickSubmitButton(user)
      await amountEquipmentSpentReportTableTestUtils.expectLoadingFinished()

      const file = fakeWord()
      mockGetAmountEquipmentSpentReportXlsxSuccess({ body: file })

      await amountEquipmentSpentReportPageTestUtils.clickExportToExcelButton(user)
      await amountEquipmentSpentReportPageTestUtils.expectExportToExcelLoadingFinished()

      expect(base64ToBytesSpy).toBeCalledTimes(1)
      expect(base64ToBytesSpy).toBeCalledWith(file)

      expect(downloadFileSpy).toBeCalledTimes(1)
      expect(downloadFileSpy).toBeCalledWith(fakeArrayBuffer, MimetypeEnum.Xlsx, DEFAULT_FILE_NAME)
    })
  })
})
