import { useDispatch as useBaseDispatch } from 'react-redux'
import { store } from 'store/store'

export type AppDispatch = typeof store.dispatch

export const useDispatch = () => useBaseDispatch<AppDispatch>()
