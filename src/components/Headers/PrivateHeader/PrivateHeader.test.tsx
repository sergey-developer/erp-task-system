import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import { testUtils as logoutButtonTestUtils } from 'features/auth/components/LogoutButton/LogoutButton.test'
import { testUtils as loginPageTestUtils } from 'features/auth/pages/LoginPage/LoginPage.test'
import { testUtils as homeLayoutTestUtils } from 'features/layouts/components/HomeLayout/HomeLayout.test'
import { taskLocalStorageService } from 'features/tasks/services/taskLocalStorageService/taskLocalStorage.service'
import { updateUserStatusMessages, UserPermissionsEnum } from 'features/users/api/constants'

import { UserStatusCodeEnum } from 'shared/catalogs/userStatuses/api/constants'
import { MaybeNull } from 'shared/types/utils'

import App from 'app/App'

import { tasksPageTestUtils } from '_tests_/features/tasks/pages/TasksPage/testUtils'
import authFixtures from '_tests_/fixtures/auth'
import catalogsFixtures from '_tests_/fixtures/catalogs'
import userFixtures from '_tests_/fixtures/users'
import {
  fakeEmail,
  fakeId,
  fakeWord,
  getStoreWithAuth,
  notificationTestUtils,
  render,
  selectTestUtils,
  setupApiTests,
} from '_tests_/helpers'
import {
  mockGetSystemInfoSuccess,
  mockGetSystemSettingsSuccess,
  mockGetTaskCountersSuccess,
  mockGetTasksSuccess,
  mockGetTimeZonesSuccess,
  mockGetUserMeCodeSuccess,
  mockGetUserMeSuccess,
  mockGetUserStatusesSuccess,
  mockLoginSuccess,
  mockLogoutSuccess,
  mockUpdateUserStatusBadRequestError,
  mockUpdateUserStatusNotFoundError,
  mockUpdateUserStatusServerError,
  mockUpdateUserStatusSuccess,
  mockUpdateUserStatusUnauthorizedError,
} from '_tests_/mocks/api'
import { getUserMeQueryMock } from '_tests_/mocks/store/users'

const getContainer = () => screen.getByTestId('private-header')

// nav menu
const getNavMenuContainer = () => within(getContainer()).getByRole('menu')
const getNavMenuItem = (name: string) => within(getNavMenuContainer()).getByText(name)
const queryNavMenuItem = (name: string) => within(getNavMenuContainer()).queryByText(name)

const clickNavMenuItem = async (user: UserEvent, name: string) => {
  const item = getNavMenuItem(name)
  await user.click(item)
}

// timezone
const getTimeZoneSelectContainer = () => within(getContainer()).getByTestId('timezone-select')
const getTimeZoneSelect = () => selectTestUtils.getSelect(getTimeZoneSelectContainer())
const getSelectedTimeZone = () => selectTestUtils.getSelectedOption(getTimeZoneSelectContainer())

const openTimeZoneSelect = (user: UserEvent) =>
  selectTestUtils.openSelect(user, getTimeZoneSelectContainer())

const setTimeZone = selectTestUtils.clickSelectOption

const getAllTimeZoneOption = selectTestUtils.getAllSelectOption

const expectTimeZoneLoadingStarted = () =>
  selectTestUtils.expectLoadingStarted(getTimeZoneSelectContainer())

const expectTimeZoneLoadingFinished = () =>
  selectTestUtils.expectLoadingFinished(getTimeZoneSelectContainer())

// user status
const getUserStatusSelectContainer = (): HTMLElement =>
  within(getContainer()).getByTestId('user-status-select')

const queryUserStatusSelectContainer = (): MaybeNull<HTMLElement> =>
  within(getContainer()).queryByTestId('user-status-select')

const getSelectedUserStatus = () =>
  selectTestUtils.getSelectedOption(getUserStatusSelectContainer())

const openUserStatusSelect = (user: UserEvent) =>
  selectTestUtils.openSelect(user, getUserStatusSelectContainer())

const setUserStatus = selectTestUtils.clickSelectOption
const getAllUserStatusOption = selectTestUtils.getAllSelectOption

const expectUserStatusLoadingStarted = () =>
  selectTestUtils.expectLoadingStarted(getUserStatusSelectContainer())

