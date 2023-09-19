import { waitFor } from '@testing-library/react'

const cardLoadingClass = 'ant-card-loading'

const expectLoadingStarted = async (card: HTMLElement) => {
  await waitFor(() => {
    expect(card).toHaveClass(cardLoadingClass)
  })
}

const expectLoadingNotStarted = (card: HTMLElement) => {
  expect(card).not.toHaveClass(cardLoadingClass)
}

const expectLoadingFinished = async (card: HTMLElement) => {
  await waitFor(() => {
    expect(card).not.toHaveClass(cardLoadingClass)
  })
}

const utils = {
  expectLoadingStarted,
  expectLoadingNotStarted,
  expectLoadingFinished,
}

export default utils;
