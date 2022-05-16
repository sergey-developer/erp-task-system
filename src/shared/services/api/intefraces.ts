import { MaybeUndefined } from 'shared/interfaces/utils'

export type ErrorValidation<T> = {
  [key in keyof T]: string[]
}

export type Error<T> = ErrorValidation<T> & {
  detail?: string
}

export type ErrorResponse<T> = {
  data: Error<T>
  status: MaybeUndefined<number>
}
