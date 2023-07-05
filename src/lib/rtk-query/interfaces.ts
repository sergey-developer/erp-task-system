import { TypedUseQueryHookResult } from '@reduxjs/toolkit/dist/query/react'

import { CustomBaseQueryFn } from 'shared/services/api'

export type CustomUseQueryHookResult<
  QueryArg,
  ResultType,
  BaseQuery extends CustomBaseQueryFn = CustomBaseQueryFn,
> = TypedUseQueryHookResult<ResultType, QueryArg, BaseQuery>
