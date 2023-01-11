import { useDispatch as useBaseDispatch } from 'react-redux'

import store from 'state/store'

export type AppDispatch = typeof store.dispatch

export const useDispatch = () => useBaseDispatch<AppDispatch>()
