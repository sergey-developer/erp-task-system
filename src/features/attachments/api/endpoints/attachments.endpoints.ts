import { AttachmentsApiPathsEnum } from 'features/attachments/api/constants'
import {
  CreateAttachmentRequest,
  CreateAttachmentResponse,
  DeleteAttachmentRequest,
  DeleteAttachmentResponse,
} from 'features/attachments/api/schemas'

import { baseApi } from 'shared/api/baseApi'
import { HttpMethodEnum } from 'shared/constants/http'

const attachmentsEndpoints = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createAttachment: build.mutation<CreateAttachmentResponse, CreateAttachmentRequest>({
      query: ({ file, type }) => {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('type', type)

        return {
          url: AttachmentsApiPathsEnum.CreateAttachment,
          method: HttpMethodEnum.Post,
          data: formData,
        }
      },
    }),
    deleteAttachment: build.mutation<DeleteAttachmentResponse, DeleteAttachmentRequest>({
      query: ({ attachmentId }) => ({
        url: makeDeleteAttachmentApiPath(attachmentId),
        method: HttpMethodEnum.Delete,
      }),
    }),
  }),
})

export const { useCreateAttachmentMutation, useDeleteAttachmentMutation } = attachmentsEndpoints
