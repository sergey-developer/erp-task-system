import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { CommonRouteEnum } from 'configs/routes'

import { AuthRouteEnum } from 'modules/auth/constants/routes'

import { testUtils as privateLayoutTestUtils } from 'components/Layouts/HomeLayout/HomeLayout.test'

import PrivateApp from 'app/App'

import userFixtures from '_tests_/fixtures/user'
import {
  mockGetTimeZoneListSuccess,
  mockGetUserMeCodeSuccess,
  mockGetUserMeSuccess,
} from '_tests_/mocks/api'
import { render, renderInRoute, setupApiTests } from '_tests_/utils'

import DetailedUserAvatar, { DetailedUserAvatarProps } from './index'

const props: Readonly<Pick<DetailedUserAvatarProps, 'profile'>> = {
  profile: userFixtures.user(),
}

const getContainer = () => screen.getByTestId('detailed-user-avatar')

const getPopoverContent = (): HTMLElement =>
  screen.getByTestId('detailed-user-avatar-popover-content')

const findPopoverContent = (): Promise<HTMLElement> =>
  screen.findByTestId('detailed-user-avatar-popover-content')

const openPopover = async (user: UserEvent) => {
  const container = getContainer()
  await user.hover(container)
  await findPopoverContent()
}

const getChangePasswordLink = () =>
  within(getPopoverContent()).getByRole('link', { name: 'Сменить пароль' })

const clickChangePasswordLink = async (user: UserEvent) => {
  const link = getChangePasswordLink()
  await user.click(link)
}

export const testUtils = {
  getContainer,

  findPopoverContent,
  openPopover,

  getChangePasswordLink,
  clickChangePasswordLink,
}

setupApiTests()

describe('Детальный аватар пользователя', () => {
  describe('Сменить пароль', () => {
    test('Ссылка отображается корректно', async () => {
      const { user } = render(<DetailedUserAvatar {...props} />)

      await testUtils.openPopover(user)
      const changePasswordLink = testUtils.getChangePasswordLink()

      expect(changePasswordLink).toBeInTheDocument()
      expect(changePasswordLink).toHaveAttribute('href', AuthRouteEnum.ChangePassword)
    })

    test('При нажатии переходит на страницу смены пароля', async () => {
      mockGetUserMeCodeSuccess()
      mockGetTimeZoneListSuccess()
      mockGetUserMeSuccess({ body: userFixtures.user() })

      const { user, checkRouteChanged, getCurrentRoute } = renderInRoute(
        <PrivateApp />,
        CommonRouteEnum.DesktopTaskList,
      )

      await privateLayoutTestUtils.expectLoadingStarted()
      await privateLayoutTestUtils.expectLoadingFinished()
      await testUtils.openPopover(user)
      await testUtils.clickChangePasswordLink(user)

      expect(checkRouteChanged()).toBe(true)
      expect(getCurrentRoute()).toBe(AuthRouteEnum.ChangePassword)
    })
  })
})
