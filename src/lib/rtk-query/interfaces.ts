import { QueryDefinition } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { TypedUseQueryHookResult } from '@reduxjs/toolkit/dist/query/react'
import { TypedUseQueryStateResult } from '@reduxjs/toolkit/dist/query/react'
import { LazyQueryTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks'

import { CustomBaseQueryFn } from 'shared/services/api'

export type CustomUseQueryHookResult<
  QueryArg,
  ResultType,
  BaseQuery extends CustomBaseQueryFn = CustomBaseQueryFn,
> = TypedUseQueryHookResult<ResultType, QueryArg, BaseQuery>

export type CustomQueryDefinition<
  QueryArg,
  ResultType,
  BaseQuery extends CustomBaseQueryFn = CustomBaseQueryFn,
> = QueryDefinition<QueryArg, BaseQuery, string, ResultType>

export type CustomLazyQueryHookResult<
  QueryArg,
  ResultType,
  BaseQuery extends CustomBaseQueryFn = CustomBaseQueryFn,
  Trigger = LazyQueryTrigger<CustomQueryDefinition<QueryArg, ResultType>>,
> = [Trigger, TypedUseQueryStateResult<ResultType, QueryArg, BaseQuery>]
