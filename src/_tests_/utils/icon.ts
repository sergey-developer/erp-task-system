import { screen } from './index'

export const getIconByName = (name: string) => screen.getByRole('img', { name })

export const queryIconByName = (name: string) =>
  screen.queryByRole('img', { name })
