import { useOutletContext } from 'react-router-dom'

export type ReservesListContextType = {}

export const useReservesListContext = () => {
  return useOutletContext<ReservesListContextType>()
}
