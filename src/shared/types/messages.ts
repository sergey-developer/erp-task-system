type ApiRequestErrorName = 'commonError' | 'notFoundError' | 'badRequestError' | 'unknownError'

export type ApiRequestMessages<T extends ApiRequestErrorName> = Record<
  T,
  string
>
