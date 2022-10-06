import { screen } from './index'

export const getIconByName = (name: string) => screen.getByRole('img', { name })
