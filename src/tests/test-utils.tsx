/**
 * Описание настройки https://testing-library.com/docs/react-testing-library/setup#custom-render
 */

import { ReactElement } from 'react'

import { RenderOptions, render } from '@testing-library/react'
import AppProvider from 'app/AppProvider'

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AppProvider, ...options })

export * from '@testing-library/react'
export { customRender as render }
