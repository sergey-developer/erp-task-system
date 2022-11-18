import {
  buttonTestUtils,
  loadingFinishedByButton,
  loadingFinishedBySpinner,
  loadingStartedByButton,
  loadingStartedBySpinner,
} from '_tests_/utils'
import { screen } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

export const getTaskJournal = () => screen.getByTestId('task-journal')

export const getDownloadButton = () =>
  screen.getByTestId('journal-btn-download')

export const getReloadButton = () =>
  buttonTestUtils.getButtonIn(getTaskJournal(), 'sync')

export const userClickReloadButton = async (user: UserEvent) => {
  const button = getReloadButton()
  await user.click(button)
  return button
}

export const userClickDownloadButton = async (
  user: UserEvent,
): Promise<HTMLElement> => {
  const button = getDownloadButton()
  await user.click(button)
  return button
}

export const journalLoadingStarted = loadingStartedBySpinner('journal-spinner')

export const journalLoadingFinished =
  loadingFinishedBySpinner('journal-spinner')

export const journalCsvLoadingStarted = loadingStartedByButton
export const journalCsvLoadingFinished = loadingFinishedByButton
