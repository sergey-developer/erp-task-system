import { testUtils as employeesActionsReportFormTestUtils } from 'modules/reports/components/EmployeesActionsReportForm/EmployeesActionsReportForm.test'
import { testUtils as employeesActionsReportTableTestUtils } from 'modules/reports/components/EmployeesActionsReportTable/EmployeesActionsReportTable.test'

import commonFixtures from '_tests_/fixtures/common'
import reportsFixtures from '_tests_/fixtures/reports'
import userFixtures from '_tests_/fixtures/user'
import { mockGetEmployeesActionsReportSuccess, mockGetUserListSuccess } from '_tests_/mocks/api'
import { getStoreWithAuth, render } from '_tests_/utils'

import EmployeesActionsReportPage from './index'

describe('Страница отчета действия сотрудников', () => {
  describe('Таблица отчета', () => {
    test.skip('При клике на оборудование открывается карточка оборудования', async () => {
      const userListItem = userFixtures.userListItem()
      mockGetUserListSuccess({ body: [userListItem] })

      const reportListItem = reportsFixtures.employeesActionsReportListItem()
      mockGetEmployeesActionsReportSuccess(userListItem.id, {
        body: commonFixtures.paginatedListResponse([reportListItem]),
      })

      const { user } = render(<EmployeesActionsReportPage />, { store: getStoreWithAuth() })

      await employeesActionsReportFormTestUtils.expectEmployeesLoadingStarted()
      await employeesActionsReportFormTestUtils.expectEmployeesLoadingFinished()
      await employeesActionsReportFormTestUtils.openEmployeeSelect(user)
      await employeesActionsReportFormTestUtils.setEmployee(user, userListItem.fullName)
      await employeesActionsReportTableTestUtils.expectLoadingFinished()
      await employeesActionsReportTableTestUtils.clickColValue(
        user,
        reportListItem.id,
        reportListItem.equipment.title,
      )
    })
  })
})