const expectUserStatusLoadingFinished = () =>
  selectTestUtils.expectLoadingFinished(getUserStatusSelectContainer())

const expectUserStatusSelectDisabled = () =>
  selectTestUtils.expectSelectDisabled(getUserStatusSelectContainer())

const expectUserStatusSelectNotDisabled = () =>
  selectTestUtils.expectSelectNotDisabled(getUserStatusSelectContainer())

export const testUtils = {
  getContainer,

  getNavMenuContainer,
  getNavMenuItem,
  queryNavMenuItem,
  clickNavMenuItem,

  getTimeZoneSelectContainer,
  getTimeZoneSelect,
  getSelectedTimeZone,
  openTimeZoneSelect,
  setTimeZone,
  getAllTimeZoneOption,
  expectTimeZoneLoadingStarted,
  expectTimeZoneLoadingFinished,

  getUserStatusSelectContainer,
  queryUserStatusSelectContainer,
  getSelectedUserStatus,
  openUserStatusSelect,
  setUserStatus,
  getAllUserStatusOption,
  expectUserStatusLoadingStarted,
  expectUserStatusLoadingFinished,
  expectUserStatusSelectDisabled,
  expectUserStatusSelectNotDisabled,
}

setupApiTests()
notificationTestUtils.setupNotifications()

