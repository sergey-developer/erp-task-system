import { screen } from '@testing-library/react'

export const getIconByName = (name: string) => screen.getByRole('img', { name })
