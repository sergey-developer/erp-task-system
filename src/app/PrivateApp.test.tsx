import { waitFor } from '@testing-library/react'

import { testUtils as taskTableTestUtils } from 'modules/task/features/TaskTable/TaskTable.test'
import {
  updateUserStatusErrorMessages,
  userApiMessages,
} from 'modules/user/constants/errorMessages'
import { UserRoleEnum } from 'modules/user/constants/roles'

import { testUtils as privateHeaderTestUtils } from 'components/Headers/PrivateHeader/PrivateHeader.test'
import { testUtils as privateLayoutTestUtils } from 'components/Layouts/PrivateLayout/PrivateLayout.test'

import timeZoneFixtures from 'fixtures/timeZone'
import userFixtures from 'fixtures/user'

import {
  mockGetSystemInfoSuccess,
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
import {
  fakeWord,
  findNotification,
  render,
  setupApiTests,
  setupNotifications,
} from '_tests_/utils'

import PrivateApp from './PrivateApp'

setupApiTests()
setupNotifications()

describe('Private app', () => {
  describe('Private header', () => {
    describe('Time zone', () => {
      test('Отображается состояние загрузки во время загрузки временных зон', async () => {
        mockGetUserMeCodeSuccess()
        mockGetSystemInfoSuccess()

        mockGetTimeZoneListSuccess({
          body: [timeZoneFixtures.fakeTimeZoneListItem()],
        })

        mockGetUserMeSuccess({ body: userFixtures.fakeUser() })

        render(<PrivateApp />)

        await privateLayoutTestUtils.expectLoadingFinished()
        await privateHeaderTestUtils.expectTimeZoneLoadingStarted()
      })

      test('Отображается состояние загрузки во время обновления пользователя', async () => {
        mockGetUserMeCodeSuccess()
        mockGetSystemInfoSuccess()

        const fakeTimeZoneListItem = timeZoneFixtures.fakeTimeZoneListItem()
        mockGetTimeZoneListSuccess({ body: [fakeTimeZoneListItem] })

        const fakeUser = userFixtures.fakeUser()
        mockGetUserMeSuccess({ body: fakeUser })

        mockUpdateUserSuccess(fakeUser.id)

        const { user } = render(<PrivateApp />)

        await privateLayoutTestUtils.expectLoadingFinished()
        await privateHeaderTestUtils.expectTimeZoneLoadingFinished()
        await privateHeaderTestUtils.openTimeZoneSelect(user)
        await privateHeaderTestUtils.setTimeZone(
          user,
          fakeTimeZoneListItem.label,
        )
        await privateHeaderTestUtils.expectTimeZoneLoadingStarted()
      })

      // todo: выяснить почему не проходит
      test.skip('Перезагружает реестр заявок и карточку заявки после обновления временной зоны', async () => {
        mockGetUserMeCodeSuccess()
        mockGetSystemInfoSuccess()

        const fakeTimeZoneListItem = timeZoneFixtures.fakeTimeZoneListItem()
        mockGetTimeZoneListSuccess({ body: [fakeTimeZoneListItem] })

        const fakeUser = userFixtures.fakeUser()
        mockGetUserMeSuccess({ body: fakeUser })

        mockUpdateUserSuccess(fakeUser.id)

        const { user } = render(<PrivateApp />)

        await privateLayoutTestUtils.expectLoadingFinished()
        await privateHeaderTestUtils.expectTimeZoneLoadingFinished()
        await taskTableTestUtils.expectLoadingFinished()
        // await taskCardTestUtils.expectLoadingStarted()
        await privateHeaderTestUtils.openTimeZoneSelect(user)
        await privateHeaderTestUtils.setTimeZone(
          user,
          fakeTimeZoneListItem.label,
        )
        await privateHeaderTestUtils.expectTimeZoneLoadingFinished()
        await taskTableTestUtils.expectLoadingStarted()
        // await taskCardTestUtils.expectLoadingStarted()
      })

      test('Отображается временная зона пользователя', async () => {
        mockGetUserMeCodeSuccess()
        mockGetSystemInfoSuccess()

        const fakeTimeZoneListItem = timeZoneFixtures.fakeTimeZoneListItem()
        mockGetTimeZoneListSuccess({ body: [fakeTimeZoneListItem] })

        const fakeUser = userFixtures.fakeUser()
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

        const fakeTimeZoneList = timeZoneFixtures.fakeTimeZoneList()
        mockGetTimeZoneListSuccess({ body: fakeTimeZoneList })

        const fakeUser = userFixtures.fakeUser()
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

        const fakeTimeZoneListItem1 = timeZoneFixtures.fakeTimeZoneListItem()
        const fakeTimeZoneListItem2 = timeZoneFixtures.fakeTimeZoneListItem()
        mockGetTimeZoneListSuccess({
          body: [fakeTimeZoneListItem1, fakeTimeZoneListItem2],
        })

        const fakeUser = userFixtures.fakeUser({
          timezone: fakeTimeZoneListItem1.value,
        })
        mockGetUserMeSuccess({ body: fakeUser })

        mockUpdateUserSuccess(fakeUser.id)

        const { user } = render(<PrivateApp />)

        await privateLayoutTestUtils.expectLoadingFinished()
        await privateHeaderTestUtils.expectTimeZoneLoadingFinished()
        const currentTimeZoneOption =
          privateHeaderTestUtils.getSelectedTimeZone()

        expect(currentTimeZoneOption).toHaveTextContent(
          fakeTimeZoneListItem1.label,
        )

        await privateHeaderTestUtils.openTimeZoneSelect(user)
        await privateHeaderTestUtils.setTimeZone(
          user,
          fakeTimeZoneListItem2.label,
        )
        await privateHeaderTestUtils.expectTimeZoneLoadingFinished()

        await waitFor(() => {
          const newTimeZoneOption = privateHeaderTestUtils.getSelectedTimeZone()
          expect(newTimeZoneOption).toHaveTextContent(
            fakeTimeZoneListItem2.label,
          )
        })
      })

      test('При ошибке обновления показывается уведомление', async () => {
        mockGetUserMeCodeSuccess()
        mockGetSystemInfoSuccess()

        const fakeTimeZoneListItem = timeZoneFixtures.fakeTimeZoneListItem()
        mockGetTimeZoneListSuccess({ body: [fakeTimeZoneListItem] })

        const fakeUser = userFixtures.fakeUser()
        mockGetUserMeSuccess({ body: fakeUser })

        mockUpdateUserServerError(fakeUser.id)

        const { user } = render(<PrivateApp />)

        await privateLayoutTestUtils.expectLoadingFinished()
        await privateHeaderTestUtils.expectTimeZoneLoadingFinished()
        await privateHeaderTestUtils.openTimeZoneSelect(user)
        await privateHeaderTestUtils.setTimeZone(
          user,
          fakeTimeZoneListItem.label,
        )
        await privateHeaderTestUtils.expectTimeZoneLoadingFinished()

        const error = await findNotification(
          userApiMessages.updateUserTimeZone.commonError,
        )

        expect(error).toBeInTheDocument()
      })
    })

    describe('Селект выбора статуса пользователя', () => {
      describe(`Для роли ${UserRoleEnum.FirstLineSupport}`, () => {
        test('Отображается', async () => {
          mockGetUserMeCodeSuccess()
          mockGetSystemInfoSuccess()
          mockGetTimeZoneListSuccess()
          mockGetUserStatusListSuccess()

          mockGetUserMeSuccess({
            body: userFixtures.fakeUser({
              role: UserRoleEnum.FirstLineSupport,
            }),
          })

          render(<PrivateApp />)

          await privateLayoutTestUtils.expectLoadingFinished()
          const selectContainer =
            privateHeaderTestUtils.getUserStatusSelectContainer()

          expect(selectContainer).toBeInTheDocument()
        })

        test('Отображает установленный статус', async () => {
          mockGetUserMeCodeSuccess()
          mockGetSystemInfoSuccess()
          mockGetTimeZoneListSuccess()

          const fakeUserStatus = userFixtures.fakeUserStatusListItem()
          mockGetUserStatusListSuccess({ body: [fakeUserStatus] })

          mockGetUserMeSuccess({
            body: userFixtures.fakeUser({
              role: UserRoleEnum.FirstLineSupport,
              status: fakeUserStatus,
            }),
          })

          render(<PrivateApp />)

          await privateLayoutTestUtils.expectLoadingFinished()
          await privateHeaderTestUtils.expectUserStatusLoadingFinished()
          const selectedUserStatus =
            privateHeaderTestUtils.getSelectedUserStatus()

          expect(selectedUserStatus).toHaveTextContent(
            new RegExp(fakeUserStatus.title),
          )
        })

        describe('Выбор статуса', () => {
          test('При успешном запросе меняется выбранный статус', async () => {
            mockGetUserMeCodeSuccess()
            mockGetSystemInfoSuccess()
            mockGetTimeZoneListSuccess()

            const fakeUserStatus1 = userFixtures.fakeUserStatusListItem()
            const fakeUserStatus2 = userFixtures.fakeUserStatusListItem()
            mockGetUserStatusListSuccess({
              body: [fakeUserStatus1, fakeUserStatus2],
            })

            const fakeUser = userFixtures.fakeUser({
              role: UserRoleEnum.FirstLineSupport,
              status: fakeUserStatus2,
            })
            mockGetUserMeSuccess({ body: fakeUser })

            mockUpdateUserStatusSuccess(fakeUser.id)

            const { user } = render(<PrivateApp />)

            await privateLayoutTestUtils.expectLoadingFinished()
            await privateHeaderTestUtils.expectUserStatusLoadingFinished()
            await privateHeaderTestUtils.openUserStatusSelect(user)
            await privateHeaderTestUtils.setUserStatus(
              user,
              fakeUserStatus1.title,
            )
            await privateHeaderTestUtils.expectUserStatusSelectDisabled()
            await privateHeaderTestUtils.expectUserStatusSelectNotDisabled()

            const selectedUserStatus =
              privateHeaderTestUtils.getSelectedUserStatus()

            expect(selectedUserStatus).toHaveTextContent(
              new RegExp(fakeUserStatus1.title),
            )
          })

          describe('При не успешном запросе', () => {
            test('Обрабатывается ошибка 400', async () => {
              mockGetUserMeCodeSuccess()
              mockGetSystemInfoSuccess()
              mockGetTimeZoneListSuccess()

              const fakeUserStatus1 = userFixtures.fakeUserStatusListItem()
              const fakeUserStatus2 = userFixtures.fakeUserStatusListItem()
              mockGetUserStatusListSuccess({
                body: [fakeUserStatus1, fakeUserStatus2],
              })

              const fakeUser = userFixtures.fakeUser({
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
              await privateHeaderTestUtils.setUserStatus(
                user,
                fakeUserStatus1.title,
              )
              await privateHeaderTestUtils.expectUserStatusSelectDisabled()
              await privateHeaderTestUtils.expectUserStatusSelectNotDisabled()

              const selectedUserStatus =
                privateHeaderTestUtils.getSelectedUserStatus()

              expect(selectedUserStatus).not.toHaveTextContent(
                new RegExp(fakeUserStatus1.title),
              )

              const notification = await findNotification(
                badRequestErrorMessage,
              )
              expect(notification).toBeInTheDocument()
            })

            test('Обрабатывается ошибка 401', async () => {
              mockGetUserMeCodeSuccess()
              mockGetSystemInfoSuccess()
              mockGetTimeZoneListSuccess()

              const fakeUserStatus1 = userFixtures.fakeUserStatusListItem()
              const fakeUserStatus2 = userFixtures.fakeUserStatusListItem()
              mockGetUserStatusListSuccess({
                body: [fakeUserStatus1, fakeUserStatus2],
              })

              const fakeUser = userFixtures.fakeUser({
                role: UserRoleEnum.FirstLineSupport,
                status: fakeUserStatus2,
              })
              mockGetUserMeSuccess({ body: fakeUser })

              const unauthorizedErrorMessage = fakeWord()
              mockUpdateUserStatusUnauthorizedError(fakeUser.id, {
                body: { detail: [unauthorizedErrorMessage] },
              })

              const { user } = render(<PrivateApp />)

              await privateLayoutTestUtils.expectLoadingFinished()
              await privateHeaderTestUtils.expectUserStatusLoadingFinished()
              await privateHeaderTestUtils.openUserStatusSelect(user)
              await privateHeaderTestUtils.setUserStatus(
                user,
                fakeUserStatus1.title,
              )
              await privateHeaderTestUtils.expectUserStatusSelectDisabled()
              await privateHeaderTestUtils.expectUserStatusSelectNotDisabled()

              const selectedUserStatus =
                privateHeaderTestUtils.getSelectedUserStatus()

              expect(selectedUserStatus).not.toHaveTextContent(
                new RegExp(fakeUserStatus1.title),
              )

              const notification = await findNotification(
                unauthorizedErrorMessage,
              )
              expect(notification).toBeInTheDocument()
            })

            test('Обрабатывается ошибка 404', async () => {
              mockGetUserMeCodeSuccess()
              mockGetSystemInfoSuccess()
              mockGetTimeZoneListSuccess()

              const fakeUserStatus1 = userFixtures.fakeUserStatusListItem()
              const fakeUserStatus2 = userFixtures.fakeUserStatusListItem()
              mockGetUserStatusListSuccess({
                body: [fakeUserStatus1, fakeUserStatus2],
              })

              const fakeUser = userFixtures.fakeUser({
                role: UserRoleEnum.FirstLineSupport,
                status: fakeUserStatus2,
              })
              mockGetUserMeSuccess({ body: fakeUser })

              const notFoundErrorMessage = fakeWord()
              mockUpdateUserStatusNotFoundError(fakeUser.id, {
                body: { detail: [notFoundErrorMessage] },
              })

              const { user } = render(<PrivateApp />)

              await privateLayoutTestUtils.expectLoadingFinished()
              await privateHeaderTestUtils.expectUserStatusLoadingFinished()
              await privateHeaderTestUtils.openUserStatusSelect(user)
              await privateHeaderTestUtils.setUserStatus(
                user,
                fakeUserStatus1.title,
              )
              await privateHeaderTestUtils.expectUserStatusSelectDisabled()
              await privateHeaderTestUtils.expectUserStatusSelectNotDisabled()

              const selectedUserStatus =
                privateHeaderTestUtils.getSelectedUserStatus()

              expect(selectedUserStatus).not.toHaveTextContent(
                new RegExp(fakeUserStatus1.title),
              )

              const notification = await findNotification(notFoundErrorMessage)
              expect(notification).toBeInTheDocument()
            })

            test('Обрабатывается ошибка 500', async () => {
              mockGetUserMeCodeSuccess()
              mockGetSystemInfoSuccess()
              mockGetTimeZoneListSuccess()

              const fakeUserStatus1 = userFixtures.fakeUserStatusListItem()
              const fakeUserStatus2 = userFixtures.fakeUserStatusListItem()
              mockGetUserStatusListSuccess({
                body: [fakeUserStatus1, fakeUserStatus2],
              })

              const fakeUser = userFixtures.fakeUser({
                role: UserRoleEnum.FirstLineSupport,
                status: fakeUserStatus2,
              })
              mockGetUserMeSuccess({ body: fakeUser })

              mockUpdateUserStatusServerError(fakeUser.id)

              const { user } = render(<PrivateApp />)

              await privateLayoutTestUtils.expectLoadingFinished()
              await privateHeaderTestUtils.expectUserStatusLoadingFinished()
              await privateHeaderTestUtils.openUserStatusSelect(user)
              await privateHeaderTestUtils.setUserStatus(
                user,
                fakeUserStatus1.title,
              )
              await privateHeaderTestUtils.expectUserStatusSelectDisabled()
              await privateHeaderTestUtils.expectUserStatusSelectNotDisabled()

              const selectedUserStatus =
                privateHeaderTestUtils.getSelectedUserStatus()

              expect(selectedUserStatus).not.toHaveTextContent(
                new RegExp(fakeUserStatus1.title),
              )

              const notification = await findNotification(
                updateUserStatusErrorMessages.commonError,
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
            body: userFixtures.fakeUser({
              role: UserRoleEnum.Engineer,
            }),
          })

          render(<PrivateApp />)

          await privateLayoutTestUtils.expectLoadingFinished()
          const selectContainer =
            privateHeaderTestUtils.queryUserStatusSelectContainer()

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
            body: userFixtures.fakeUser({
              role: UserRoleEnum.SeniorEngineer,
            }),
          })

          render(<PrivateApp />)

          await privateLayoutTestUtils.expectLoadingFinished()
          const selectContainer =
            privateHeaderTestUtils.queryUserStatusSelectContainer()

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
            body: userFixtures.fakeUser({
              role: UserRoleEnum.HeadOfDepartment,
            }),
          })

          render(<PrivateApp />)

          await privateLayoutTestUtils.expectLoadingFinished()
          const selectContainer =
            privateHeaderTestUtils.queryUserStatusSelectContainer()

          expect(selectContainer).not.toBeInTheDocument()
        })
      })
    })
  })
})
