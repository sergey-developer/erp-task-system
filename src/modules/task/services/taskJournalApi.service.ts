import {
  GetTaskJournalCsvQueryArgs,
  GetTaskJournalCsvSuccessResponse,
  GetTaskJournalQueryArgs,
  GetTaskJournalSuccessResponse,
} from 'modules/task/models'
import {
  getTaskJournalCsvUrl,
  getTaskJournalUrl,
} from 'modules/task/utils/apiUrls'
import { HttpMethodEnum } from 'shared/constants/http'

import taskApiService from './taskApi.service'

const taskJournalApiService = taskApiService.injectEndpoints({
  endpoints: (build) => ({
    getTaskJournal: build.query<
      GetTaskJournalSuccessResponse,
      GetTaskJournalQueryArgs
    >({
      query: (taskId) => ({
        url: getTaskJournalUrl(taskId),
        method: HttpMethodEnum.Get,
      }),
    }),
    getTaskJournalCsv: build.query<
      GetTaskJournalCsvSuccessResponse,
      GetTaskJournalCsvQueryArgs
    >({
      query: (taskId) => ({
        url: getTaskJournalCsvUrl(taskId),
        method: HttpMethodEnum.Get,
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useGetTaskJournalQuery, useLazyGetTaskJournalCsvQuery } =
  taskJournalApiService
