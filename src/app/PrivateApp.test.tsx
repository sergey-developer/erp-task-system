import { testUtils as privateHeaderTestUtils } from 'components/Header/PrivateHeader/PrivateHeader.test'
import { testUtils as privateLayoutTestUtils } from 'components/Layout/PrivateLayout/PrivateLayout.test'

import timeZoneFixtures from 'fixtures/timeZone'
import userFixtures from 'fixtures/user'

import {
  mockGetTimeZoneListSuccess,
  mockGetUserMeSuccess,
} from '_tests_/mocks/api'
import { render, setupApiTests } from '_tests_/utils'

import PrivateApp from './PrivateApp'

setupApiTests()

describe('Private app', () => {
  describe('Private header', () => {
    describe('Time zone', () => {
      test('Отображается состояние загрузки во время загрузки временных зон', async () => {
        mockGetTimeZoneListSuccess({
          body: [timeZoneFixtures.fakeTimeZoneListItem()],
        })

        mockGetUserMeSuccess({ body: userFixtures.fakeUser() })

        render(<PrivateApp />)

        await privateLayoutTestUtils.expectLoadingFinished()
        await privateHeaderTestUtils.expectTimeZoneLoadingStarted()
      })

      test('Отображается временная зона пользователя из профиля', async () => {
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
    })
  })
})
