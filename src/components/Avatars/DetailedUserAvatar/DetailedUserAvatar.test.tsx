import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { CommonRouteEnum } from 'configs/routes'

import { AuthRouteEnum } from 'modules/auth/constants/routes'
import ChangePasswordPage from 'modules/auth/pages/ChangePasswordPage'
import { testUtils as changePasswordPageTestUtils } from 'modules/auth/pages/ChangePasswordPage/ChangePasswordPage.test'

import userFixtures from '_tests_/fixtures/user'
import {
  mockGetTimeZoneListSuccess,
  mockGetUserMeCodeSuccess,
  mockGetUserMeSuccess,
} from '_tests_/mocks/api'
import { render, renderInRoute_latest, setupApiTests } from '_tests_/utils'

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

      const { user } = renderInRoute_latest(
        [
          { path: CommonRouteEnum.Home, element: <DetailedUserAvatar {...props} /> },
          { path: AuthRouteEnum.ChangePassword, element: <ChangePasswordPage /> },
        ],
        { initialEntries: [CommonRouteEnum.Home], initialIndex: 0 },
      )

      await testUtils.openPopover(user)
      await testUtils.clickChangePasswordLink(user)

      const changePasswordPage = changePasswordPageTestUtils.getContainer()
      expect(changePasswordPage).toBeInTheDocument()
    })
  })
})
