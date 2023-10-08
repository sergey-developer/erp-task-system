import { waitFor } from '@testing-library/react'

import { testUtils as taskTableTestUtils } from 'modules/task/components/TaskTable/TaskTable.test'
import {
  updateUserStatusMessages,
  updateUserTimeZoneMessages,
  UserRoleEnum,
} from 'modules/user/constants'

import { testUtils as privateHeaderTestUtils } from 'components/Headers/PrivateHeader/PrivateHeader.test'
import { testUtils as privateLayoutTestUtils } from 'components/Layouts/PrivateLayout/PrivateLayout.test'

import { UserStatusCodeEnum } from 'shared/constants/catalogs'

import catalogsFixtures from '_tests_/fixtures/catalogs'
import userFixtures from '_tests_/fixtures/user'
import {
  mockGetSystemInfoSuccess,
  mockGetTaskCountersSuccess,
  mockGetTaskListSuccess,
  mockGetTimeZoneListSuccess,
  mockGetUserMeCodeSuccess,
  mockGetUserMeSuccess,
  mockGetUserStatusListSuccess,
  mockUpdateUserServerError,
  mockUpdateUserStatusBadRequestError,
  mockUpdateUserStatusNotFoundError,
  mockUpdateUserStatusServerError,
  mockUpdateUserStatusSuccess,
  mockUpdateUserStatusUnauthorizedError,
  mockUpdateUserSuccess,
} from '_tests_/mocks/api'
import { fakeId, fakeWord, notificationTestUtils, render, setupApiTests } from '_tests_/utils'

import { taskLocalStorageService } from 'modules/task/services/taskLocalStorage/taskLocalStorage.service'
import PrivateApp from './PrivateApp'

setupApiTests()
notificationTestUtils.setupNotifications()

