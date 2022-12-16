import { within } from '@testing-library/react'

const getContainerIn = (container: HTMLElement) =>
  within(container).getByTestId('task-assignee')

export const testUtils = {
  getContainerIn,
}

describe('Исполнитель задачи', () => {
  test('Пока нет тестов', () => {})
})
