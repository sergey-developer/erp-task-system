import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { RouteEnum } from 'configs/routes'

import { UserRoleEnum } from 'modules/user/constants/roles'

import { testUtils as privateLayoutTestUtils } from 'components/Layouts/PrivateLayout/PrivateLayout.test'

import { MaybeNull } from 'shared/interfaces/utils'

import PrivateApp from 'app/PrivateApp'

import userFixtures from 'fixtures/user'

import {
  mockGetTimeZoneListSuccess,
  mockGetUserMeCodeSuccess,
  mockGetUserMeSuccess,
} from '_tests_/mocks/api'
import {
  clickSelectOption,
  expectLoadingFinishedBySelect,
  expectLoadingStartedBySelect,
  expectSelectDisabled,
  expectSelectNotDisabled,
  getAllSelectOption,
  getSelect,
  getSelectedOption,
  openSelect,
  render,
  renderInRoute,
  setupApiTests,
} from '_tests_/utils'

import PrivateHeader from './index'

const getContainer = () => screen.getByTestId('private-header')

// nav menu
const getNavMenuContainer = () => within(getContainer()).getByRole('menu')

const getNavMenuItem = (name: string) =>
  within(getNavMenuContainer()).getByText(name)

const queryNavMenuItem = (name: string) =>
  within(getNavMenuContainer()).queryByText(name)

const clickNavMenuItem = async (user: UserEvent, name: string) => {
  const item = getNavMenuItem(name)
  await user.click(item)
}

// timezone
const getTimeZoneSelectContainer = () =>
  within(getContainer()).getByTestId('timezone-select')

const getTimeZoneSelect = (opened?: boolean) =>
  getSelect(getTimeZoneSelectContainer(), {
    name: 'Временная зона',
    expanded: opened,
  })

const getSelectedTimeZone = () =>
  getSelectedOption(getTimeZoneSelectContainer())

const openTimeZoneSelect = (user: UserEvent) =>
  openSelect(user, getTimeZoneSelectContainer())

const setTimeZone = clickSelectOption

const getAllTimeZoneOption = getAllSelectOption

const expectTimeZoneLoadingStarted = () =>
  expectLoadingStartedBySelect(getTimeZoneSelectContainer())

const expectTimeZoneLoadingFinished = () =>
  expectLoadingFinishedBySelect(getTimeZoneSelectContainer())

// user status
const getUserStatusSelectContainer = (): HTMLElement =>
  within(getContainer()).getByTestId('user-status-select')

const queryUserStatusSelectContainer = (): MaybeNull<HTMLElement> =>
  within(getContainer()).queryByTestId('user-status-select')

const getUserStatusSelect = (opened?: boolean) =>
  getSelect(getUserStatusSelectContainer(), {
    name: 'Статус пользователя',
    expanded: opened,
  })

const getSelectedUserStatus = () =>
  getSelectedOption(getUserStatusSelectContainer())

const openUserStatusSelect = (user: UserEvent) =>
  openSelect(user, getUserStatusSelectContainer())

const setUserStatus = clickSelectOption

const getAllUserStatusOption = getAllSelectOption

const expectUserStatusLoadingStarted = () =>
  expectLoadingStartedBySelect(getUserStatusSelectContainer())

const expectUserStatusLoadingFinished = () =>
  expectLoadingFinishedBySelect(getUserStatusSelectContainer())

const expectUserStatusSelectDisabled = () =>
  expectSelectDisabled(getUserStatusSelectContainer())

