import { makeGetEquipmentAttachmentsApiPath } from 'features/equipments/api/helpers'
import { GetEquipmentAttachmentsResponse } from 'features/equipments/api/schemas'

import { ErrorData } from 'shared/api/baseApi'
import { HttpMethodEnum } from 'shared/constants/http'
import { IdType } from 'shared/types/common'

import {
  getForbiddenErrorMockFn,
  getNotFoundErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getEquipmentAttachmentsMockFn = (id: IdType) =>
  getRequestMockFn(HttpMethodEnum.Get, makeGetEquipmentAttachmentsApiPath(id))

export const mockGetEquipmentAttachmentsSuccess = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<GetEquipmentAttachmentsResponse>>,
) => getSuccessMockFn(getEquipmentAttachmentsMockFn(id), options)()

export const mockGetEquipmentAttachmentsForbiddenError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getForbiddenErrorMockFn(getEquipmentAttachmentsMockFn(id), options)()

export const mockGetEquipmentAttachmentsNotFoundError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getNotFoundErrorMockFn(getEquipmentAttachmentsMockFn(id), options)()

export const mockGetEquipmentAttachmentsServerError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(getEquipmentAttachmentsMockFn(id), options)()
