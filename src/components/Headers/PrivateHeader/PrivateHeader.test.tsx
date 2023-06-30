import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import {
  clickSelectOption,
  expectLoadingFinishedBySelect,
  expectLoadingStartedBySelect,
  getAllSelectOption,
  getSelect,
  getSelectedOption,
  openSelect,
  render,
} from '_tests_/utils'

import PrivateHeader from './index'

const getContainer = () => screen.getByTestId('private-header')

// nav menu
const getNavMenuContainer = () => within(getContainer()).getByRole('menu')

const getNavMenuItem = (name: string) =>
  within(getNavMenuContainer()).getByText(name)

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

export const testUtils = {
  getContainer,

  getNavMenuContainer,
  getNavMenuItem,

  getTimeZoneSelectContainer,
  getTimeZoneSelect,
  getSelectedTimeZone,
  openTimeZoneSelect,
  setTimeZone,
  getAllTimeZoneOption,
  expectTimeZoneLoadingStarted,
  expectTimeZoneLoadingFinished,
}

describe('PrivateHeader', () => {
  describe('Меню навигации', () => {
    // todo: рендерить privateapp и протестировать
    test.skip('Отображается корректно', () => {
      render(<PrivateHeader />)
      expect(testUtils.getNavMenuItem('Отчёт по ФН')).toBeInTheDocument()
      expect(testUtils.getNavMenuContainer()).toBeInTheDocument()
    })
  })

  describe('Селект выбора временной зоны', () => {
    test('Отображается', () => {
      render(<PrivateHeader />)

      const field = testUtils.getTimeZoneSelect()

      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
    })
  })
})
