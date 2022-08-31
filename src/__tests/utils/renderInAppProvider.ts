/**
 * Описание настройки:
 * https://testing-library.com/docs/react-testing-library/setup#custom-render
 */

import { ReactElement } from 'react'

import { RenderOptions, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AppProvider from 'app/AppProvider'

const renderInAppProvider = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => ({
  user: userEvent.setup(),
  ...render(ui, { wrapper: AppProvider, ...options }),
})

export default renderInAppProvider
