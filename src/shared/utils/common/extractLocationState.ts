import { Location } from '@remix-run/router/history'

import { CommonLocationState } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export const extractLocationState = <S>(
  location: Location<S & CommonLocationState>,
): MaybeNull<S & CommonLocationState> => location.state
