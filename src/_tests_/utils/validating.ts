import { waitFor } from '@testing-library/react'

const validatingStatusClass = 'ant-form-item-is-validating'

export const validatingStarted = async (field: HTMLElement) => {
  await waitFor(() => {
    expect(field).toHaveClass(validatingStatusClass)
  })
}

export const validatingFinished = async (field: HTMLElement) => {
  await waitFor(() => {
    expect(field).not.toHaveClass(validatingStatusClass)
  })
}
