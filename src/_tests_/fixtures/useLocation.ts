import { Location } from '@remix-run/router/history'

import { fakeWord } from '../utils'

export const useLocationResult = (props?: Pick<Partial<Location>, 'state'>): Location => ({
  state: props?.state || null,

  key: fakeWord(),
  hash: fakeWord(),
  pathname: fakeWord(),
  search: fakeWord(),
})
