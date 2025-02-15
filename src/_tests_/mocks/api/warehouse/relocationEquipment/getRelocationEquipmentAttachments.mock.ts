import { GetRelocationEquipmentAttachmentsResponse } from 'features/relocationEquipments/api/schemas'
import { getRelocationEquipmentAttachmentListUrl } from 'features/warehouses/helpers/relocationEquipment'

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

const getRelocationEquipmentAttachmentsMockFn = (id: IdType) =>
  getRequestMockFn(HttpMethodEnum.Get, getRelocationEquipmentAttachmentListUrl(id))

export const mockGetRelocationEquipmentAttachmentsSuccess = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<GetRelocationEquipmentAttachmentsResponse>>,
) => getSuccessMockFn(getRelocationEquipmentAttachmentsMockFn(id), options)()

export const mockGetRelocationEquipmentAttachmentsForbiddenError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getForbiddenErrorMockFn(getRelocationEquipmentAttachmentsMockFn(id), options)()

export const mockGetRelocationEquipmentAttachmentsNotFoundError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getNotFoundErrorMockFn(getRelocationEquipmentAttachmentsMockFn(id), options)()

export const mockGetRelocationEquipmentAttachmentsServerError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(getRelocationEquipmentAttachmentsMockFn(id), options)()
