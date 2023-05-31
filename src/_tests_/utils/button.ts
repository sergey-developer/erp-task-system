import { within } from '@testing-library/react'

export const findButtonIn = async (
  container: HTMLElement,
  name: string | RegExp,
) => within(container).findByRole('button', { name })

export const getButtonIn = (container: HTMLElement, name: string | RegExp) =>
  within(container).getByRole('button', { name })

export const getAllButtonIn = (container: HTMLElement, name: string | RegExp) =>
  within(container).getAllByRole('button', { name })

export const queryButtonIn = (container: HTMLElement, name: string | RegExp) =>
  within(container).queryByRole('button', { name })
