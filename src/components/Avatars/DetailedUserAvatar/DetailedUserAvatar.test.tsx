import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import pick from 'lodash/pick'

import { CommonRouteEnum } from 'configs/routes'

import { AuthRouteEnum } from 'modules/auth/constants/routes'
import ChangePasswordPage from 'modules/auth/pages/ChangePasswordPage'
import { testUtils as changePasswordPageTestUtils } from 'modules/auth/pages/ChangePasswordPage/ChangePasswordPage.test'
import { getFullUserName } from 'modules/user/utils'

import userFixtures from '_tests_/fixtures/user'
import {
  mockGetTimeZoneListSuccess,
  mockGetUserMeCodeSuccess,
  mockGetUserMeSuccess,
} from '_tests_/mocks/api'
import { linkTestUtils, render, renderWithRouter, setupApiTests } from '_tests_/utils'

import DetailedUserAvatar, { DetailedUserAvatarProps } from './index'

const props: Readonly<Pick<DetailedUserAvatarProps, 'profile'>> = {
  profile: userFixtures.user(),
}

const getUserAvatarContainer = () => screen.getByTestId('detailed-user-avatar')

const getPopover = () => screen.getByRole('tooltip')
const findPopover = () => screen.findByRole('tooltip')

const openPopover = async (user: UserEvent) => {
  const container = getUserAvatarContainer()
  await user.hover(container)
  return findPopover()
}

const getChangePasswordLink = () => linkTestUtils.getLinkIn(getPopover(), 'Сменить пароль')

const clickChangePasswordLink = async (user: UserEvent) => {
  const link = getChangePasswordLink()
  await user.click(link)
}

export const testUtils = {
  getUserAvatarContainer,

  getPopover,
  openPopover,

  getChangePasswordLink,
  clickChangePasswordLink,
}

setupApiTests()

describe('Детальный аватар пользователя', () => {
  test('Заголовок отображается', async () => {
    const { user } = render(<DetailedUserAvatar {...props} />)

    const popover = await testUtils.openPopover(user)
    const title = within(popover).getByText(
      getFullUserName(pick(props.profile, 'firstName', 'lastName', 'middleName')),
    )

    expect(title).toBeInTheDocument()
  })

  test('Email отображается', async () => {
    const { user } = render(<DetailedUserAvatar {...props} />)

    const popover = await testUtils.openPopover(user)
    const title = within(popover).getByText('Email:')
    const value = within(popover).getByText(props.profile.email)

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Должность отображается', async () => {
    const { user } = render(<DetailedUserAvatar {...props} />)

    const popover = await testUtils.openPopover(user)
    const title = within(popover).getByText('Должность:')
    const value = within(popover).getByText(props.profile.position!.title)

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  describe('Сменить пароль', () => {
    test('Ссылка отображается', async () => {
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

      const { user } = renderWithRouter(
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
