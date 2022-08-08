import { createApi } from '@reduxjs/toolkit/query/react'

import baseQueryWithReauth from './baseQueryWithReauth'
import { CACHE_TIME_LIFE } from './constants'

const apiV1 = createApi({
  baseQuery: baseQueryWithReauth,
  keepUnusedDataFor: CACHE_TIME_LIFE,
  endpoints: () => ({}),
})

/**
 * todo: Внимательно следить за обновлениями RTK query и поправить при первой возможности
 *
 * 1. RTK query не умеет правильно доставать ReturnType из сгенерированного useQuery хука
 * хак, который исправляет проблему взят отсюда https://github.com/reduxjs/redux-toolkit/issues/1363
 * открытый issue по проблеме https://github.com/reduxjs/redux-toolkit/issues/1937
 * пулл реквест за которым нужно следить https://github.com/reduxjs/redux-toolkit/pull/2276
 *
 * 2. пулл реквест залит но вывод типов через ReturnType<typeof useMyQuery> не исправлен
 * возвращаемые тип из кастомного хука, пока не нужно самостоятельно определять т.к.
 * автоопределение типов пока достаточно (см. уже написанные кастомные хуки)
 */

export default apiV1
