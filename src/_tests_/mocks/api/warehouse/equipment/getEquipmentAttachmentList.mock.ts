import { GetEquipmentAttachmentListSuccessResponse } from 'features/warehouse/models'
import { getEquipmentAttachmentListUrl } from 'features/warehouse/utils/equipment'

import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/api/services/baseApi'
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
  getRequestMockFn(HttpMethodEnum.Get, getEquipmentAttachmentListUrl(id))

export const mockGetEquipmentAttachmentListSuccess = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<GetEquipmentAttachmentListSuccessResponse>>,
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