const expectUserStatusSelectNotDisabled = () =>
  expectSelectNotDisabled(getUserStatusSelectContainer())

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
  getUserStatusSelect,
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
      describe('Элемент "Заявки"', () => {
        test('Отображается корректно', async () => {
          const fakeUser = userFixtures.user({
            role: UserRoleEnum.FirstLineSupport,
          })
          mockGetUserMeSuccess({ body: fakeUser })

          mockGetTimeZoneListSuccess()
          mockGetUserMeCodeSuccess()

          render(<PrivateApp />)

          await privateLayoutTestUtils.expectLoadingFinished()

          expect(testUtils.getNavMenuItem('Заявки')).toBeInTheDocument()
        })

        test('При клике роут меняется', async () => {
          const fakeUser = userFixtures.user({
            role: UserRoleEnum.FirstLineSupport,
          })
          mockGetUserMeSuccess({ body: fakeUser })

          mockGetTimeZoneListSuccess()
          mockGetUserMeCodeSuccess()

          const { user, getCurrentRoute } = renderInRoute(
            <PrivateApp />,
            RouteEnum.Root,
          )

          await privateLayoutTestUtils.expectLoadingFinished()
          await testUtils.clickNavMenuItem(user, 'Заявки')

          expect(getCurrentRoute()).toBe(RouteEnum.TaskList)
        })
      })

      describe('Элемент "Отчёт по ФН"', () => {
        test('Не отображается', async () => {
          const fakeUser = userFixtures.user({
            role: UserRoleEnum.FirstLineSupport,
          })
          mockGetUserMeSuccess({ body: fakeUser })

          mockGetTimeZoneListSuccess()
          mockGetUserMeCodeSuccess()

          render(<PrivateApp />)

          await privateLayoutTestUtils.expectLoadingFinished()

          expect(
            testUtils.queryNavMenuItem('Отчёт по ФН'),
          ).not.toBeInTheDocument()
        })
      })
    })

    describe(`Для роли ${UserRoleEnum.Engineer}`, () => {
      describe('Элемент "Заявки"', () => {
        test('Отображается корректно', async () => {
          const fakeUser = userFixtures.user({
            role: UserRoleEnum.Engineer,
          })
          mockGetUserMeSuccess({ body: fakeUser })

          mockGetTimeZoneListSuccess()
          mockGetUserMeCodeSuccess()

          render(<PrivateApp />)

          await privateLayoutTestUtils.expectLoadingFinished()

          expect(testUtils.getNavMenuItem('Заявки')).toBeInTheDocument()
        })

        test('При клике роут меняется', async () => {
          const fakeUser = userFixtures.user({
            role: UserRoleEnum.Engineer,
          })
          mockGetUserMeSuccess({ body: fakeUser })

          mockGetTimeZoneListSuccess()
          mockGetUserMeCodeSuccess()

          const { user, getCurrentRoute } = renderInRoute(
            <PrivateApp />,
            RouteEnum.Root,
          )

          await privateLayoutTestUtils.expectLoadingFinished()
          await testUtils.clickNavMenuItem(user, 'Заявки')

          expect(getCurrentRoute()).toBe(RouteEnum.TaskList)
        })
      })

      describe('Элемент "Отчёт по ФН"', () => {
        test('Отображается корректно', async () => {
          const fakeUser = userFixtures.user({
            role: UserRoleEnum.Engineer,
          })
          mockGetUserMeSuccess({ body: fakeUser })

          mockGetTimeZoneListSuccess()
          mockGetUserMeCodeSuccess()

          render(<PrivateApp />)

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

          const { user, getCurrentRoute } = renderInRoute(
            <PrivateApp />,
            RouteEnum.Root,
          )

          await privateLayoutTestUtils.expectLoadingFinished()
          await testUtils.clickNavMenuItem(user, 'Отчёт по ФН')

          expect(getCurrentRoute()).toBe(RouteEnum.FiscalAccumulatorTaskList)
        })
      })
    })

    describe(`Для роли ${UserRoleEnum.SeniorEngineer}`, () => {
      describe('Элемент "Заявки"', () => {
        test('Отображается корректно', async () => {
          const fakeUser = userFixtures.user({
            role: UserRoleEnum.SeniorEngineer,
          })
          mockGetUserMeSuccess({ body: fakeUser })

          mockGetTimeZoneListSuccess()
          mockGetUserMeCodeSuccess()

          render(<PrivateApp />)

          await privateLayoutTestUtils.expectLoadingFinished()

          expect(testUtils.getNavMenuItem('Заявки')).toBeInTheDocument()
        })

        test('При клике роут меняется', async () => {
          const fakeUser = userFixtures.user({
            role: UserRoleEnum.SeniorEngineer,
          })
          mockGetUserMeSuccess({ body: fakeUser })

          mockGetTimeZoneListSuccess()
          mockGetUserMeCodeSuccess()

          const { user, getCurrentRoute } = renderInRoute(
            <PrivateApp />,
            RouteEnum.Root,
          )

          await privateLayoutTestUtils.expectLoadingFinished()
          await testUtils.clickNavMenuItem(user, 'Заявки')

          expect(getCurrentRoute()).toBe(RouteEnum.TaskList)
        })
      })

      describe('Элемент "Отчёт по ФН"', () => {
        test('Отображается корректно', async () => {
          const fakeUser = userFixtures.user({
            role: UserRoleEnum.SeniorEngineer,
          })
          mockGetUserMeSuccess({ body: fakeUser })

          mockGetTimeZoneListSuccess()
          mockGetUserMeCodeSuccess()

          render(<PrivateApp />)

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

          const { user, getCurrentRoute } = renderInRoute(
            <PrivateApp />,
            RouteEnum.Root,
          )

          await privateLayoutTestUtils.expectLoadingFinished()
          await testUtils.clickNavMenuItem(user, 'Отчёт по ФН')

          expect(getCurrentRoute()).toBe(RouteEnum.FiscalAccumulatorTaskList)
        })
      })
    })

    describe(`Для роли ${UserRoleEnum.HeadOfDepartment}`, () => {
      describe('Элемент "Заявки"', () => {
        test('Отображается корректно', async () => {
          const fakeUser = userFixtures.user({
            role: UserRoleEnum.HeadOfDepartment,
          })
          mockGetUserMeSuccess({ body: fakeUser })

          mockGetTimeZoneListSuccess()
          mockGetUserMeCodeSuccess()

          render(<PrivateApp />)

          await privateLayoutTestUtils.expectLoadingFinished()

          expect(testUtils.getNavMenuItem('Заявки')).toBeInTheDocument()
        })

        test('При клике роут меняется', async () => {
          const fakeUser = userFixtures.user({
            role: UserRoleEnum.HeadOfDepartment,
          })
          mockGetUserMeSuccess({ body: fakeUser })

          mockGetTimeZoneListSuccess()
          mockGetUserMeCodeSuccess()

          const { user, getCurrentRoute } = renderInRoute(
            <PrivateApp />,
            RouteEnum.Root,
          )

          await privateLayoutTestUtils.expectLoadingFinished()
          await testUtils.clickNavMenuItem(user, 'Заявки')

          expect(getCurrentRoute()).toBe(RouteEnum.TaskList)
        })
      })

      describe('Элемент "Отчёт по ФН"', () => {
        test('Отображается корректно', async () => {
          const fakeUser = userFixtures.user({
            role: UserRoleEnum.HeadOfDepartment,
          })
          mockGetUserMeSuccess({ body: fakeUser })

          mockGetTimeZoneListSuccess()
          mockGetUserMeCodeSuccess()

          render(<PrivateApp />)

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

          const { user, getCurrentRoute } = renderInRoute(
            <PrivateApp />,
            RouteEnum.Root,
          )

          await privateLayoutTestUtils.expectLoadingFinished()
          await testUtils.clickNavMenuItem(user, 'Отчёт по ФН')

          expect(getCurrentRoute()).toBe(RouteEnum.FiscalAccumulatorTaskList)
        })
      })
    })
  })

  describe('Селект выбора временной зоны', () => {
    test('Отображается', () => {
      render(<PrivateHeader />)

      const field = testUtils.getTimeZoneSelect()

      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
    })
  })
})
