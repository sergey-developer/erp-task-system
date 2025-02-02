import { AttachmentsEndpointsEnum } from 'features/attachments/api/constants'
import {
  CreateAttachmentMutationArgs,
  CreateAttachmentSuccessResponse,
  DeleteAttachmentMutationArgs,
  DeleteAttachmentSuccessResponse,
} from 'features/attachments/api/dto'
import { makeDeleteAttachmentEndpoint } from 'features/attachments/api/helpers'

import { baseApi } from 'shared/api/baseApi'
import { HttpMethodEnum } from 'shared/constants/http'

const attachmentsEndpoints = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createAttachment: build.mutation<CreateAttachmentSuccessResponse, CreateAttachmentMutationArgs>(
      {
        query: ({ file, type }) => {
          const formData = new FormData()
          formData.append('file', file)
          formData.append('type', type)

          return {
            url: AttachmentsEndpointsEnum.CreateAttachment,
            method: HttpMethodEnum.Post,
            data: formData,
          }
        },
      },
    ),
    deleteAttachment: build.mutation<DeleteAttachmentSuccessResponse, DeleteAttachmentMutationArgs>(
      {
        query: ({ attachmentId }) => ({
          url: makeDeleteAttachmentEndpoint(attachmentId),
          method: HttpMethodEnum.Delete,
        }),
      },
    ),
  }),
})

export const { useCreateAttachmentMutation, useDeleteAttachmentMutation } = attachmentsEndpoints
