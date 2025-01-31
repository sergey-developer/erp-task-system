import { AttachmentApiEnum } from 'features/attachment/constants'
import {
  CreateAttachmentMutationArgs,
  CreateAttachmentSuccessResponse,
  DeleteAttachmentMutationArgs,
  DeleteAttachmentSuccessResponse,
} from 'features/attachment/models'
import { deleteAttachmentUrl } from 'features/attachment/utils'

import { HttpMethodEnum } from 'shared/constants/http'
import { baseApi } from 'shared/api/baseApi'

const attachmentApiService = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createAttachment: build.mutation<CreateAttachmentSuccessResponse, CreateAttachmentMutationArgs>(
      {
        query: ({ file, type }) => {
          const formData = new FormData()
          formData.append('file', file)
          formData.append('type', type)

          return {
            url: AttachmentApiEnum.CreateAttachment,
            method: HttpMethodEnum.Post,
            data: formData,
          }
        },
      },
    ),
    deleteAttachment: build.mutation<DeleteAttachmentSuccessResponse, DeleteAttachmentMutationArgs>(
      {
        query: ({ attachmentId }) => ({
          url: deleteAttachmentUrl(attachmentId),
          method: HttpMethodEnum.Delete,
        }),
      },
    ),
  }),
})

export const { useCreateAttachmentMutation, useDeleteAttachmentMutation } = attachmentApiService
