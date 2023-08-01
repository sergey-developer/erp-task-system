type ApiRequestErrorName = 'commonError' | 'notFoundError' | 'badRequestError'

export type ApiRequestMessages<T extends ApiRequestErrorName> = Record<
  T,
  string
>
