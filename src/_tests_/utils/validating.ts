import { waitFor } from '@testing-library/react'

const validatingStatusClass = 'ant-form-item-is-validating'

export const waitStartValidating = async (field: HTMLElement) => {
  await waitFor(() => {
    expect(field).toHaveClass(validatingStatusClass)
  })
}

export const waitFinishValidating = async (field: HTMLElement) => {
  await waitFor(() => {
    expect(field).not.toHaveClass(validatingStatusClass)
  })
}
