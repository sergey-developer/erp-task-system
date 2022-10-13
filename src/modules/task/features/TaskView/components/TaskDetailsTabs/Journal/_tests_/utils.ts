import {
  screen,
  waitFinishLoadingByButton,
  waitFinishLoadingBySpinner,
  waitStartLoadingByButton,
  waitStartLoadingBySpinner,
} from '_tests_/utils'
import { UserEvent } from '@testing-library/user-event/setup/setup'

export const waitStartLoadingJournal =
  waitStartLoadingBySpinner('spinner-journal')

export const waitFinishLoadingJournal =
  waitFinishLoadingBySpinner('spinner-journal')

export const getDownloadButton = () =>
  screen.getByTestId('journal-btn-download')

export const userClickDownloadButton = async (
  user: UserEvent,
): Promise<HTMLElement> => {
  const button = getDownloadButton()
  await user.click(button)
  return button
}

export const waitStartLoadingJournalCsv = waitStartLoadingByButton
export const waitFinishLoadingJournalCsv = waitFinishLoadingByButton
