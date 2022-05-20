import {
  TypedUseSelectorHook,
  useSelector as useBaseSelector,
} from 'react-redux'

import { RootState } from 'state/store'

const useSelector: TypedUseSelectorHook<RootState> = useBaseSelector

export default useSelector
