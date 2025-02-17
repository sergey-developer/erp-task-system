import { TypedUseSelectorHook, useSelector as useBaseSelector } from 'react-redux'
import { RootState } from 'store/store'

export const useSelector: TypedUseSelectorHook<RootState> = useBaseSelector
