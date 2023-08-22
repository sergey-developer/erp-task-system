import { ByRoleOptions } from '@testing-library/dom/types/queries'
import { within } from '@testing-library/react'

export const getCheckboxIn = (
  container: HTMLElement,
  name?: ByRoleOptions['name'],
): HTMLInputElement => within(container).getByRole('checkbox', { name })
