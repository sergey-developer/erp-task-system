import { testUtils as employeesActionsReportFormTestUtils } from 'features/reports/components/EmployeesActionsReportForm/EmployeesActionsReportForm.test'
import { testUtils as employeesActionsReportTableTestUtils } from 'features/reports/components/EmployeesActionsReportTable/EmployeesActionsReportTable.test'
import { getRelocationTaskReportTableColValue } from 'features/reports/helpers'

import { DEFAULT_FILE_NAME } from 'shared/constants/common'
import { MimetypeEnum } from 'shared/constants/mimetype'
import * as base64Utils from 'shared/utils/common/base64'
import * as downloadFileUtils from 'shared/utils/file/downloadFile'

import { equipmentDetailsTestUtils } from '_tests_/features/warehouse/components/EquipmentDetails/testUtils'
import { relocationTaskDetailsTestUtils } from '_tests_/features/warehouse/components/RelocationTaskDetails/testUtils'
import { employeesActionsReportPageTestUtils } from '_tests_/features/warehouse/pages/EmployeesActionsReportPage/testUtils'
import commonFixtures from '_tests_/fixtures/common'
import reportsFixtures from '_tests_/fixtures/reports'
import userFixtures from '_tests_/fixtures/users'
import {
  mockGetEmployeesActionsReportSuccess,
  mockGetEmployeesActionsReportXlsxSuccess,
  mockGetEquipmentAttachmentListSuccess,
  mockGetEquipmentSuccess,
  mockGetRelocationEquipmentListSuccess,
  mockGetRelocationTaskSuccess,
  mockGetUsersSuccess,
} from '_tests_/mocks/api'
import { getUserMeQueryMock } from '_tests_/mocks/state/user'
import { fakeWord, getStoreWithAuth, render, setupApiTests } from '_tests_/utils'

import EmployeesActionsReportPage from './index'

setupApiTests()

describe('Страница отчета действия сотрудников', () => {
  describe('Таблица отчета', () => {
    test('При клике на оборудование открывается карточка оборудования', async () => {
      const userListItem = userFixtures.userListItem()
      mockGetUsersSuccess({ body: [userListItem] })

      const reportListItem = reportsFixtures.employeesActionsReportListItem()
      mockGetEmployeesActionsReportSuccess(userListItem.id, {
        body: commonFixtures.paginatedListResponse([reportListItem]),
      })

      mockGetEquipmentSuccess(reportListItem.equipment.id)
      mockGetEquipmentAttachmentListSuccess(reportListItem.equipment.id)

      const { user } = render(<EmployeesActionsReportPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await employeesActionsReportFormTestUtils.expectEmployeesLoadingFinished()
      await employeesActionsReportFormTestUtils.openEmployeeSelect(user)
      await employeesActionsReportFormTestUtils.setEmployee(user, userListItem.fullName)
      await employeesActionsReportFormTestUtils.clickSubmitButton(user)
      await employeesActionsReportTableTestUtils.expectLoadingFinished()
      await employeesActionsReportTableTestUtils.clickColValue(
        user,
        reportListItem.id,
        reportListItem.equipment.title,
      )
      const details = await equipmentDetailsTestUtils.findContainer()

      expect(details).toBeInTheDocument()
    })

    test('При клике на перемещение открывается карточка заявки на перемещение', async () => {
      const userListItem = userFixtures.userListItem()
      mockGetUsersSuccess({ body: [userListItem] })

      const reportListItem = reportsFixtures.employeesActionsReportListItem()
      mockGetEmployeesActionsReportSuccess(userListItem.id, {
        body: commonFixtures.paginatedListResponse([reportListItem]),
      })

      mockGetRelocationTaskSuccess({ relocationTaskId: reportListItem.relocationTask.id })
      mockGetRelocationEquipmentListSuccess({ relocationTaskId: reportListItem.relocationTask.id })

      const { user } = render(<EmployeesActionsReportPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await employeesActionsReportFormTestUtils.expectEmployeesLoadingFinished()
      await employeesActionsReportFormTestUtils.openEmployeeSelect(user)
      await employeesActionsReportFormTestUtils.setEmployee(user, userListItem.fullName)
      await employeesActionsReportFormTestUtils.clickSubmitButton(user)
      await employeesActionsReportTableTestUtils.expectLoadingFinished()
      await employeesActionsReportTableTestUtils.clickColValue(
        user,
        reportListItem.id,
        getRelocationTaskReportTableColValue(reportListItem.relocationTask),
      )
      const details = await relocationTaskDetailsTestUtils.findContainer()

      expect(details).toBeInTheDocument()
    })
  })

  describe('Выгрузка в excel', () => {
    test('При успешном запросе вызывается функция открытия окна скачивания', async () => {
      const downloadFileSpy = jest.spyOn(downloadFileUtils, 'downloadFile')

      const base64ToArrayBufferSpy = jest.spyOn(base64Utils, 'base64ToBytes')
      const fakeArrayBuffer = new Uint8Array()
      base64ToArrayBufferSpy.mockReturnValueOnce(fakeArrayBuffer)

      const userListItem = userFixtures.userListItem()
      mockGetUsersSuccess({ body: [userListItem] })

      mockGetEmployeesActionsReportSuccess(userListItem.id)

      const { user } = render(<EmployeesActionsReportPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await employeesActionsReportFormTestUtils.expectEmployeesLoadingFinished()
      await employeesActionsReportFormTestUtils.openEmployeeSelect(user)
      await employeesActionsReportFormTestUtils.setEmployee(user, userListItem.fullName)
      await employeesActionsReportFormTestUtils.clickSubmitButton(user)
      await employeesActionsReportTableTestUtils.expectLoadingFinished()

      const file = fakeWord()
      mockGetEmployeesActionsReportXlsxSuccess(userListItem.id, { body: file })

      await employeesActionsReportPageTestUtils.clickExportToExcelButton(user)
      await employeesActionsReportPageTestUtils.expectExportToExcelLoadingFinished()

      expect(base64ToArrayBufferSpy).toBeCalledTimes(1)
      expect(base64ToArrayBufferSpy).toBeCalledWith(file)

      expect(downloadFileSpy).toBeCalledTimes(1)
      expect(downloadFileSpy).toBeCalledWith(fakeArrayBuffer, MimetypeEnum.Xlsx, DEFAULT_FILE_NAME)
    })
  })
})
