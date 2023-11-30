import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { CommonRouteEnum } from 'configs/routes'

import { testUtils as logoutButtonTestUtils } from 'modules/auth/components/LogoutButton/LogoutButton.test'
import { testUtils as loginPageTestUtils } from 'modules/auth/pages/LoginPage/LoginPage.test'
import { FiscalAccumulatorRouteEnum } from 'modules/fiscalAccumulator/constants'
import { taskLocalStorageService } from 'modules/task/services/taskLocalStorageService/taskLocalStorage.service'
import { UserRoleEnum } from 'modules/user/constants'

import { testUtils as privateLayoutTestUtils } from 'components/Layouts/HomeLayout/HomeLayout.test'

import { MaybeNull } from 'shared/types/utils'

import App from 'app/App'

import authFixtures from '_tests_/fixtures/auth'
import userFixtures from '_tests_/fixtures/user'
import {
  mockGetSystemInfoSuccess,
  mockGetTaskCountersSuccess,
  mockGetTaskListSuccess,
  mockGetTimeZoneListSuccess,
  mockGetUserMeCodeSuccess,
  mockGetUserMeSuccess,
  mockGetUserStatusListSuccess,
  mockLoginSuccess,
  mockLogoutSuccess,
} from '_tests_/mocks/api'
import {
  fakeEmail,
  fakeWord,
  render,
  renderInRoute,
  selectTestUtils,
  setupApiTests,
} from '_tests_/utils'

import PrivateHeader from './index'

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

const getTimeZoneSelect = (opened?: boolean) =>
  selectTestUtils.getSelect(getTimeZoneSelectContainer(), {
    name: 'Временная зона',
    expanded: opened,
  })

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

describe('PrivateHeader', () => {
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

          render(<App />)

          await privateLayoutTestUtils.expectLoadingFinished()

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

          const { user, getCurrentRoute } = renderInRoute(<App />, CommonRouteEnum.Root)

          await privateLayoutTestUtils.expectLoadingFinished()
          await testUtils.clickNavMenuItem(user, 'Рабочий стол')

          expect(getCurrentRoute()).toBe(CommonRouteEnum.DesktopTaskList)
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

          render(<App />)

          await privateLayoutTestUtils.expectLoadingFinished()

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

          render(<App />)

          await privateLayoutTestUtils.expectLoadingFinished()

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

          render(<App />)

          await privateLayoutTestUtils.expectLoadingFinished()

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

          const { user, getCurrentRoute } = renderInRoute(<App />, CommonRouteEnum.Root)

          await privateLayoutTestUtils.expectLoadingFinished()
          await testUtils.clickNavMenuItem(user, 'Рабочий стол')

          expect(getCurrentRoute()).toBe(CommonRouteEnum.DesktopTaskList)
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

          render(<App />)

          await privateLayoutTestUtils.expectLoadingFinished()

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

          const { user, getCurrentRoute } = renderInRoute(<App />, CommonRouteEnum.Root)

          await privateLayoutTestUtils.expectLoadingFinished()
          await testUtils.clickNavMenuItem(user, 'Отчёт по ФН')

          expect(getCurrentRoute()).toBe(FiscalAccumulatorRouteEnum.FiscalAccumulator)
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

          render(<App />)

          await privateLayoutTestUtils.expectLoadingFinished()

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

          render(<App />)

          await privateLayoutTestUtils.expectLoadingFinished()

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

          const { user, getCurrentRoute } = renderInRoute(<App />, CommonRouteEnum.Root)

          await privateLayoutTestUtils.expectLoadingFinished()
          await testUtils.clickNavMenuItem(user, 'Рабочий стол')

          expect(getCurrentRoute()).toBe(CommonRouteEnum.DesktopTaskList)
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

          render(<App />)

          await privateLayoutTestUtils.expectLoadingFinished()

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

          const { user, getCurrentRoute } = renderInRoute(<App />, CommonRouteEnum.Root)

          await privateLayoutTestUtils.expectLoadingFinished()
          await testUtils.clickNavMenuItem(user, 'Отчёт по ФН')

          expect(getCurrentRoute()).toBe(FiscalAccumulatorRouteEnum.FiscalAccumulator)
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

          render(<App />)

          await privateLayoutTestUtils.expectLoadingFinished()

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

          render(<App />)

          await privateLayoutTestUtils.expectLoadingFinished()

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

          const { user, getCurrentRoute } = renderInRoute(<App />, CommonRouteEnum.Root)

          await privateLayoutTestUtils.expectLoadingFinished()
          await testUtils.clickNavMenuItem(user, 'Рабочий стол')

          expect(getCurrentRoute()).toBe(CommonRouteEnum.DesktopTaskList)
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

          render(<App />)

          await privateLayoutTestUtils.expectLoadingFinished()

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

          const { user, getCurrentRoute } = renderInRoute(<App />, CommonRouteEnum.Root)

          await privateLayoutTestUtils.expectLoadingFinished()
          await testUtils.clickNavMenuItem(user, 'Отчёт по ФН')

          expect(getCurrentRoute()).toBe(FiscalAccumulatorRouteEnum.FiscalAccumulator)
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

          render(<App />)

          await privateLayoutTestUtils.expectLoadingFinished()

          expect(testUtils.getNavMenuItem('Управление складами')).toBeInTheDocument()
        })

        test.todo('Справочники')
        test.todo('Управление запасами')
      })
    })
  })

  describe('Селект выбора временной зоны', () => {
    // todo: поправить
    test.skip('Отображается', () => {
      render(<PrivateHeader />)

      const field = testUtils.getTimeZoneSelect()

      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
    })
  })

  describe('Logout', () => {
    test('При успешном запросе переходит на страницу авторизации и очищает localStorage', async () => {
      mockGetUserMeSuccess()
      mockGetUserMeCodeSuccess()
      mockGetSystemInfoSuccess()
      mockGetTimeZoneListSuccess()
      mockGetUserStatusListSuccess()
      mockGetTaskListSuccess()
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
