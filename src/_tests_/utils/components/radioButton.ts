import { ByRoleOptions } from '@testing-library/dom/types/queries'
import { within } from '@testing-library/react'

const getRadioButtonIn = (container: HTMLElement, name: ByRoleOptions['name']): HTMLInputElement =>
  within(container).getByRole('radio', { name })

const utils = {
  getRadioButtonIn,
}

export default utils
