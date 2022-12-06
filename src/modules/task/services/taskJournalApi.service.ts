import {
  GetTaskJournalCsvQueryArgsModel,
  GetTaskJournalCsvResponseModel,
  GetTaskJournalQueryArgsModel,
  GetTaskJournalResponseModel,
} from 'modules/task/features/TaskView/models'
import {
  getTaskJournalCsvUrl,
  getTaskJournalUrl,
} from 'modules/task/utils/apiUrls'
import { HttpMethodEnum } from 'shared/constants/http'

import taskApiService from './taskApi.service'

const taskJournalApiService = taskApiService.injectEndpoints({
  endpoints: (build) => ({
    getTaskJournal: build.query<
      GetTaskJournalResponseModel,
      GetTaskJournalQueryArgsModel
    >({
      query: (taskId) => ({
        url: getTaskJournalUrl(taskId),
        method: HttpMethodEnum.Get,
      }),
    }),
    getTaskJournalCsv: build.query<
      GetTaskJournalCsvResponseModel,
      GetTaskJournalCsvQueryArgsModel
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
