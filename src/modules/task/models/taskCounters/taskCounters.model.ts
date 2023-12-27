// todo: исп-ть утилиту для типов Camelize вместе с FastFilterEnum когда она будет доступна
export type TaskCountersModel = {
  all: number
  free: number
  mine: number
  overdue: number
  firstLine: number
  secondLine: number
  less1Hour: number
  less3Hours: number
  returned: number
}

export type TaskCountersKeys = keyof TaskCountersModel
