import { InfrastructuresEndpointsEnum } from 'features/infrastructures/api/constants'

import { IdType } from 'shared/types/common'
import { generateApiPath } from 'shared/utils/api'

import { InfrastructureRequestArgs, InfrastructureWorkRequestArgs } from '../../types'

export const makeUpdateInfrastructureOrderFormWorkEndpoint = (workId: IdType): string =>
  generateApiPath(InfrastructuresEndpointsEnum.UpdateInfrastructureOrderFormWork, {
    workId: String(workId),
  })

export const makeGetInfrastructureEndpoint = ({
  infrastructureId,
}: InfrastructureRequestArgs): string =>
  generateApiPath(InfrastructuresEndpointsEnum.GetInfrastructure, { id: String(infrastructureId) })

export const makeUpdateInfrastructureEndpoint = ({
  infrastructureId,
}: InfrastructureRequestArgs): string =>
  generateApiPath(InfrastructuresEndpointsEnum.UpdateInfrastructure, {
    id: String(infrastructureId),
  })

export const makeDeleteInfrastructureOrdersFormsWorkEndpoint = ({
  infrastructureWorkId,
}: InfrastructureWorkRequestArgs): string =>
  generateApiPath(InfrastructuresEndpointsEnum.DeleteInfrastructureOrdersFormsWork, {
    id: String(infrastructureWorkId),
  })
