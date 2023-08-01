import { screen } from '@testing-library/react'

const getContainer = () => screen.getByTestId('task-list-map-page')

export const testUtils = {
  getContainer,
}

// Чтобы написать тесты нужно найти решение как тестирование карту
test.skip('Страница карты заявок')
