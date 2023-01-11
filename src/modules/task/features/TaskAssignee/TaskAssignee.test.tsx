import { screen, within } from '@testing-library/react'

const getContainer = () => screen.getByTestId('task-assignee')

const getContainerIn = (container: HTMLElement) =>
  within(container).getByTestId('task-assignee')

const queryContainerIn = (container: HTMLElement) =>
  within(container).queryByTestId('task-assignee')

export const testUtils = {
  getContainer,
  getContainerIn,
  queryContainerIn,
}

describe('Исполнитель задачи', () => {
  test('Пока нет тестов', () => {})
})
