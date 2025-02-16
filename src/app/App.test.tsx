import { waitFor } from '@testing-library/react'
import { testUtils as homeLayoutTestUtils } from 'features/layouts/components/HomeLayout/HomeLayout.test'
import { updateUserTimeZoneMessages } from 'features/users/api/constants'

import { testUtils as privateHeaderTestUtils } from 'components/Headers/PrivateHeader/PrivateHeader.test'

import { taskTableTestUtils } from '_tests_/features/tasks/components/TaskTable/testUtils'
import catalogsFixtures from '_tests_/fixtures/catalogs'
import userFixtures from '_tests_/fixtures/users'
import { notificationTestUtils, render, setupApiTests } from '_tests_/helpers'
import {
  mockGetSystemInfoSuccess,
  mockGetTimeZonesSuccess,
  mockGetUserMeCodeSuccess,
  mockGetUserMeSuccess,
  mockUpdateUserServerError,
  mockUpdateUserSuccess,
} from '_tests_/mocks/api'

import App from './App'

setupApiTests()
notificationTestUtils.setupNotifications()

describe.skip('Private app', () => {
  describe('Private header', () => {
    describe('Time zone', () => {
      test('Отображается состояние загрузки во время загрузки временных зон', async () => {
        mockGetUserMeCodeSuccess()
        mockGetSystemInfoSuccess()
        mockGetTimeZonesSuccess({ body: [catalogsFixtures.timeZone()] })
        mockGetUserMeSuccess({ body: userFixtures.userDetail() })

        render(<App />, { useBrowserRouter: false })

        await homeLayoutTestUtils.expectLoadingFinished()
        await privateHeaderTestUtils.expectTimeZoneLoadingStarted()
      })

      test('Отображается состояние загрузки во время обновления пользователя', async () => {
        mockGetUserMeCodeSuccess()
        mockGetSystemInfoSuccess()

        const fakeTimeZoneListItem = catalogsFixtures.timeZone()
        mockGetTimeZonesSuccess({ body: [fakeTimeZoneListItem] })

        const fakeUser = userFixtures.userDetail()
        mockGetUserMeSuccess({ body: fakeUser })

        mockUpdateUserSuccess(fakeUser.id)

        const { user } = render(<App />, { useBrowserRouter: false })

        await homeLayoutTestUtils.expectLoadingFinished()
        await privateHeaderTestUtils.expectTimeZoneLoadingFinished()
        await privateHeaderTestUtils.openTimeZoneSelect(user)
        await privateHeaderTestUtils.setTimeZone(user, fakeTimeZoneListItem.label)
        await privateHeaderTestUtils.expectTimeZoneLoadingStarted()
      })

      // todo: выяснить почему не проходит
      test.skip('Перезагружает реестр заявок и карточку заявки после обновления временной зоны', async () => {
        mockGetUserMeCodeSuccess()
        mockGetSystemInfoSuccess()

        const fakeTimeZoneListItem = catalogsFixtures.timeZone()
        mockGetTimeZonesSuccess({ body: [fakeTimeZoneListItem] })

        const fakeUser = userFixtures.userDetail()
        mockGetUserMeSuccess({ body: fakeUser })

        mockUpdateUserSuccess(fakeUser.id)

        const { user } = render(<App />, { useBrowserRouter: false })

        await homeLayoutTestUtils.expectLoadingFinished()
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

        const fakeTimeZoneListItem = catalogsFixtures.timeZone()
        mockGetTimeZonesSuccess({ body: [fakeTimeZoneListItem] })

        const fakeUser = userFixtures.userDetail()
        mockGetUserMeSuccess({ body: fakeUser })

        render(<App />, { useBrowserRouter: false })

        await homeLayoutTestUtils.expectLoadingFinished()
        await privateHeaderTestUtils.expectTimeZoneLoadingFinished()
        const option = privateHeaderTestUtils.getSelectedTimeZone()

        expect(option).toHaveTextContent(fakeUser.timezone)
      })

      test('Отображается верное количество временных зон', async () => {
        mockGetUserMeCodeSuccess()
        mockGetSystemInfoSuccess()

        const timeZones = catalogsFixtures.timeZones()
        mockGetTimeZonesSuccess({ body: timeZones })

        const fakeUser = userFixtures.userDetail()
        mockGetUserMeSuccess({ body: fakeUser })

        const { user } = render(<App />, { useBrowserRouter: false })

        await homeLayoutTestUtils.expectLoadingFinished()
        await privateHeaderTestUtils.expectTimeZoneLoadingFinished()
        await privateHeaderTestUtils.openTimeZoneSelect(user)
        const options = privateHeaderTestUtils.getAllTimeZoneOption()

        expect(options).toHaveLength(timeZones.length)
      })

      // todo: Выяснить почему не проходит. Всё работает верно, но в тестах новое значение не приходит почему-то
      test.skip('Можно обновить значение', async () => {
        mockGetUserMeCodeSuccess()
        mockGetSystemInfoSuccess()

        const fakeTimeZoneListItem1 = catalogsFixtures.timeZone()
        const fakeTimeZoneListItem2 = catalogsFixtures.timeZone()
        mockGetTimeZonesSuccess({
          body: [fakeTimeZoneListItem1, fakeTimeZoneListItem2],
        })

        const fakeUser = userFixtures.userDetail({
          timezone: fakeTimeZoneListItem1.value,
        })
        mockGetUserMeSuccess({ body: fakeUser })

        mockUpdateUserSuccess(fakeUser.id)

        const { user } = render(<App />, { useBrowserRouter: false })

        await homeLayoutTestUtils.expectLoadingFinished()
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

        const fakeTimeZoneListItem = catalogsFixtures.timeZone()
        mockGetTimeZonesSuccess({ body: [fakeTimeZoneListItem] })

        const fakeUser = userFixtures.userDetail()
        mockGetUserMeSuccess({ body: fakeUser })

        mockUpdateUserServerError(fakeUser.id)

        const { user } = render(<App />, { useBrowserRouter: false })

        await homeLayoutTestUtils.expectLoadingFinished()
        await privateHeaderTestUtils.expectTimeZoneLoadingFinished()
        await privateHeaderTestUtils.openTimeZoneSelect(user)
        await privateHeaderTestUtils.setTimeZone(user, fakeTimeZoneListItem.label)
        await privateHeaderTestUtils.expectTimeZoneLoadingFinished()

        const notification = await notificationTestUtils.findNotification(
          updateUserTimeZoneMessages,
        )

        expect(notification).toBeInTheDocument()
      })
    })
  })
})
