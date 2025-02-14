import { InfrastructuresEndpointsEnum } from 'features/infrastructures/api/constants'

import { IdType } from 'shared/types/common'
import { generateApiPath } from 'shared/utils/api'

import { RequestWithInfrastructure, RequestWithInfrastructureWork } from '../types'

export const makeUpdateInfrastructureOrderFormWorkEndpoint = (workId: IdType): string =>
  generateApiPath(InfrastructuresEndpointsEnum.UpdateInfrastructureOrderFormWork, {
    workId: String(workId),
  })

export const makeGetInfrastructureEndpoint = ({
  infrastructureId,
}: RequestWithInfrastructure): string =>
  generateApiPath(InfrastructuresEndpointsEnum.GetInfrastructure, { id: String(infrastructureId) })

export const makeUpdateInfrastructureEndpoint = ({
  infrastructureId,
}: RequestWithInfrastructure): string =>
  generateApiPath(InfrastructuresEndpointsEnum.UpdateInfrastructure, {
    id: String(infrastructureId),
  })

export const makeDeleteInfrastructureOrdersFormsWorkEndpoint = ({
  infrastructureWorkId,
}: RequestWithInfrastructureWork): string =>
  generateApiPath(InfrastructuresEndpointsEnum.DeleteInfrastructureOrdersFormsWork, {
    id: String(infrastructureWorkId),
  })
