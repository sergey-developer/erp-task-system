import { TaskCommentApiTriggerEnum } from 'modules/task/constants'
import {
  CreateTaskCommentMutationArgs,
  CreateTaskCommentSuccessResponse,
  GetTaskCommentListQueryArgs,
  GetTaskCommentListSuccessResponse,
} from 'modules/task/models'
import { createTaskCommentUrl, getTaskCommentListUrl } from 'modules/task/utils'

import { HttpMethodEnum } from 'shared/constants/http'
import { baseApiService } from 'shared/services/baseApi'

import taskApiService from './taskApi.service'

const taskCommentApiService = taskApiService.injectEndpoints({
  endpoints: (build) => ({
    [TaskCommentApiTriggerEnum.CreateTaskComment]: build.mutation<
      CreateTaskCommentSuccessResponse,
      CreateTaskCommentMutationArgs
    >({
      query: ({ taskId, comment, attachments }) => {
        const formData = new FormData()
        formData.append('comment', comment)

        if (attachments?.length) {
          attachments.forEach((att) => {
            formData.append('attachments', att)
          })
        }

        return {
          url: createTaskCommentUrl(taskId),
          method: HttpMethodEnum.Post,
          data: formData,
        }
      },
      onQueryStarted: async ({ taskId }, { dispatch, queryFulfilled }) => {
        try {
          const { data: newComment } = await queryFulfilled

          dispatch(
            baseApiService.util.updateQueryData(
              TaskCommentApiTriggerEnum.GetTaskCommentList as never,
              taskId as never,
              (commentList: GetTaskCommentListSuccessResponse) => {
                commentList.unshift(newComment)
              },
            ),
          )
        } catch {}
      },
    }),
    [TaskCommentApiTriggerEnum.GetTaskCommentList]: build.query<
      GetTaskCommentListSuccessResponse,
      GetTaskCommentListQueryArgs
    >({
      query: (taskId) => ({
        url: getTaskCommentListUrl(taskId),
        method: HttpMethodEnum.Get,
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useGetTaskCommentListQuery, useCreateTaskCommentMutation } =
  taskCommentApiService
