import { screen, within } from '@testing-library/react'

export const getIconByName = (name: string) => screen.getByRole('img', { name })

export const queryIconByNameIn = (container: HTMLElement, name: string) =>
  within(container).queryByRole('img', { name })

export const findIconByNameIn = (container: HTMLElement, name: string) =>
  within(container).findByRole('img', { name })
