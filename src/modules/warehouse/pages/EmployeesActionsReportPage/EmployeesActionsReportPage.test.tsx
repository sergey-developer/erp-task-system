import { screen } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { testUtils as employeesActionsReportFormTestUtils } from 'modules/reports/components/EmployeesActionsReportForm/EmployeesActionsReportForm.test'
import { testUtils as employeesActionsReportTableTestUtils } from 'modules/reports/components/EmployeesActionsReportTable/EmployeesActionsReportTable.test'
import { getRelocationColValue } from 'modules/reports/utils'
import { testUtils as equipmentDetailsTestUtils } from 'modules/warehouse/components/EquipmentDetails/EquipmentDetails.test'
import { testUtils as relocationTaskDetailsTestUtils } from 'modules/warehouse/components/RelocationTaskDetails/RelocationTaskDetails.test'

import { MimetypeEnum } from 'shared/constants/mimetype'
import * as base64Utils from 'shared/utils/common/base64'
import * as downloadFileUtils from 'shared/utils/file/downloadFile'

import commonFixtures from '_tests_/fixtures/common'
import reportsFixtures from '_tests_/fixtures/reports'
import userFixtures from '_tests_/fixtures/user'
import {
  mockGetEmployeesActionsReportSuccess,
  mockGetEmployeesActionsReportXlsxSuccess,
  mockGetEquipmentAttachmentListSuccess,
  mockGetEquipmentSuccess,
  mockGetRelocationEquipmentListSuccess,
  mockGetRelocationTaskSuccess,
  mockGetUserListSuccess,
} from '_tests_/mocks/api'
import { buttonTestUtils, fakeWord, getStoreWithAuth, render, setupApiTests } from '_tests_/utils'

import EmployeesActionsReportPage from './index'

const getContainer = () => screen.getByTestId('employees-actions-report-page')

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

describe('Страница отчета действия сотрудников', () => {
  describe('Таблица отчета', () => {
    test('При клике на оборудование открывается карточка оборудования', async () => {
      const userListItem = userFixtures.userListItem()
      mockGetUserListSuccess({ body: [userListItem] })

      const reportListItem = reportsFixtures.employeesActionsReportListItem()
      mockGetEmployeesActionsReportSuccess(userListItem.id, {
        body: commonFixtures.paginatedListResponse([reportListItem]),
      })

      mockGetEquipmentSuccess(reportListItem.equipment.id)
      mockGetEquipmentAttachmentListSuccess(reportListItem.equipment.id)

      const { user } = render(<EmployeesActionsReportPage />, { store: getStoreWithAuth() })

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
      mockGetUserListSuccess({ body: [userListItem] })

      const reportListItem = reportsFixtures.employeesActionsReportListItem()
      mockGetEmployeesActionsReportSuccess(userListItem.id, {
        body: commonFixtures.paginatedListResponse([reportListItem]),
      })

      mockGetRelocationTaskSuccess(reportListItem.relocationTask.id)
      mockGetRelocationEquipmentListSuccess(reportListItem.relocationTask.id)

      const { user } = render(<EmployeesActionsReportPage />, { store: getStoreWithAuth() })

      await employeesActionsReportFormTestUtils.expectEmployeesLoadingFinished()
      await employeesActionsReportFormTestUtils.openEmployeeSelect(user)
      await employeesActionsReportFormTestUtils.setEmployee(user, userListItem.fullName)
      await employeesActionsReportFormTestUtils.clickSubmitButton(user)
      await employeesActionsReportTableTestUtils.expectLoadingFinished()
      await employeesActionsReportTableTestUtils.clickColValue(
        user,
        reportListItem.id,
        getRelocationColValue(reportListItem.relocationTask),
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
      mockGetUserListSuccess({ body: [userListItem] })

      mockGetEmployeesActionsReportSuccess(userListItem.id)

      const { user } = render(<EmployeesActionsReportPage />, { store: getStoreWithAuth() })

      await employeesActionsReportFormTestUtils.expectEmployeesLoadingFinished()
      await employeesActionsReportFormTestUtils.openEmployeeSelect(user)
      await employeesActionsReportFormTestUtils.setEmployee(user, userListItem.fullName)
      await employeesActionsReportFormTestUtils.clickSubmitButton(user)
      await employeesActionsReportTableTestUtils.expectLoadingFinished()

      const file = fakeWord()
      mockGetEmployeesActionsReportXlsxSuccess(userListItem.id, { body: file })

      await testUtils.clickExportToExcelButton(user)
      await testUtils.expectExportToExcelLoadingFinished()

      expect(base64ToArrayBufferSpy).toBeCalledTimes(1)
      expect(base64ToArrayBufferSpy).toBeCalledWith(file)

      expect(downloadFileSpy).toBeCalledTimes(1)
      expect(downloadFileSpy).toBeCalledWith(
        fakeArrayBuffer,
        MimetypeEnum.Xlsx,
        'Отчет по действиям сотрудника',
      )
    })
  })
})