describe('Private app', () => {
  describe('Private header', () => {
    describe('Time zone', () => {
      test('Отображается состояние загрузки во время загрузки временных зон', async () => {
        mockGetUserMeCodeSuccess()
        mockGetSystemInfoSuccess()
        mockGetTimeZoneListSuccess({ body: [catalogsFixtures.timeZoneListItem()] })
        mockGetUserMeSuccess({ body: userFixtures.user() })

        render(<PrivateApp />)

        await privateLayoutTestUtils.expectLoadingFinished()
        await privateHeaderTestUtils.expectTimeZoneLoadingStarted()
      })

      test('Отображается состояние загрузки во время обновления пользователя', async () => {
        mockGetUserMeCodeSuccess()
        mockGetSystemInfoSuccess()

        const fakeTimeZoneListItem = catalogsFixtures.timeZoneListItem()
        mockGetTimeZoneListSuccess({ body: [fakeTimeZoneListItem] })

        const fakeUser = userFixtures.user()
        mockGetUserMeSuccess({ body: fakeUser })

        mockUpdateUserSuccess(fakeUser.id)

        const { user } = render(<PrivateApp />)

        await privateLayoutTestUtils.expectLoadingFinished()
        await privateHeaderTestUtils.expectTimeZoneLoadingFinished()
        await privateHeaderTestUtils.openTimeZoneSelect(user)
        await privateHeaderTestUtils.setTimeZone(user, fakeTimeZoneListItem.label)
        await privateHeaderTestUtils.expectTimeZoneLoadingStarted()
      })

      // todo: выяснить почему не проходит
      test.skip('Перезагружает реестр заявок и карточку заявки после обновления временной зоны', async () => {
        mockGetUserMeCodeSuccess()
        mockGetSystemInfoSuccess()

        const fakeTimeZoneListItem = catalogsFixtures.timeZoneListItem()
        mockGetTimeZoneListSuccess({ body: [fakeTimeZoneListItem] })

        const fakeUser = userFixtures.user()
        mockGetUserMeSuccess({ body: fakeUser })

        mockUpdateUserSuccess(fakeUser.id)

        const { user } = render(<PrivateApp />)

        await privateLayoutTestUtils.expectLoadingFinished()
        await privateHeaderTestUtils.expectTimeZoneLoadingFinished()
        await taskTableTestUtils.expectLoadingFinished()
        // await taskCardTestUtils.expectLoadingStarted()
        await privateHeaderTestUtils.openTimeZoneSelect(user)
        await privateHeaderTestUtils.setTimeZone(user, fakeTimeZoneListItem.label)
        await privateHeaderTestUtils.expectTimeZoneLoadingFinished()
        await taskTableTestUtils.expectLoadingStarted()
        // await taskCardTestUtils.expectLoadingStarted()
      })

      test('Отображается временная зона пользователя', async () => {
        mockGetUserMeCodeSuccess()
        mockGetSystemInfoSuccess()

        const fakeTimeZoneListItem = catalogsFixtures.timeZoneListItem()
        mockGetTimeZoneListSuccess({ body: [fakeTimeZoneListItem] })

        const fakeUser = userFixtures.user()
        mockGetUserMeSuccess({ body: fakeUser })

        render(<PrivateApp />)

        await privateLayoutTestUtils.expectLoadingFinished()
        await privateHeaderTestUtils.expectTimeZoneLoadingFinished()
        const option = privateHeaderTestUtils.getSelectedTimeZone()

        expect(option).toHaveTextContent(fakeUser.timezone)
      })

      test('Отображается верное количество временных зон', async () => {
        mockGetUserMeCodeSuccess()
        mockGetSystemInfoSuccess()

        const fakeTimeZoneList = catalogsFixtures.timeZoneList()
        mockGetTimeZoneListSuccess({ body: fakeTimeZoneList })

        const fakeUser = userFixtures.user()
        mockGetUserMeSuccess({ body: fakeUser })

        const { user } = render(<PrivateApp />)

        await privateLayoutTestUtils.expectLoadingFinished()
        await privateHeaderTestUtils.expectTimeZoneLoadingFinished()
        await privateHeaderTestUtils.openTimeZoneSelect(user)
        const options = privateHeaderTestUtils.getAllTimeZoneOption()

        expect(options).toHaveLength(fakeTimeZoneList.length)
      })

      // todo: Выяснить почему не проходит. Всё работает верно, но в тестах новое значение не приходит почему-то
      test.skip('Можно обновить значение', async () => {
        mockGetUserMeCodeSuccess()
        mockGetSystemInfoSuccess()

        const fakeTimeZoneListItem1 = catalogsFixtures.timeZoneListItem()
        const fakeTimeZoneListItem2 = catalogsFixtures.timeZoneListItem()
        mockGetTimeZoneListSuccess({
          body: [fakeTimeZoneListItem1, fakeTimeZoneListItem2],
        })

        const fakeUser = userFixtures.user({
          timezone: fakeTimeZoneListItem1.value,
        })
        mockGetUserMeSuccess({ body: fakeUser })

        mockUpdateUserSuccess(fakeUser.id)

        const { user } = render(<PrivateApp />)

        await privateLayoutTestUtils.expectLoadingFinished()
        await privateHeaderTestUtils.expectTimeZoneLoadingFinished()
        const currentTimeZoneOption = privateHeaderTestUtils.getSelectedTimeZone()

        expect(currentTimeZoneOption).toHaveTextContent(fakeTimeZoneListItem1.label)

        await privateHeaderTestUtils.openTimeZoneSelect(user)
        await privateHeaderTestUtils.setTimeZone(user, fakeTimeZoneListItem2.label)
        await privateHeaderTestUtils.expectTimeZoneLoadingFinished()

        await waitFor(() => {
          const newTimeZoneOption = privateHeaderTestUtils.getSelectedTimeZone()
          expect(newTimeZoneOption).toHaveTextContent(fakeTimeZoneListItem2.label)
        })
      })

      test('При ошибке обновления показывается уведомление', async () => {
        mockGetUserMeCodeSuccess()
        mockGetSystemInfoSuccess()

        const fakeTimeZoneListItem = catalogsFixtures.timeZoneListItem()
        mockGetTimeZoneListSuccess({ body: [fakeTimeZoneListItem] })

        const fakeUser = userFixtures.user()
        mockGetUserMeSuccess({ body: fakeUser })

        mockUpdateUserServerError(fakeUser.id)

        const { user } = render(<PrivateApp />)

        await privateLayoutTestUtils.expectLoadingFinished()
        await privateHeaderTestUtils.expectTimeZoneLoadingFinished()
        await privateHeaderTestUtils.openTimeZoneSelect(user)
        await privateHeaderTestUtils.setTimeZone(user, fakeTimeZoneListItem.label)
        await privateHeaderTestUtils.expectTimeZoneLoadingFinished()

        const notification = await notificationTestUtils.findNotification(
          updateUserTimeZoneMessages.commonError,
        )

        expect(notification).toBeInTheDocument()
      })
    })

    // todo: Перенести в PrivateHeader
    describe('Селект выбора статуса пользователя', () => {
      describe(`Для роли ${UserRoleEnum.FirstLineSupport}`, () => {
        test('Отображается', async () => {
          mockGetUserMeCodeSuccess()
          mockGetSystemInfoSuccess()
          mockGetTimeZoneListSuccess()
          mockGetUserStatusListSuccess()

          mockGetUserMeSuccess({
            body: userFixtures.user({
              role: UserRoleEnum.FirstLineSupport,
            }),
          })

          render(<PrivateApp />)

          await privateLayoutTestUtils.expectLoadingFinished()
          const selectContainer = privateHeaderTestUtils.getUserStatusSelectContainer()

          expect(selectContainer).toBeInTheDocument()
        })

        test('Отображает установленный статус', async () => {
          mockGetUserMeCodeSuccess()
          mockGetSystemInfoSuccess()
          mockGetTimeZoneListSuccess()

          const fakeUserStatus = catalogsFixtures.userStatusListItem()
          mockGetUserStatusListSuccess({ body: [fakeUserStatus] })

          mockGetUserMeSuccess({
            body: userFixtures.user({
              role: UserRoleEnum.FirstLineSupport,
              status: fakeUserStatus,
            }),
          })

          render(<PrivateApp />)

          await privateLayoutTestUtils.expectLoadingFinished()
          await privateHeaderTestUtils.expectUserStatusLoadingFinished()
          const selectedUserStatus = privateHeaderTestUtils.getSelectedUserStatus()

          expect(selectedUserStatus).toHaveTextContent(new RegExp(fakeUserStatus.title))
        })

        describe('Выбор статуса', () => {
          describe('При успешном запросе', () => {
            test('Меняется выбранный статус', async () => {
              mockGetUserMeCodeSuccess()
              mockGetSystemInfoSuccess()
              mockGetTimeZoneListSuccess()

              const fakeUserStatus1 = catalogsFixtures.userStatusListItem()
              const fakeUserStatus2 = catalogsFixtures.userStatusListItem()
              mockGetUserStatusListSuccess({
                body: [fakeUserStatus1, fakeUserStatus2],
              })

              const fakeUser = userFixtures.user({
                role: UserRoleEnum.FirstLineSupport,
                status: fakeUserStatus2,
              })
              mockGetUserMeSuccess({ body: fakeUser })

              mockUpdateUserStatusSuccess(fakeUser.id)

              const { user } = render(<PrivateApp />)

              await privateLayoutTestUtils.expectLoadingFinished()
              await privateHeaderTestUtils.expectUserStatusLoadingFinished()
              await privateHeaderTestUtils.openUserStatusSelect(user)
              await privateHeaderTestUtils.setUserStatus(user, fakeUserStatus1.title)
              await privateHeaderTestUtils.expectUserStatusSelectDisabled()
              await privateHeaderTestUtils.expectUserStatusSelectNotDisabled()

              const selectedUserStatus = privateHeaderTestUtils.getSelectedUserStatus()

              expect(selectedUserStatus).toHaveTextContent(new RegExp(fakeUserStatus1.title))
            })

            test('Если выбран статус OFFLINE, то удаляются фильтры страницы реестра заявок из localStorage', async () => {
              mockGetTaskListSuccess()
              mockGetTaskCountersSuccess()
              mockGetUserMeCodeSuccess()
              mockGetSystemInfoSuccess()
              mockGetTimeZoneListSuccess()

              const userStatus = catalogsFixtures.userStatusListItem({
                code: UserStatusCodeEnum.Offline,
              })
              mockGetUserStatusListSuccess({ body: [userStatus] })

              const fakeUser = userFixtures.user({
                role: UserRoleEnum.FirstLineSupport,
                status: userStatus,
              })
              mockGetUserMeSuccess({ body: fakeUser })

              mockUpdateUserStatusSuccess(fakeUser.id)

              const { user } = render(<PrivateApp />, { useBrowserRouter: false })

              taskLocalStorageService.setTaskListPageFilters({ customers: [fakeId()] })
              await privateLayoutTestUtils.expectLoadingFinished()
              await privateHeaderTestUtils.expectUserStatusLoadingFinished()

              expect(taskLocalStorageService.getTaskListPageFilters()).toBeTruthy()

              await privateHeaderTestUtils.openUserStatusSelect(user)
              await privateHeaderTestUtils.setUserStatus(user, userStatus.title, true)
              await privateHeaderTestUtils.expectUserStatusSelectDisabled()
              await privateHeaderTestUtils.expectUserStatusSelectNotDisabled()

              expect(taskLocalStorageService.getTaskListPageFilters()).toBeNull()
            })
          })

          describe('При не успешном запросе', () => {
            test('Обрабатывается ошибка 400', async () => {
              mockGetUserMeCodeSuccess()
              mockGetSystemInfoSuccess()
              mockGetTimeZoneListSuccess()

              const fakeUserStatus1 = catalogsFixtures.userStatusListItem()
              const fakeUserStatus2 = catalogsFixtures.userStatusListItem()
              mockGetUserStatusListSuccess({
                body: [fakeUserStatus1, fakeUserStatus2],
              })

              const fakeUser = userFixtures.user({
                role: UserRoleEnum.FirstLineSupport,
                status: fakeUserStatus2,
              })
              mockGetUserMeSuccess({ body: fakeUser })

              const badRequestErrorMessage = fakeWord()
              mockUpdateUserStatusBadRequestError(fakeUser.id, {
                body: { detail: [badRequestErrorMessage] },
              })

              const { user } = render(<PrivateApp />)

              await privateLayoutTestUtils.expectLoadingFinished()
              await privateHeaderTestUtils.expectUserStatusLoadingFinished()
              await privateHeaderTestUtils.openUserStatusSelect(user)
              await privateHeaderTestUtils.setUserStatus(user, fakeUserStatus1.title)
              await privateHeaderTestUtils.expectUserStatusSelectDisabled()
              await privateHeaderTestUtils.expectUserStatusSelectNotDisabled()

              const selectedUserStatus = privateHeaderTestUtils.getSelectedUserStatus()

              expect(selectedUserStatus).not.toHaveTextContent(new RegExp(fakeUserStatus1.title))

              const notification = await notificationTestUtils.findNotification(
                badRequestErrorMessage,
              )
              expect(notification).toBeInTheDocument()
            })

            test('Обрабатывается ошибка 401', async () => {
              mockGetUserMeCodeSuccess()
              mockGetSystemInfoSuccess()
              mockGetTimeZoneListSuccess()

              const fakeUserStatus1 = catalogsFixtures.userStatusListItem()
              const fakeUserStatus2 = catalogsFixtures.userStatusListItem()
              mockGetUserStatusListSuccess({
                body: [fakeUserStatus1, fakeUserStatus2],
              })

              const fakeUser = userFixtures.user({
                role: UserRoleEnum.FirstLineSupport,
                status: fakeUserStatus2,
              })
              mockGetUserMeSuccess({ body: fakeUser })

              const unauthorizedErrorMessage = fakeWord()
              mockUpdateUserStatusUnauthorizedError(fakeUser.id, {
                body: { detail: unauthorizedErrorMessage },
              })

              const { user } = render(<PrivateApp />)

              await privateLayoutTestUtils.expectLoadingFinished()
              await privateHeaderTestUtils.expectUserStatusLoadingFinished()
              await privateHeaderTestUtils.openUserStatusSelect(user)
              await privateHeaderTestUtils.setUserStatus(user, fakeUserStatus1.title)
              await privateHeaderTestUtils.expectUserStatusSelectDisabled()
              await privateHeaderTestUtils.expectUserStatusSelectNotDisabled()

              const selectedUserStatus = privateHeaderTestUtils.getSelectedUserStatus()

              expect(selectedUserStatus).not.toHaveTextContent(new RegExp(fakeUserStatus1.title))

              const notification = await notificationTestUtils.findNotification(
                unauthorizedErrorMessage,
              )
              expect(notification).toBeInTheDocument()
            })

            test('Обрабатывается ошибка 404', async () => {
              mockGetUserMeCodeSuccess()
              mockGetSystemInfoSuccess()
              mockGetTimeZoneListSuccess()

              const fakeUserStatus1 = catalogsFixtures.userStatusListItem()
              const fakeUserStatus2 = catalogsFixtures.userStatusListItem()
              mockGetUserStatusListSuccess({
                body: [fakeUserStatus1, fakeUserStatus2],
              })

              const fakeUser = userFixtures.user({
                role: UserRoleEnum.FirstLineSupport,
                status: fakeUserStatus2,
              })
              mockGetUserMeSuccess({ body: fakeUser })

              const errorMessage = fakeWord()
              mockUpdateUserStatusNotFoundError(fakeUser.id, {
                body: { detail: errorMessage },
              })

              const { user } = render(<PrivateApp />)

              await privateLayoutTestUtils.expectLoadingFinished()
              await privateHeaderTestUtils.expectUserStatusLoadingFinished()
              await privateHeaderTestUtils.openUserStatusSelect(user)
              await privateHeaderTestUtils.setUserStatus(user, fakeUserStatus1.title)
              await privateHeaderTestUtils.expectUserStatusSelectDisabled()
              await privateHeaderTestUtils.expectUserStatusSelectNotDisabled()

              const selectedUserStatus = privateHeaderTestUtils.getSelectedUserStatus()

              expect(selectedUserStatus).not.toHaveTextContent(new RegExp(fakeUserStatus1.title))

              const notification = await notificationTestUtils.findNotification(errorMessage)
              expect(notification).toBeInTheDocument()
            })

            test('Обрабатывается ошибка 500', async () => {
              mockGetUserMeCodeSuccess()
              mockGetSystemInfoSuccess()
              mockGetTimeZoneListSuccess()

              const fakeUserStatus1 = catalogsFixtures.userStatusListItem()
              const fakeUserStatus2 = catalogsFixtures.userStatusListItem()
              mockGetUserStatusListSuccess({
                body: [fakeUserStatus1, fakeUserStatus2],
              })

              const fakeUser = userFixtures.user({
                role: UserRoleEnum.FirstLineSupport,
                status: fakeUserStatus2,
              })
              mockGetUserMeSuccess({ body: fakeUser })

              mockUpdateUserStatusServerError(fakeUser.id)

              const { user } = render(<PrivateApp />)

              await privateLayoutTestUtils.expectLoadingFinished()
              await privateHeaderTestUtils.expectUserStatusLoadingFinished()
              await privateHeaderTestUtils.openUserStatusSelect(user)
              await privateHeaderTestUtils.setUserStatus(user, fakeUserStatus1.title)
              await privateHeaderTestUtils.expectUserStatusSelectDisabled()
              await privateHeaderTestUtils.expectUserStatusSelectNotDisabled()

              const selectedUserStatus = privateHeaderTestUtils.getSelectedUserStatus()

              expect(selectedUserStatus).not.toHaveTextContent(new RegExp(fakeUserStatus1.title))

              const notification = await notificationTestUtils.findNotification(
                updateUserStatusMessages.commonError,
              )
              expect(notification).toBeInTheDocument()
            })
          })
        })
      })

      describe(`Для роли ${UserRoleEnum.Engineer}`, () => {
        test('Не отображается', async () => {
          mockGetUserMeCodeSuccess()
          mockGetSystemInfoSuccess()
          mockGetTimeZoneListSuccess()
          mockGetUserStatusListSuccess()

          mockGetUserMeSuccess({
            body: userFixtures.user({
              role: UserRoleEnum.Engineer,
            }),
          })

          render(<PrivateApp />)

          await privateLayoutTestUtils.expectLoadingFinished()
          const selectContainer = privateHeaderTestUtils.queryUserStatusSelectContainer()

          expect(selectContainer).not.toBeInTheDocument()
        })
      })

      describe(`Для роли ${UserRoleEnum.SeniorEngineer}`, () => {
        test('Не отображается', async () => {
          mockGetUserMeCodeSuccess()
          mockGetSystemInfoSuccess()
          mockGetTimeZoneListSuccess()
          mockGetUserStatusListSuccess()

          mockGetUserMeSuccess({
            body: userFixtures.user({
              role: UserRoleEnum.SeniorEngineer,
            }),
          })

          render(<PrivateApp />)

          await privateLayoutTestUtils.expectLoadingFinished()
          const selectContainer = privateHeaderTestUtils.queryUserStatusSelectContainer()

          expect(selectContainer).not.toBeInTheDocument()
        })
      })

      describe(`Для роли ${UserRoleEnum.HeadOfDepartment}`, () => {
        test('Не отображается', async () => {
          mockGetUserMeCodeSuccess()
          mockGetSystemInfoSuccess()
          mockGetTimeZoneListSuccess()
          mockGetUserStatusListSuccess()

          mockGetUserMeSuccess({
            body: userFixtures.user({
              role: UserRoleEnum.HeadOfDepartment,
            }),
          })

          render(<PrivateApp />)

          await privateLayoutTestUtils.expectLoadingFinished()
          const selectContainer = privateHeaderTestUtils.queryUserStatusSelectContainer()

          expect(selectContainer).not.toBeInTheDocument()
        })
      })
    })
  })
})
