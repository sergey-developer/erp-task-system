import { screen, within } from '@testing-library/react'

export const getButton = (name: string | RegExp) =>
  screen.getByRole('button', { name })

export const findButton = async (name: string | RegExp) =>
  screen.findByRole('button', { name })

export const getButtonIn = (container: HTMLElement, name: string | RegExp) =>
  within(container).getByRole('button', { name })
