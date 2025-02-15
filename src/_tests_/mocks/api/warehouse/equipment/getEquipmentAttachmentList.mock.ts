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

const getEquipmentAttachmentListMockFn = (id: IdType) =>
  getRequestMockFn(HttpMethodEnum.Get, makeGetEquipmentAttachmentsApiPath(id))

export const mockGetEquipmentAttachmentListSuccess = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<GetEquipmentAttachmentsResponse>>,
) => getSuccessMockFn(getEquipmentAttachmentListMockFn(id), options)()

export const mockGetEquipmentAttachmentListForbiddenError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getForbiddenErrorMockFn(getEquipmentAttachmentListMockFn(id), options)()

export const mockGetEquipmentAttachmentListNotFoundError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getNotFoundErrorMockFn(getEquipmentAttachmentListMockFn(id), options)()

export const mockGetEquipmentAttachmentListServerError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(getEquipmentAttachmentListMockFn(id), options)()
