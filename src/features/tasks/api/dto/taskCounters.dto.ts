export type TaskCountersDTO = {
  allLines: number
  allInLine: number
  free: number
  mine: number
  overdue: number
  firstLine: number
  secondLine: number
  less1Hour: number
  less3Hours: number
  returned: number
  reclassificationDenied: number
}

export type TaskCountersDTOKeys = keyof TaskCountersDTO
