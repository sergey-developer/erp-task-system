import { screen, waitFor, within } from '@testing-library/react'

import { iconTestUtils } from './index'

const getIconByName = (name: string) => screen.getByRole('img', { name })

const getIconByNameIn = (container: HTMLElement, name: string) =>
  within(container).getByRole('img', { name })

const queryIconByNameIn = (container: HTMLElement, name: string) =>
  within(container).queryByRole('img', { name })

const findIconByNameIn = (container: HTMLElement, name: string) =>
  within(container).findByRole('img', { name })

const expectLoadingStartedIn = async (container: HTMLElement) => {
  expect(await iconTestUtils.findIconByNameIn(container, 'loading')).toBeInTheDocument()
}

const expectLoadingFinishedIn = async (container: HTMLElement) => {
  await waitFor(() => {
    expect(iconTestUtils.queryIconByNameIn(container, 'loading')).not.toBeInTheDocument()
  })
}

const utils = {
  getIconByName,
  getIconByNameIn,
  queryIconByNameIn,
  findIconByNameIn,
  expectLoadingStartedIn,
  expectLoadingFinishedIn,
}

export default utils
