import {
  loadingFinishedByButton,
  loadingFinishedBySpinner,
  loadingStartedByButton,
  loadingStartedBySpinner,
} from '_tests_/utils'
import { screen } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

export const journalLoadingStarted = loadingStartedBySpinner('spinner-journal')

export const journalLoadingFinished =
  loadingFinishedBySpinner('spinner-journal')

export const getDownloadButton = () =>
  screen.getByTestId('journal-btn-download')

export const userClickDownloadButton = async (
  user: UserEvent,
): Promise<HTMLElement> => {
  const button = getDownloadButton()
  await user.click(button)
  return button
}

export const journalCsvLoadingStarted = loadingStartedByButton
export const journalCsvLoadingFinished = loadingFinishedByButton
