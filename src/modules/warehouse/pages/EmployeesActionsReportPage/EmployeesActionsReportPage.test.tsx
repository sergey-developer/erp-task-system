import { testUtils as employeesActionsReportFormTestUtils } from 'modules/reports/components/EmployeesActionsReportForm/EmployeesActionsReportForm.test'
import { testUtils as employeesActionsReportTableTestUtils } from 'modules/reports/components/EmployeesActionsReportTable/EmployeesActionsReportTable.test'
import { testUtils as equipmentDetailsTestUtils } from 'modules/warehouse/components/EquipmentDetails/EquipmentDetails.test'
import { testUtils as relocationTaskDetailsTestUtils } from 'modules/warehouse/components/RelocationTaskDetails/RelocationTaskDetails.test'
import { relocationTaskStatusDict } from 'modules/warehouse/constants/relocationTask'

import { formatDate } from 'shared/utils/date'

import commonFixtures from '_tests_/fixtures/common'
import reportsFixtures from '_tests_/fixtures/reports'
import userFixtures from '_tests_/fixtures/user'
import {
  mockGetEmployeesActionsReportSuccess,
  mockGetEquipmentAttachmentListSuccess,
  mockGetEquipmentSuccess,
  mockGetRelocationEquipmentListSuccess,
  mockGetRelocationTaskSuccess,
  mockGetUserListSuccess,
} from '_tests_/mocks/api'
import { getStoreWithAuth, render, setupApiTests } from '_tests_/utils'

import EmployeesActionsReportPage from './index'

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
        `№${reportListItem.relocationTask.id} от ${formatDate(
          reportListItem.relocationTask.createdAt,
        )} (${relocationTaskStatusDict[reportListItem.relocationTask.status]})`,
      )
      const details = await relocationTaskDetailsTestUtils.findContainer()

      expect(details).toBeInTheDocument()
    })
  })
})
