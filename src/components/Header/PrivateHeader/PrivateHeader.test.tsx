import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import {
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

const getAllTimeZoneOption = getAllSelectOption

const expectTimeZoneLoadingStarted = () =>
  expectLoadingStartedBySelect(getTimeZoneSelectContainer())

const expectTimeZoneLoadingFinished = () =>
  expectLoadingFinishedBySelect(getTimeZoneSelectContainer())

export const testUtils = {
  getContainer,

  getTimeZoneSelectContainer,
  getTimeZoneSelect,
  getSelectedTimeZone,
  openTimeZoneSelect,
  getAllTimeZoneOption,
  expectTimeZoneLoadingStarted,
  expectTimeZoneLoadingFinished,
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
