import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import { TaskJournalSourceEnum } from 'features/tasks/api/constants'

import {
  buttonTestUtils,
  radioButtonTestUtils,
  selectTestUtils,
  spinnerTestUtils,
} from '_tests_/helpers'

import { TestIdsEnum } from './constants'

const getContainer = () => screen.getByTestId(TestIdsEnum.TaskJournal)

// filters
const getSourceFilter = (type: TaskJournalSourceEnum) =>
  radioButtonTestUtils.getRadioButtonIn(getContainer(), type)
const clickSourceFilter = async (user: UserEvent, type: TaskJournalSourceEnum) => {
  const filter = getSourceFilter(type)
  await user.click(filter)
}

const getTypeFilterSelect = () => within(getContainer()).getByTestId(TestIdsEnum.TypeFilterSelect)
const getTypeFilterSelectInput = () => selectTestUtils.getSelect(getTypeFilterSelect())
const openTypeFilter = (user: UserEvent) => selectTestUtils.openSelect(user, getTypeFilterSelect())
const setTypeFilter = selectTestUtils.clickSelectOption

// reload button
const getReloadButton = () => buttonTestUtils.getButtonIn(getContainer(), 'sync')
const clickReloadButton = async (user: UserEvent) => {
  const button = getReloadButton()
  await user.click(button)
  return button
}

// download button
const getDownloadButton = () => screen.getByTestId(TestIdsEnum.JournalBtnDownload)
const clickDownloadButton = async (user: UserEvent): Promise<HTMLElement> => {
  const button = getDownloadButton()
  await user.click(button)
  return button
}

const expectJournalLoadingStarted = spinnerTestUtils.expectLoadingStarted(
  TestIdsEnum.TaskJournalLoading,
)
const expectJournalLoadingFinished = spinnerTestUtils.expectLoadingFinished(
  TestIdsEnum.TaskJournalLoading,
)

const expectJournalCsvLoadingStarted = buttonTestUtils.expectLoadingStarted
const expectJournalCsvLoadingFinished = buttonTestUtils.expectLoadingFinished

export const journalTabTestUtils = {
  getContainer,

  getSourceFilter,
  clickSourceFilter,

  getTypeFilterSelect,
  getTypeFilterSelectInput,
  openTypeFilter,
  setTypeFilter,

  getDownloadButton,
  clickDownloadButton,

  getReloadButton,
  clickReloadButton,

  expectJournalLoadingStarted,
  expectJournalLoadingFinished,

  expectJournalCsvLoadingStarted,
  expectJournalCsvLoadingFinished,
}
