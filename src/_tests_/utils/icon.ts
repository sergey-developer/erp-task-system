import { screen, within } from '@testing-library/react'

export const getIconByName = (name: string) => screen.getByRole('img', { name })

export const getIconByNameIn = (container: HTMLElement, name: string) =>
  within(container).getByRole('img', { name })

export const queryIconByNameIn = (container: HTMLElement, name: string) =>
  within(container).queryByRole('img', { name })
