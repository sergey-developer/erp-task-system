import { Location } from '@remix-run/router/history'

import { CommonLocationState } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type ExtractLocationStateResult<S> = MaybeNull<S & CommonLocationState>

export const extractLocationState = <S>(
  location: Location<S & CommonLocationState>,
): ExtractLocationStateResult<S> => location.state
