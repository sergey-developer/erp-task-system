import { QueryDefinition } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import {
  TypedUseMutationResult,
  TypedUseQueryStateResult,
} from '@reduxjs/toolkit/dist/query/react'
import { TypedUseQueryHookResult } from '@reduxjs/toolkit/dist/query/react'
import { LazyQueryTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks'
import { MutationDefinition } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { MutationTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks'

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

export type CustomMutationDefinition<
  QueryArg,
  ResultType,
  BaseQuery extends CustomBaseQueryFn = CustomBaseQueryFn,
> = MutationDefinition<QueryArg, BaseQuery, string, ResultType>

// todo: add "Use" before "Lazy"
export type CustomLazyQueryHookResult<
  QueryArg,
  ResultType,
  BaseQuery extends CustomBaseQueryFn = CustomBaseQueryFn,
  Trigger = LazyQueryTrigger<CustomQueryDefinition<QueryArg, ResultType>>,
> = [Trigger, TypedUseQueryStateResult<ResultType, QueryArg, BaseQuery>]

export type CustomMutationTrigger<
  QueryArg,
  ResultType,
  // todo: fix error while passing BaseQuery to CustomMutationDefinition
  BaseQuery extends CustomBaseQueryFn = CustomBaseQueryFn,
> = MutationTrigger<CustomMutationDefinition<QueryArg, ResultType>>

export type CustomUseMutationResult<
  QueryArg,
  ResultType,
  BaseQuery extends CustomBaseQueryFn = CustomBaseQueryFn,
> = TypedUseMutationResult<ResultType, QueryArg, BaseQuery>
