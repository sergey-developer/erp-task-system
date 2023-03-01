import {
  TypedUseSelectorHook,
  useSelector as useBaseSelector,
} from 'react-redux'

import { RootState } from 'state/store'

export const useSelector: TypedUseSelectorHook<RootState> = useBaseSelector
