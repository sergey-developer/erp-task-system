import { testUtils as privateHeaderTestUtils } from 'components/Header/PrivateHeader/PrivateHeader.test'
import { testUtils as privateLayoutTestUtils } from 'components/Layout/PrivateLayout/PrivateLayout.test'

import timeZoneFixtures from 'fixtures/timeZone'

import {
  mockGetTimeZoneListSuccess,
  mockGetUserProfileSuccess,
} from '_tests_/mocks/api'
import { render, setupApiTests } from '_tests_/utils'

import userFixtures from '../fixtures/user'
import PrivateApp from './PrivateApp'

setupApiTests()

describe('Private app', () => {
  describe('Private header', () => {
    describe('Time zone', () => {
      test('Отображается состояние загрузки во время загрузки временных зон', async () => {
        mockGetTimeZoneListSuccess({
          body: [timeZoneFixtures.fakeTimeZoneListItem()],
        })

        mockGetUserProfileSuccess({ body: userFixtures.fakeUserProfile() })

        render(<PrivateApp />)

        await privateLayoutTestUtils.expectLoadingFinished()
        await privateHeaderTestUtils.expectTimeZoneLoadingStarted()
      })

      test('Отображается временная зона пользователя из профиля', async () => {
        const fakeTimeZoneListItem = timeZoneFixtures.fakeTimeZoneListItem()
        mockGetTimeZoneListSuccess({ body: [fakeTimeZoneListItem] })

        const fakeUserProfile = userFixtures.fakeUserProfile()
        mockGetUserProfileSuccess({ body: fakeUserProfile })

        render(<PrivateApp />)

        await privateLayoutTestUtils.expectLoadingFinished()
        await privateHeaderTestUtils.expectTimeZoneLoadingFinished()
        const option = privateHeaderTestUtils.getSelectedTimeZone()

        expect(option).toHaveTextContent(fakeUserProfile.timezone)
      })

      test('Отображается верное количество временных зон', async () => {
        const fakeTimeZoneList = timeZoneFixtures.fakeTimeZoneList()
        mockGetTimeZoneListSuccess({ body: fakeTimeZoneList })

        const fakeUserProfile = userFixtures.fakeUserProfile()
        mockGetUserProfileSuccess({ body: fakeUserProfile })

        const { user } = render(<PrivateApp />)

        await privateLayoutTestUtils.expectLoadingFinished()
        await privateHeaderTestUtils.expectTimeZoneLoadingFinished()
        await privateHeaderTestUtils.openTimeZoneSelect(user)
        const options = privateHeaderTestUtils.getAllTimeZoneOption()

        expect(options).toHaveLength(fakeTimeZoneList.length)
      })
    })
  })
})
