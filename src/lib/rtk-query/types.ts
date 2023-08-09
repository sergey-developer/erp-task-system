import {
  QueryDefinition,
  MutationDefinition,
} from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import {
  TypedUseMutationResult,
  TypedUseQueryStateResult,
  TypedUseQueryHookResult,
} from '@reduxjs/toolkit/dist/query/react'
import {
  LazyQueryTrigger,
  MutationTrigger,
  UseQueryStateOptions,
} from '@reduxjs/toolkit/dist/query/react/buildHooks'

import { CustomBaseQueryFn } from 'shared/services/api'

export type CustomUseQueryHookResult<
  QueryArg,
  ResultType,
  BaseQuery extends CustomBaseQueryFn = CustomBaseQueryFn,
> = TypedUseQueryHookResult<ResultType, QueryArg, BaseQuery>

// todo: add "Use" before "Lazy"
export type CustomLazyQueryHookResult<
  QueryArg,
  ResultType,
  BaseQuery extends CustomBaseQueryFn = CustomBaseQueryFn,
  Trigger = LazyQueryTrigger<CustomQueryDefinition<QueryArg, ResultType>>,
> = [Trigger, TypedUseQueryStateResult<ResultType, QueryArg, BaseQuery>]

export type CustomQueryDefinition<
  QueryArg,
  ResultType,
  BaseQuery extends CustomBaseQueryFn = CustomBaseQueryFn,
> = QueryDefinition<QueryArg, BaseQuery, string, ResultType>

export type CustomUseQueryOptions<QueryArg, ResultType> = Pick<
  UseQueryStateOptions<CustomQueryDefinition<QueryArg, ResultType>, any>,
  'skip'
>

export type CustomMutationDefinition<
  QueryArg,
  ResultType,
  BaseQuery extends CustomBaseQueryFn = CustomBaseQueryFn,
> = MutationDefinition<QueryArg, BaseQuery, string, ResultType>

export type CustomMutationTrigger<
  QueryArg,
  ResultType,
  BaseQuery extends CustomBaseQueryFn = CustomBaseQueryFn,
> = MutationTrigger<CustomMutationDefinition<QueryArg, ResultType, BaseQuery>>

export type CustomUseMutationResult<
  QueryArg,
  ResultType,
  BaseQuery extends CustomBaseQueryFn = CustomBaseQueryFn,
> = TypedUseMutationResult<ResultType, QueryArg, BaseQuery>
