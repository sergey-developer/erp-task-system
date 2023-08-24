import { screen } from '@testing-library/react'

const getContainer = () => screen.getByTestId('equipment-list-page')

export const testUtils = {
  getContainer,
}

test.todo('Страница списка оборудования')