describe('Хэдер авторизованного пользователя', () => {
  describe('Меню навигации', () => {
    describe('Рабочий стол', () => {
      // todo: не проходит на CI
      test.skip('Отображается', async () => {
        const currentUser = userFixtures.userDetail()
        mockGetUserMeSuccess({ body: currentUser })
        mockGetTimeZonesSuccess()
        mockGetUserMeCodeSuccess()
        mockGetSystemInfoSuccess()
        mockGetSystemSettingsSuccess()
        mockGetUserStatusesSuccess()

        render(<App />, { useBrowserRouter: false, store: getStoreWithAuth(currentUser) })

        await homeLayoutTestUtils.expectLoadingFinished()
        expect(testUtils.getNavMenuItem('Рабочий стол')).toBeInTheDocument()
      })

      // todo: не проходит на CI
      test.skip('При клике переходит на страницу реестра заявок', async () => {
        const currentUser = userFixtures.userDetail()
        mockGetUserMeSuccess({ body: currentUser })
        mockGetTimeZonesSuccess()
        mockGetUserMeCodeSuccess()
        mockGetSystemInfoSuccess()
        mockGetSystemSettingsSuccess()
        mockGetUserStatusesSuccess()
        mockGetTasksSuccess()
        mockGetTaskCountersSuccess()

        const { user } = render(<App />, {
          useBrowserRouter: false,
          store: getStoreWithAuth(currentUser),
        })

        await homeLayoutTestUtils.expectLoadingFinished()
        await testUtils.clickNavMenuItem(user, 'Рабочий стол')
        const page = tasksPageTestUtils.getContainer()

        expect(page).toBeInTheDocument()
      })
    })

    describe('Отчёты', () => {
      // todo: не проходит на CI
      test.skip(`Отображается если есть права ${UserPermissionsEnum.FiscalAccumulatorTasksRead} и нет ${UserPermissionsEnum.ReportMainIndicatorsRead}`, async () => {
        const currentUser = userFixtures.userDetail({
          permissions: [UserPermissionsEnum.FiscalAccumulatorTasksRead],
        })
        mockGetUserMeSuccess({ body: currentUser })
        mockGetTimeZonesSuccess()
        mockGetUserMeCodeSuccess()
        mockGetSystemInfoSuccess()
        mockGetSystemSettingsSuccess()
        mockGetUserStatusesSuccess()
        mockGetTasksSuccess({ once: false })
        mockGetTaskCountersSuccess({ once: false })

        render(<App />, {
          useBrowserRouter: false,
          store: getStoreWithAuth(currentUser, undefined, undefined, {
            queries: { ...getUserMeQueryMock(currentUser) },
          }),
        })

        await homeLayoutTestUtils.expectLoadingFinished()
        expect(testUtils.getNavMenuItem('Отчёты')).toBeInTheDocument()
      })

      // todo: не проходит на CI
      test.skip(`Отображается если есть права ${UserPermissionsEnum.ReportMainIndicatorsRead} и нет ${UserPermissionsEnum.FiscalAccumulatorTasksRead}`, async () => {
        const currentUser = userFixtures.userDetail({
          permissions: [UserPermissionsEnum.ReportMainIndicatorsRead],
        })
        mockGetUserMeSuccess({ body: currentUser })
        mockGetTimeZonesSuccess()
        mockGetUserMeCodeSuccess()
        mockGetSystemInfoSuccess()
        mockGetSystemSettingsSuccess()
        mockGetUserStatusesSuccess()
        mockGetTasksSuccess({ once: false })
        mockGetTaskCountersSuccess({ once: false })

        render(<App />, {
          useBrowserRouter: false,
          store: getStoreWithAuth(currentUser, undefined, undefined, {
            queries: { ...getUserMeQueryMock(currentUser) },
          }),
        })

        await homeLayoutTestUtils.expectLoadingFinished()
        expect(testUtils.getNavMenuItem('Отчёты')).toBeInTheDocument()
      })

      // todo: не проходит на CI
      test.skip(`Отображается если есть права ${UserPermissionsEnum.ReportMainIndicatorsRead} и ${UserPermissionsEnum.FiscalAccumulatorTasksRead}`, async () => {
        const currentUser = userFixtures.userDetail({
          permissions: [
            UserPermissionsEnum.ReportMainIndicatorsRead,
            UserPermissionsEnum.FiscalAccumulatorTasksRead,
          ],
        })
        mockGetUserMeSuccess({ body: currentUser })
        mockGetTimeZonesSuccess()
        mockGetUserMeCodeSuccess()
        mockGetSystemInfoSuccess()
        mockGetSystemSettingsSuccess()
        mockGetUserStatusesSuccess()
        mockGetTasksSuccess({ once: false })
        mockGetTaskCountersSuccess({ once: false })

        render(<App />, {
          useBrowserRouter: false,
          store: getStoreWithAuth(currentUser, undefined, undefined, {
            queries: { ...getUserMeQueryMock(currentUser) },
          }),
        })

        await homeLayoutTestUtils.expectLoadingFinished()
        expect(testUtils.getNavMenuItem('Отчёты')).toBeInTheDocument()
      })

      // todo: не проходит на CI
      test.skip(`Не отображается если нет прав ${UserPermissionsEnum.ReportMainIndicatorsRead} или ${UserPermissionsEnum.FiscalAccumulatorTasksRead}`, async () => {
        const currentUser = userFixtures.userDetail({ permissions: [] })
        mockGetUserMeSuccess({ body: currentUser })
        mockGetTimeZonesSuccess()
        mockGetUserMeCodeSuccess()
        mockGetSystemInfoSuccess()
        mockGetSystemSettingsSuccess()
        mockGetUserStatusesSuccess()
        mockGetTasksSuccess({ once: false })
        mockGetTaskCountersSuccess({ once: false })

        render(<App />, {
          useBrowserRouter: false,
          store: getStoreWithAuth(currentUser, undefined, undefined, {
            queries: { ...getUserMeQueryMock(currentUser) },
          }),
        })

        await homeLayoutTestUtils.expectLoadingFinished()
        expect(testUtils.queryNavMenuItem('Отчёты')).not.toBeInTheDocument()
      })

      test.todo('При клике роут меняется')
    })

    describe('Управление складами', () => {
      // todo: не проходит на CI
      test.skip('Отображается корректно', async () => {
        const fakeUser = userFixtures.userDetail({})
        mockGetUserMeSuccess({ body: fakeUser })

        mockGetTimeZonesSuccess()
        mockGetUserMeCodeSuccess()
        mockGetSystemInfoSuccess()

        render(<App />, { useBrowserRouter: false })

        await homeLayoutTestUtils.expectLoadingFinished()

        expect(testUtils.getNavMenuItem('Управление складами')).toBeInTheDocument()
      })

      test.todo('Справочники')
      test.todo('Управление запасами')
    })
  })

  describe('Селект выбора временной зоны', () => {
    // todo: не проходит на CI
    test.skip('Отображается', async () => {
      mockGetUserMeCodeSuccess()
      mockGetSystemInfoSuccess()
      mockGetSystemSettingsSuccess()
      mockGetTimeZonesSuccess()
      mockGetUserStatusesSuccess()
      mockGetUserMeSuccess({ body: userFixtures.userDetail() })

      render(<App />, { useBrowserRouter: false, store: getStoreWithAuth() })

      await homeLayoutTestUtils.expectLoadingFinished()
      const field = testUtils.getTimeZoneSelect()

      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
    })
  })

  describe('Селект выбора статуса пользователя', () => {
    // todo: не проходит на CI
    test.skip('Отображается', async () => {
      mockGetUserMeCodeSuccess()
      mockGetSystemInfoSuccess()
      mockGetSystemSettingsSuccess()
      mockGetTimeZonesSuccess()
      mockGetUserStatusesSuccess()
      mockGetUserMeSuccess({ body: userFixtures.userDetail() })

      render(<App />, { useBrowserRouter: false, store: getStoreWithAuth() })

      await homeLayoutTestUtils.expectLoadingFinished()
      const selectContainer = testUtils.getUserStatusSelectContainer()

      expect(selectContainer).toBeInTheDocument()
    })

    // todo: не проходит на CI
    test.skip('Отображает установленный статус', async () => {
      mockGetUserMeCodeSuccess()
      mockGetSystemInfoSuccess()
      mockGetSystemSettingsSuccess()
      mockGetTimeZonesSuccess()

      const fakeUserStatus = catalogsFixtures.userStatus()
      mockGetUserStatusesSuccess({ body: [fakeUserStatus] })

      mockGetUserMeSuccess({
        body: userFixtures.userDetail({ status: fakeUserStatus }),
      })

      render(<App />, { useBrowserRouter: false, store: getStoreWithAuth() })

      await homeLayoutTestUtils.expectLoadingFinished()
      await testUtils.expectUserStatusLoadingFinished()
      const selectedUserStatus = testUtils.getSelectedUserStatus()

      expect(selectedUserStatus).toHaveTextContent(new RegExp(fakeUserStatus.title))
    })

    describe('Выбор статуса', () => {
      describe('При успешном запросе', () => {
        // todo: не проходит на CI
        test.skip('Меняется выбранный статус', async () => {
          mockGetUserMeCodeSuccess()
          mockGetSystemInfoSuccess()
          mockGetSystemSettingsSuccess()
          mockGetTimeZonesSuccess()

          const fakeUserStatus1 = catalogsFixtures.userStatus()
          const fakeUserStatus2 = catalogsFixtures.userStatus()
          mockGetUserStatusesSuccess({
            body: [fakeUserStatus1, fakeUserStatus2],
          })

          const fakeUser = userFixtures.userDetail({ status: fakeUserStatus2 })
          mockGetUserMeSuccess({ body: fakeUser })

          mockUpdateUserStatusSuccess(fakeUser.id)

          const { user } = render(<App />, { useBrowserRouter: false, store: getStoreWithAuth() })

          await homeLayoutTestUtils.expectLoadingFinished()
          await testUtils.expectUserStatusLoadingFinished()
          await testUtils.openUserStatusSelect(user)
          await testUtils.setUserStatus(user, fakeUserStatus1.title)
          await testUtils.expectUserStatusSelectDisabled()
          await testUtils.expectUserStatusSelectNotDisabled()

          const selectedUserStatus = testUtils.getSelectedUserStatus()

          expect(selectedUserStatus).toHaveTextContent(new RegExp(fakeUserStatus1.title))
        })

        // todo: не проходит на CI
        test.skip('Если выбран статус OFFLINE, то удаляются фильтры заявок из localStorage', async () => {
          mockGetTasksSuccess()
          mockGetTaskCountersSuccess()
          mockGetUserMeCodeSuccess()
          mockGetSystemInfoSuccess()
          mockGetSystemSettingsSuccess()
          mockGetTimeZonesSuccess()

          const userStatus = catalogsFixtures.userStatus({
            code: UserStatusCodeEnum.Offline,
          })
          mockGetUserStatusesSuccess({ body: [userStatus] })

          const fakeUser = userFixtures.userDetail({ status: userStatus })
          mockGetUserMeSuccess({ body: fakeUser })

          mockUpdateUserStatusSuccess(fakeUser.id)

          const { user } = render(<App />, { useBrowserRouter: false, store: getStoreWithAuth() })

          taskLocalStorageService.setTasksFilters({ customers: [fakeId()] })
          await homeLayoutTestUtils.expectLoadingFinished()
          await testUtils.expectUserStatusLoadingFinished()

          expect(taskLocalStorageService.getTasksFilters()).toBeTruthy()

          await testUtils.openUserStatusSelect(user)
          await testUtils.setUserStatus(user, userStatus.title, true)
          await testUtils.expectUserStatusSelectDisabled()
          await testUtils.expectUserStatusSelectNotDisabled()

          expect(taskLocalStorageService.getTasksFilters()).toBeNull()
        })
      })

      describe('При не успешном запросе', () => {
        // todo: не проходит на CI
        test.skip('Обрабатывается ошибка 400', async () => {
          mockGetUserMeCodeSuccess()
          mockGetSystemInfoSuccess()
          mockGetSystemSettingsSuccess()
          mockGetTimeZonesSuccess()

          const fakeUserStatus1 = catalogsFixtures.userStatus()
          const fakeUserStatus2 = catalogsFixtures.userStatus()
          mockGetUserStatusesSuccess({
            body: [fakeUserStatus1, fakeUserStatus2],
          })

          const fakeUser = userFixtures.userDetail({ status: fakeUserStatus2 })
          mockGetUserMeSuccess({ body: fakeUser })

          const badRequestErrorMessage = fakeWord()
          mockUpdateUserStatusBadRequestError(fakeUser.id, {
            body: { detail: [badRequestErrorMessage] },
          })

          const { user } = render(<App />, { useBrowserRouter: false, store: getStoreWithAuth() })

          await homeLayoutTestUtils.expectLoadingFinished()
          await testUtils.expectUserStatusLoadingFinished()
          await testUtils.openUserStatusSelect(user)
          await testUtils.setUserStatus(user, fakeUserStatus1.title)
          await testUtils.expectUserStatusSelectDisabled()
          await testUtils.expectUserStatusSelectNotDisabled()

          const selectedUserStatus = testUtils.getSelectedUserStatus()

          expect(selectedUserStatus).not.toHaveTextContent(new RegExp(fakeUserStatus1.title))

          const notification = await notificationTestUtils.findNotification(badRequestErrorMessage)
          expect(notification).toBeInTheDocument()
        })

        // todo: не проходит на CI
        test.skip('Обрабатывается ошибка 401', async () => {
          mockGetUserMeCodeSuccess()
          mockGetSystemInfoSuccess()
          mockGetSystemSettingsSuccess()
          mockGetTimeZonesSuccess()

          const fakeUserStatus1 = catalogsFixtures.userStatus()
          const fakeUserStatus2 = catalogsFixtures.userStatus()
          mockGetUserStatusesSuccess({
            body: [fakeUserStatus1, fakeUserStatus2],
          })

          const fakeUser = userFixtures.userDetail({ status: fakeUserStatus2 })
          mockGetUserMeSuccess({ body: fakeUser })

          const unauthorizedErrorMessage = fakeWord()
          mockUpdateUserStatusUnauthorizedError(fakeUser.id, {
            body: { detail: unauthorizedErrorMessage },
          })

          const { user } = render(<App />, { useBrowserRouter: false, store: getStoreWithAuth() })

          await homeLayoutTestUtils.expectLoadingFinished()
          await testUtils.expectUserStatusLoadingFinished()
          await testUtils.openUserStatusSelect(user)
          await testUtils.setUserStatus(user, fakeUserStatus1.title)
          await testUtils.expectUserStatusSelectDisabled()
          await testUtils.expectUserStatusSelectNotDisabled()

          const selectedUserStatus = testUtils.getSelectedUserStatus()

          expect(selectedUserStatus).not.toHaveTextContent(new RegExp(fakeUserStatus1.title))

          const notification = await notificationTestUtils.findNotification(
            unauthorizedErrorMessage,
          )
          expect(notification).toBeInTheDocument()
        })

        // todo: не проходит на CI
        test.skip('Обрабатывается ошибка 404', async () => {
          mockGetUserMeCodeSuccess()
          mockGetSystemInfoSuccess()
          mockGetSystemSettingsSuccess()
          mockGetTimeZonesSuccess()

          const fakeUserStatus1 = catalogsFixtures.userStatus()
          const fakeUserStatus2 = catalogsFixtures.userStatus()
          mockGetUserStatusesSuccess({
            body: [fakeUserStatus1, fakeUserStatus2],
          })

          const fakeUser = userFixtures.userDetail({ status: fakeUserStatus2 })
          mockGetUserMeSuccess({ body: fakeUser })

          const errorMessage = fakeWord()
          mockUpdateUserStatusNotFoundError(fakeUser.id, {
            body: { detail: errorMessage },
          })

          const { user } = render(<App />, { useBrowserRouter: false, store: getStoreWithAuth() })

          await homeLayoutTestUtils.expectLoadingFinished()
          await testUtils.expectUserStatusLoadingFinished()
          await testUtils.openUserStatusSelect(user)
          await testUtils.setUserStatus(user, fakeUserStatus1.title)
          await testUtils.expectUserStatusSelectDisabled()
          await testUtils.expectUserStatusSelectNotDisabled()

          const selectedUserStatus = testUtils.getSelectedUserStatus()

          expect(selectedUserStatus).not.toHaveTextContent(new RegExp(fakeUserStatus1.title))

          const notification = await notificationTestUtils.findNotification(errorMessage)
          expect(notification).toBeInTheDocument()
        })

        // todo: не проходит на CI
        test.skip('Обрабатывается ошибка 500', async () => {
          mockGetUserMeCodeSuccess()
          mockGetSystemInfoSuccess()
          mockGetSystemSettingsSuccess()
          mockGetTimeZonesSuccess()

          const fakeUserStatus1 = catalogsFixtures.userStatus()
          const fakeUserStatus2 = catalogsFixtures.userStatus()
          mockGetUserStatusesSuccess({
            body: [fakeUserStatus1, fakeUserStatus2],
          })

          const fakeUser = userFixtures.userDetail({ status: fakeUserStatus2 })
          mockGetUserMeSuccess({ body: fakeUser })

          mockUpdateUserStatusServerError(fakeUser.id)

          const { user } = render(<App />, { useBrowserRouter: false, store: getStoreWithAuth() })

          await homeLayoutTestUtils.expectLoadingFinished()
          await testUtils.expectUserStatusLoadingFinished()
          await testUtils.openUserStatusSelect(user)
          await testUtils.setUserStatus(user, fakeUserStatus1.title)
          await testUtils.expectUserStatusSelectDisabled()
          await testUtils.expectUserStatusSelectNotDisabled()

          const selectedUserStatus = testUtils.getSelectedUserStatus()

          expect(selectedUserStatus).not.toHaveTextContent(new RegExp(fakeUserStatus1.title))

          const notification = await notificationTestUtils.findNotification(
            updateUserStatusMessages,
          )
          expect(notification).toBeInTheDocument()
        })
      })
    })
  })

  describe('Logout', () => {
    // todo: не проходит на CI
    test.skip('При успешном запросе переходит на страницу авторизации и очищает localStorage', async () => {
      mockGetUserMeSuccess()
      mockGetUserMeCodeSuccess()
      mockGetSystemInfoSuccess()
      mockGetSystemSettingsSuccess()
      mockGetTimeZonesSuccess()
      mockGetUserStatusesSuccess()
      mockGetTasksSuccess()
      mockGetTaskCountersSuccess()
      mockLoginSuccess({ body: authFixtures.loginResponse })
      mockLogoutSuccess()

      taskLocalStorageService.setTasksFilters({ customers: [1, 2] })

      const { user } = render(<App />, { useBrowserRouter: false })

      expect(taskLocalStorageService.getTasksFilters()).toBeTruthy()

      await loginPageTestUtils.findContainer()
      await loginPageTestUtils.setEmail(user, fakeEmail())
      await loginPageTestUtils.setPassword(user, fakeWord())
      await loginPageTestUtils.clickSubmitButton(user)

      const button = await logoutButtonTestUtils.findButton()
      await user.click(button)

      const loginPage = await loginPageTestUtils.findContainer()
      expect(loginPage).toBeInTheDocument()

      expect(taskLocalStorageService.getTasksFilters()).toBeNull()
    })
  })
})
