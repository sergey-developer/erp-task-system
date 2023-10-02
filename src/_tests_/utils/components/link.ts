import { within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

const getLinkIn = (container: HTMLElement, name: string) =>
  within(container).getByRole('link', { name })

const queryLinkIn = (container: HTMLElement, name: string) =>
  within(container).queryByRole('link', { name })

const clickLinkIn = async (
  container: HTMLElement,
  user: UserEvent,
  name: string,
) => {
  const link = getLinkIn(container, name)
  await user.click(link)
  return link
}

const linkUtils = {
  getLinkIn,
  queryLinkIn,
  clickLinkIn,
}

export default linkUtils
