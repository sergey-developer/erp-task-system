import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { MaybeNull } from 'shared/types/utils'

import {
  clickSelectOption,
  expectLoadingFinishedBySelect,
  expectLoadingStartedBySelect,
  expectSelectDisabled,
  expectSelectNotDisabled,
  getAllSelectOption,
  getSelect,
  getSelectedOption,
  openSelect,
  render,
} from '_tests_/utils'

import PrivateHeader from './index'

const getContainer = () => screen.getByTestId('private-header')

// timezone
const getTimeZoneSelectContainer = () =>
  within(getContainer()).getByTestId('timezone-select')

const getTimeZoneSelect = (opened?: boolean) =>
  getSelect(getTimeZoneSelectContainer(), {
    name: 'Временная зона',
    expanded: opened,
  })

const getSelectedTimeZone = () =>
  getSelectedOption(getTimeZoneSelectContainer())

const openTimeZoneSelect = (user: UserEvent) =>
  openSelect(user, getTimeZoneSelectContainer())

const setTimeZone = clickSelectOption

const getAllTimeZoneOption = getAllSelectOption

const expectTimeZoneLoadingStarted = () =>
  expectLoadingStartedBySelect(getTimeZoneSelectContainer())

const expectTimeZoneLoadingFinished = () =>
  expectLoadingFinishedBySelect(getTimeZoneSelectContainer())

// user status
const getUserStatusSelectContainer = (): HTMLElement =>
  within(getContainer()).getByTestId('user-status-select')

const queryUserStatusSelectContainer = (): MaybeNull<HTMLElement> =>
  within(getContainer()).queryByTestId('user-status-select')

const getUserStatusSelect = (opened?: boolean) =>
  getSelect(getUserStatusSelectContainer(), {
    name: 'Статус пользователя',
    expanded: opened,
  })

const getSelectedUserStatus = () =>
  getSelectedOption(getUserStatusSelectContainer())

const openUserStatusSelect = (user: UserEvent) =>
  openSelect(user, getUserStatusSelectContainer())

const setUserStatus = clickSelectOption

const getAllUserStatusOption = getAllSelectOption

const expectUserStatusLoadingStarted = () =>
  expectLoadingStartedBySelect(getUserStatusSelectContainer())

const expectUserStatusLoadingFinished = () =>
  expectLoadingFinishedBySelect(getUserStatusSelectContainer())

const expectUserStatusSelectDisabled = () =>
  expectSelectDisabled(getUserStatusSelectContainer())

const expectUserStatusSelectNotDisabled = () =>
  expectSelectNotDisabled(getUserStatusSelectContainer())

export const testUtils = {
  getContainer,

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

describe('PrivateHeader', () => {
  describe('Селект выбора временной зоны', () => {
    test('Отображается', () => {
      render(<PrivateHeader />)

      const field = testUtils.getTimeZoneSelect()

      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
    })
  })
})
