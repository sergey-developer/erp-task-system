import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { CommonRouteEnum } from 'configs/routes'

import { testUtils as logoutButtonTestUtils } from 'modules/auth/components/LogoutButton/LogoutButton.test'
import { testUtils as loginPageTestUtils } from 'modules/auth/pages/LoginPage/LoginPage.test'
import { ReportsRoutesEnum } from 'modules/reports/constants'
import { TasksRoutesEnum } from 'modules/task/constants/routes'
import { taskLocalStorageService } from 'modules/task/services/taskLocalStorageService/taskLocalStorage.service'
import { updateUserStatusMessages, UserRoleEnum } from 'modules/user/constants'

import { testUtils as homeLayoutTestUtils } from 'components/Layouts/HomeLayout/HomeLayout.test'

import { UserStatusCodeEnum } from 'shared/constants/catalogs'
import { MaybeNull } from 'shared/types/utils'

import App from 'app/App'

import authFixtures from '_tests_/fixtures/auth'
import catalogsFixtures from '_tests_/fixtures/catalogs'
import userFixtures from '_tests_/fixtures/user'
import {
  mockGetSystemInfoSuccess,
  mockGetSystemSettingsSuccess,
  mockGetTaskCountersSuccess,
  mockGetTasksSuccess,
  mockGetTimeZoneListSuccess,
  mockGetUserMeCodeSuccess,
  mockGetUserMeSuccess,
  mockGetUserStatusListSuccess,
  mockLoginSuccess,
  mockLogoutSuccess,
  mockUpdateUserStatusBadRequestError,
  mockUpdateUserStatusNotFoundError,
  mockUpdateUserStatusServerError,
  mockUpdateUserStatusSuccess,
  mockUpdateUserStatusUnauthorizedError,
} from '_tests_/mocks/api'
import {
  fakeEmail,
  fakeId,
  fakeWord,
  getStoreWithAuth,
  notificationTestUtils,
  render,
  renderInRoute,
  selectTestUtils,
  setupApiTests,
} from '_tests_/utils'

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
    describe(`Для роли ${UserRoleEnum.FirstLineSupport}`, () => {
      describe('Рабочий стол', () => {
        test('Отображается корректно', async () => {
          const fakeUser = userFixtures.user({
            role: UserRoleEnum.FirstLineSupport,
          })
          mockGetUserMeSuccess({ body: fakeUser })

          mockGetTimeZoneListSuccess()
          mockGetUserMeCodeSuccess()
          mockGetSystemInfoSuccess()

          render(<App />, { useBrowserRouter: false })

          await homeLayoutTestUtils.expectLoadingFinished()

          expect(testUtils.getNavMenuItem('Рабочий стол')).toBeInTheDocument()
        })

        test('При клике роут меняется', async () => {
          const fakeUser = userFixtures.user({
            role: UserRoleEnum.FirstLineSupport,
          })
          mockGetUserMeSuccess({ body: fakeUser })

          mockGetTimeZoneListSuccess()
          mockGetUserMeCodeSuccess()
          mockGetSystemInfoSuccess()

          const { user, getCurrentRoute } = renderInRoute(<App />, CommonRouteEnum.Root, {
            useBrowserRouter: false,
          })

          await homeLayoutTestUtils.expectLoadingFinished()
          await testUtils.clickNavMenuItem(user, 'Рабочий стол')

          expect(getCurrentRoute()).toBe(TasksRoutesEnum.DesktopTaskList)
        })
      })

      describe('Отчёт по ФН', () => {
        test('Не отображается', async () => {
          const fakeUser = userFixtures.user({
            role: UserRoleEnum.FirstLineSupport,
          })
          mockGetUserMeSuccess({ body: fakeUser })

          mockGetTimeZoneListSuccess()
          mockGetUserMeCodeSuccess()
          mockGetSystemInfoSuccess()

          render(<App />, { useBrowserRouter: false })

          await homeLayoutTestUtils.expectLoadingFinished()

          expect(testUtils.queryNavMenuItem('Отчёт по ФН')).not.toBeInTheDocument()
        })
      })

      describe('Управление складами', () => {
        test('Отображается корректно', async () => {
          const fakeUser = userFixtures.user({
            role: UserRoleEnum.FirstLineSupport,
          })
          mockGetUserMeSuccess({ body: fakeUser })

          mockGetTimeZoneListSuccess()
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

    describe(`Для роли ${UserRoleEnum.Engineer}`, () => {
      describe('Рабочий стол', () => {
        test('Отображается корректно', async () => {
          const fakeUser = userFixtures.user({
            role: UserRoleEnum.Engineer,
          })
          mockGetUserMeSuccess({ body: fakeUser })

          mockGetTimeZoneListSuccess()
          mockGetUserMeCodeSuccess()
          mockGetSystemInfoSuccess()

          render(<App />, { useBrowserRouter: false })

          await homeLayoutTestUtils.expectLoadingFinished()

          expect(testUtils.getNavMenuItem('Рабочий стол')).toBeInTheDocument()
        })

        test('При клике роут меняется', async () => {
          const fakeUser = userFixtures.user({
            role: UserRoleEnum.Engineer,
          })
          mockGetUserMeSuccess({ body: fakeUser })

          mockGetTimeZoneListSuccess()
          mockGetUserMeCodeSuccess()
          mockGetSystemInfoSuccess()

          const { user, getCurrentRoute } = renderInRoute(<App />, CommonRouteEnum.Root, {
            useBrowserRouter: false,
          })

          await homeLayoutTestUtils.expectLoadingFinished()
          await testUtils.clickNavMenuItem(user, 'Рабочий стол')

          expect(getCurrentRoute()).toBe(TasksRoutesEnum.DesktopTaskList)
        })
      })

      describe('Отчёт по ФН', () => {
        test('Отображается корректно', async () => {
          const fakeUser = userFixtures.user({
            role: UserRoleEnum.Engineer,
          })
          mockGetUserMeSuccess({ body: fakeUser })

          mockGetTimeZoneListSuccess()
          mockGetUserMeCodeSuccess()
          mockGetSystemInfoSuccess()

          render(<App />, { useBrowserRouter: false })

          await homeLayoutTestUtils.expectLoadingFinished()

          expect(testUtils.getNavMenuItem('Отчёт по ФН')).toBeInTheDocument()
        })

        test('При клике роут меняется', async () => {
          const fakeUser = userFixtures.user({
            role: UserRoleEnum.Engineer,
          })
          mockGetUserMeSuccess({ body: fakeUser })

          mockGetTimeZoneListSuccess()
          mockGetUserMeCodeSuccess()
          mockGetSystemInfoSuccess()

          const { user, getCurrentRoute } = renderInRoute(<App />, CommonRouteEnum.Root, {
            useBrowserRouter: false,
          })

          await homeLayoutTestUtils.expectLoadingFinished()
          await testUtils.clickNavMenuItem(user, 'Отчёт по ФН')

          expect(getCurrentRoute()).toBe(ReportsRoutesEnum.FiscalAccumulatorTasksReport)
        })
      })

      describe('Управление складами', () => {
        test('Отображается корректно', async () => {
          const fakeUser = userFixtures.user({
            role: UserRoleEnum.Engineer,
          })
          mockGetUserMeSuccess({ body: fakeUser })

          mockGetTimeZoneListSuccess()
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

    describe(`Для роли ${UserRoleEnum.SeniorEngineer}`, () => {
      describe('Рабочий стол', () => {
        test('Отображается корректно', async () => {
          const fakeUser = userFixtures.user({
            role: UserRoleEnum.SeniorEngineer,
          })
          mockGetUserMeSuccess({ body: fakeUser })

          mockGetTimeZoneListSuccess()
          mockGetUserMeCodeSuccess()
          mockGetSystemInfoSuccess()

          render(<App />, { useBrowserRouter: false })

          await homeLayoutTestUtils.expectLoadingFinished()

          expect(testUtils.getNavMenuItem('Рабочий стол')).toBeInTheDocument()
        })

        test('При клике роут меняется', async () => {
          const fakeUser = userFixtures.user({
            role: UserRoleEnum.SeniorEngineer,
          })
          mockGetUserMeSuccess({ body: fakeUser })

          mockGetTimeZoneListSuccess()
          mockGetUserMeCodeSuccess()
          mockGetSystemInfoSuccess()

          const { user, getCurrentRoute } = renderInRoute(<App />, CommonRouteEnum.Root, {
            useBrowserRouter: false,
          })

          await homeLayoutTestUtils.expectLoadingFinished()
          await testUtils.clickNavMenuItem(user, 'Рабочий стол')

          expect(getCurrentRoute()).toBe(TasksRoutesEnum.DesktopTaskList)
        })
      })

      describe('Отчёт по ФН', () => {
        test('Отображается корректно', async () => {
          const fakeUser = userFixtures.user({
            role: UserRoleEnum.SeniorEngineer,
          })
          mockGetUserMeSuccess({ body: fakeUser })

          mockGetTimeZoneListSuccess()
          mockGetUserMeCodeSuccess()
          mockGetSystemInfoSuccess()

          render(<App />, { useBrowserRouter: false })

          await homeLayoutTestUtils.expectLoadingFinished()

          expect(testUtils.getNavMenuItem('Отчёт по ФН')).toBeInTheDocument()
        })

        test('При клике роут меняется', async () => {
          const fakeUser = userFixtures.user({
            role: UserRoleEnum.SeniorEngineer,
          })
          mockGetUserMeSuccess({ body: fakeUser })

          mockGetTimeZoneListSuccess()
          mockGetUserMeCodeSuccess()
          mockGetSystemInfoSuccess()

          const { user, getCurrentRoute } = renderInRoute(<App />, CommonRouteEnum.Root, {
            useBrowserRouter: false,
          })

          await homeLayoutTestUtils.expectLoadingFinished()
          await testUtils.clickNavMenuItem(user, 'Отчёт по ФН')

          expect(getCurrentRoute()).toBe(ReportsRoutesEnum.FiscalAccumulatorTasksReport)
        })
      })

      describe('Управление складами', () => {
        test('Отображается корректно', async () => {
          const fakeUser = userFixtures.user({
            role: UserRoleEnum.SeniorEngineer,
          })
          mockGetUserMeSuccess({ body: fakeUser })

          mockGetTimeZoneListSuccess()
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

    describe(`Для роли ${UserRoleEnum.HeadOfDepartment}`, () => {
      describe('Рабочий стол', () => {
        test('Отображается корректно', async () => {
          const fakeUser = userFixtures.user({
            role: UserRoleEnum.HeadOfDepartment,
          })
          mockGetUserMeSuccess({ body: fakeUser })

          mockGetTimeZoneListSuccess()
          mockGetUserMeCodeSuccess()
          mockGetSystemInfoSuccess()

          render(<App />, { useBrowserRouter: false })

          await homeLayoutTestUtils.expectLoadingFinished()

          expect(testUtils.getNavMenuItem('Рабочий стол')).toBeInTheDocument()
        })

        test('При клике роут меняется', async () => {
          const fakeUser = userFixtures.user({
            role: UserRoleEnum.HeadOfDepartment,
          })
          mockGetUserMeSuccess({ body: fakeUser })

          mockGetTimeZoneListSuccess()
          mockGetUserMeCodeSuccess()
          mockGetSystemInfoSuccess()

          const { user, getCurrentRoute } = renderInRoute(<App />, CommonRouteEnum.Root, {
            useBrowserRouter: false,
          })

          await homeLayoutTestUtils.expectLoadingFinished()
          await testUtils.clickNavMenuItem(user, 'Рабочий стол')

          expect(getCurrentRoute()).toBe(TasksRoutesEnum.DesktopTaskList)
        })
      })

      describe('Отчёт по ФН', () => {
        test('Отображается корректно', async () => {
          const fakeUser = userFixtures.user({
            role: UserRoleEnum.HeadOfDepartment,
          })
          mockGetUserMeSuccess({ body: fakeUser })

          mockGetTimeZoneListSuccess()
          mockGetUserMeCodeSuccess()
          mockGetSystemInfoSuccess()

          render(<App />, { useBrowserRouter: false })

          await homeLayoutTestUtils.expectLoadingFinished()

          expect(testUtils.getNavMenuItem('Отчёт по ФН')).toBeInTheDocument()
        })

        test('При клике роут меняется', async () => {
          const fakeUser = userFixtures.user({
            role: UserRoleEnum.HeadOfDepartment,
          })
          mockGetUserMeSuccess({ body: fakeUser })

          mockGetTimeZoneListSuccess()
          mockGetUserMeCodeSuccess()
          mockGetSystemInfoSuccess()

          const { user, getCurrentRoute } = renderInRoute(<App />, CommonRouteEnum.Root, {
            useBrowserRouter: false,
          })

          await homeLayoutTestUtils.expectLoadingFinished()
          await testUtils.clickNavMenuItem(user, 'Отчёт по ФН')

          expect(getCurrentRoute()).toBe(ReportsRoutesEnum.FiscalAccumulatorTasksReport)
        })
      })

      describe('Управление складами', () => {
        test('Отображается корректно', async () => {
          const fakeUser = userFixtures.user({
            role: UserRoleEnum.HeadOfDepartment,
          })
          mockGetUserMeSuccess({ body: fakeUser })

          mockGetTimeZoneListSuccess()
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
  })

  describe('Селект выбора временной зоны', () => {
    test('Отображается', async () => {
      mockGetUserMeCodeSuccess()
      mockGetSystemInfoSuccess()
      mockGetSystemSettingsSuccess()
      mockGetTimeZoneListSuccess()
      mockGetUserStatusListSuccess()
      mockGetUserMeSuccess({ body: userFixtures.user() })

      render(<App />, { useBrowserRouter: false, store: getStoreWithAuth() })

      await homeLayoutTestUtils.expectLoadingFinished()
      const field = testUtils.getTimeZoneSelect()

      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
    })
  })

  describe('Селект выбора статуса пользователя', () => {
    test('Отображается', async () => {
      mockGetUserMeCodeSuccess()
      mockGetSystemInfoSuccess()
      mockGetSystemSettingsSuccess()
      mockGetTimeZoneListSuccess()
      mockGetUserStatusListSuccess()
      mockGetUserMeSuccess({ body: userFixtures.user() })

      render(<App />, { useBrowserRouter: false, store: getStoreWithAuth() })

      await homeLayoutTestUtils.expectLoadingFinished()
      const selectContainer = testUtils.getUserStatusSelectContainer()

      expect(selectContainer).toBeInTheDocument()
    })

    test('Отображает установленный статус', async () => {
      mockGetUserMeCodeSuccess()
      mockGetSystemInfoSuccess()
      mockGetSystemSettingsSuccess()
      mockGetTimeZoneListSuccess()

      const fakeUserStatus = catalogsFixtures.userStatusListItem()
      mockGetUserStatusListSuccess({ body: [fakeUserStatus] })

      mockGetUserMeSuccess({
        body: userFixtures.user({ status: fakeUserStatus }),
      })

      render(<App />, { useBrowserRouter: false, store: getStoreWithAuth() })

      await homeLayoutTestUtils.expectLoadingFinished()
      await testUtils.expectUserStatusLoadingFinished()
      const selectedUserStatus = testUtils.getSelectedUserStatus()

      expect(selectedUserStatus).toHaveTextContent(new RegExp(fakeUserStatus.title))
    })

    describe('Выбор статуса', () => {
      describe('При успешном запросе', () => {
        test('Меняется выбранный статус', async () => {
          mockGetUserMeCodeSuccess()
          mockGetSystemInfoSuccess()
          mockGetSystemSettingsSuccess()
          mockGetTimeZoneListSuccess()

          const fakeUserStatus1 = catalogsFixtures.userStatusListItem()
          const fakeUserStatus2 = catalogsFixtures.userStatusListItem()
          mockGetUserStatusListSuccess({
            body: [fakeUserStatus1, fakeUserStatus2],
          })

          const fakeUser = userFixtures.user({ status: fakeUserStatus2 })
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

        test('Если выбран статус OFFLINE, то удаляются фильтры заявок из localStorage', async () => {
          mockGetTasksSuccess()
          mockGetTaskCountersSuccess()
          mockGetUserMeCodeSuccess()
          mockGetSystemInfoSuccess()
          mockGetSystemSettingsSuccess()
          mockGetTimeZoneListSuccess()

          const userStatus = catalogsFixtures.userStatusListItem({
            code: UserStatusCodeEnum.Offline,
          })
          mockGetUserStatusListSuccess({ body: [userStatus] })

          const fakeUser = userFixtures.user({ status: userStatus })
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
        test('Обрабатывается ошибка 400', async () => {
          mockGetUserMeCodeSuccess()
          mockGetSystemInfoSuccess()
          mockGetSystemSettingsSuccess()
          mockGetTimeZoneListSuccess()

          const fakeUserStatus1 = catalogsFixtures.userStatusListItem()
          const fakeUserStatus2 = catalogsFixtures.userStatusListItem()
          mockGetUserStatusListSuccess({
            body: [fakeUserStatus1, fakeUserStatus2],
          })

          const fakeUser = userFixtures.user({ status: fakeUserStatus2 })
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

        test('Обрабатывается ошибка 401', async () => {
          mockGetUserMeCodeSuccess()
          mockGetSystemInfoSuccess()
          mockGetSystemSettingsSuccess()
          mockGetTimeZoneListSuccess()

          const fakeUserStatus1 = catalogsFixtures.userStatusListItem()
          const fakeUserStatus2 = catalogsFixtures.userStatusListItem()
          mockGetUserStatusListSuccess({
            body: [fakeUserStatus1, fakeUserStatus2],
          })

          const fakeUser = userFixtures.user({ status: fakeUserStatus2 })
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

        test('Обрабатывается ошибка 404', async () => {
          mockGetUserMeCodeSuccess()
          mockGetSystemInfoSuccess()
          mockGetSystemSettingsSuccess()
          mockGetTimeZoneListSuccess()

          const fakeUserStatus1 = catalogsFixtures.userStatusListItem()
          const fakeUserStatus2 = catalogsFixtures.userStatusListItem()
          mockGetUserStatusListSuccess({
            body: [fakeUserStatus1, fakeUserStatus2],
          })

          const fakeUser = userFixtures.user({ status: fakeUserStatus2 })
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

        test('Обрабатывается ошибка 500', async () => {
          mockGetUserMeCodeSuccess()
          mockGetSystemInfoSuccess()
          mockGetSystemSettingsSuccess()
          mockGetTimeZoneListSuccess()

          const fakeUserStatus1 = catalogsFixtures.userStatusListItem()
          const fakeUserStatus2 = catalogsFixtures.userStatusListItem()
          mockGetUserStatusListSuccess({
            body: [fakeUserStatus1, fakeUserStatus2],
          })

          const fakeUser = userFixtures.user({ status: fakeUserStatus2 })
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
            updateUserStatusMessages.commonError,
          )
          expect(notification).toBeInTheDocument()
        })
      })
    })
  })

  describe('Logout', () => {
    test('При успешном запросе переходит на страницу авторизации и очищает localStorage', async () => {
      mockGetUserMeSuccess()
      mockGetUserMeCodeSuccess()
      mockGetSystemInfoSuccess()
      mockGetTimeZoneListSuccess()
      mockGetUserStatusListSuccess()
      mockGetTasksSuccess()
      mockGetTaskCountersSuccess()
      mockLoginSuccess({ body: authFixtures.loginSuccessResponse })
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
