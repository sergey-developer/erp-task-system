import { userApiMessages } from 'modules/user/constants/errorMessages'

import { testUtils as privateHeaderTestUtils } from 'components/Header/PrivateHeader/PrivateHeader.test'
import { testUtils as privateLayoutTestUtils } from 'components/Layout/PrivateLayout/PrivateLayout.test'

import timeZoneFixtures from 'fixtures/timeZone'
import userFixtures from 'fixtures/user'

import {
  mockGetTimeZoneListSuccess,
  mockGetUserMeCodeSuccess,
  mockGetUserMeSuccess,
  mockUpdateUserServerError,
  mockUpdateUserSuccess,
} from '_tests_/mocks/api'
import {
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

      test('Отображается временная зона пользователя', async () => {
        mockGetUserMeCodeSuccess()

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

      test('Можно обновить значение', async () => {
        mockGetUserMeCodeSuccess()

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
          await privateHeaderTestUtils.getSelectedTimeZone()

        expect(currentTimeZoneOption).toHaveTextContent(
          fakeTimeZoneListItem1.label,
        )

        await privateHeaderTestUtils.openTimeZoneSelect(user)
        await privateHeaderTestUtils.setTimeZone(
          user,
          fakeTimeZoneListItem2.label,
        )
        await privateHeaderTestUtils.expectTimeZoneLoadingFinished()

        const newTimeZoneOption =
          await privateHeaderTestUtils.getSelectedTimeZone()

        expect(newTimeZoneOption).toHaveTextContent(fakeTimeZoneListItem2.label)
      })

      test('При ошибке обновления показывается уведомление', async () => {
        mockGetUserMeCodeSuccess()

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
          userApiMessages.updateUser.commonError,
        )

        expect(error).toBeInTheDocument()
      })
    })
  })
})
