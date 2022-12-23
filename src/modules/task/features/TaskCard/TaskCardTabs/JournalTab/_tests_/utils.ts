import {
  getButtonIn,
  loadingFinishedByButton,
  loadingFinishedBySpinner,
  loadingStartedByButton,
  loadingStartedBySpinner,
} from '_tests_/utils'
import { screen } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

const getTaskJournal = () => screen.getByTestId('task-journal')

const getDownloadButton = () => screen.getByTestId('journal-btn-download')

const getReloadButton = () => getButtonIn(getTaskJournal(), 'sync')

const userClickReloadButton = async (user: UserEvent) => {
  const button = getReloadButton()
  await user.click(button)
  return button
}

const userClickDownloadButton = async (
  user: UserEvent,
): Promise<HTMLElement> => {
  const button = getDownloadButton()
  await user.click(button)
  return button
}

const journalLoadingStarted = loadingStartedBySpinner('journal-spinner')

const journalLoadingFinished = loadingFinishedBySpinner('journal-spinner')

const journalCsvLoadingStarted = loadingStartedByButton
const journalCsvLoadingFinished = loadingFinishedByButton

const utils = {
  getTaskJournal,
  getDownloadButton,
  getReloadButton,
  userClickReloadButton,
  userClickDownloadButton,
  journalLoadingStarted,
  journalLoadingFinished,
  journalCsvLoadingStarted,
  journalCsvLoadingFinished,
}

export default utils
