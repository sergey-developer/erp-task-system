import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { RouteEnum } from 'configs/routes'

import { UserRoleEnum } from 'modules/user/constants'

import { testUtils as privateLayoutTestUtils } from 'components/Layouts/PrivateLayout/PrivateLayout.test'

import { MaybeNull } from 'shared/types/utils'

import PrivateApp from 'app/PrivateApp'

import userFixtures from '_tests_/fixtures/user'

import {
  mockGetSystemInfoSuccess,
  mockGetTimeZoneListSuccess,
  mockGetUserMeCodeSuccess,
  mockGetUserMeSuccess,
} from '_tests_/mocks/api'
import {
  selectTestUtils,
  render,
  renderInRoute,
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

const getUserStatusSelect = (opened?: boolean) =>
  selectTestUtils.getSelect(getUserStatusSelectContainer(), {
    name: 'Статус пользователя',
    expanded: opened,
  })

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
      describe('Рабочий стол', () => {
        test('Отображается корректно', async () => {
          const fakeUser = userFixtures.user({
            role: UserRoleEnum.FirstLineSupport,
          })
          mockGetUserMeSuccess({ body: fakeUser })

          mockGetTimeZoneListSuccess()
          mockGetUserMeCodeSuccess()
          mockGetSystemInfoSuccess()

          render(<PrivateApp />)

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

          const { user, getCurrentRoute } = renderInRoute(<PrivateApp />, RouteEnum.Root)

          await privateLayoutTestUtils.expectLoadingFinished()
          await testUtils.clickNavMenuItem(user, 'Рабочий стол')

          expect(getCurrentRoute()).toBe(RouteEnum.TaskList)
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

          render(<PrivateApp />)

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

          render(<PrivateApp />)

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

          render(<PrivateApp />)

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

          const { user, getCurrentRoute } = renderInRoute(<PrivateApp />, RouteEnum.Root)

          await privateLayoutTestUtils.expectLoadingFinished()
          await testUtils.clickNavMenuItem(user, 'Рабочий стол')

          expect(getCurrentRoute()).toBe(RouteEnum.TaskList)
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
          mockGetSystemInfoSuccess()

          const { user, getCurrentRoute } = renderInRoute(<PrivateApp />, RouteEnum.Root)

          await privateLayoutTestUtils.expectLoadingFinished()
          await testUtils.clickNavMenuItem(user, 'Отчёт по ФН')

          expect(getCurrentRoute()).toBe(RouteEnum.FiscalAccumulatorList)
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

          render(<PrivateApp />)

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

          render(<PrivateApp />)

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

          const { user, getCurrentRoute } = renderInRoute(<PrivateApp />, RouteEnum.Root)

          await privateLayoutTestUtils.expectLoadingFinished()
          await testUtils.clickNavMenuItem(user, 'Рабочий стол')

          expect(getCurrentRoute()).toBe(RouteEnum.TaskList)
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
          mockGetSystemInfoSuccess()

          const { user, getCurrentRoute } = renderInRoute(<PrivateApp />, RouteEnum.Root)

          await privateLayoutTestUtils.expectLoadingFinished()
          await testUtils.clickNavMenuItem(user, 'Отчёт по ФН')

          expect(getCurrentRoute()).toBe(RouteEnum.FiscalAccumulatorList)
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

          render(<PrivateApp />)

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

          render(<PrivateApp />)

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

          const { user, getCurrentRoute } = renderInRoute(<PrivateApp />, RouteEnum.Root)

          await privateLayoutTestUtils.expectLoadingFinished()
          await testUtils.clickNavMenuItem(user, 'Рабочий стол')

          expect(getCurrentRoute()).toBe(RouteEnum.TaskList)
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
          mockGetSystemInfoSuccess()

          const { user, getCurrentRoute } = renderInRoute(<PrivateApp />, RouteEnum.Root)

          await privateLayoutTestUtils.expectLoadingFinished()
          await testUtils.clickNavMenuItem(user, 'Отчёт по ФН')

          expect(getCurrentRoute()).toBe(RouteEnum.FiscalAccumulatorList)
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

          render(<PrivateApp />)

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
})
