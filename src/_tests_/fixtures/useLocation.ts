import { Location } from '@remix-run/router/history'

import { fakeWord } from '../helpers'

export const fakeUseLocationResult = (props?: Pick<Partial<Location>, 'state'>): Location => ({
  state: props?.state || null,

  key: fakeWord(),
  hash: fakeWord(),
  pathname: fakeWord(),
  search: fakeWord(),
})
