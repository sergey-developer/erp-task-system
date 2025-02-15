import { InfrastructuresApiPathsEnum } from 'features/infrastructures/api/constants'

import { IdType } from 'shared/types/common'
import { generateApiPath } from 'shared/utils/api'

import { RequestWithInfrastructure, RequestWithInfrastructureWork } from '../types'

export const makeUpdateInfrastructureOrderFormWorkApiPath = (workId: IdType): string =>
  generateApiPath(InfrastructuresApiPathsEnum.UpdateInfrastructureOrderFormWork, {
    workId: String(workId),
  })

export const makeGetInfrastructureApiPath = ({
  infrastructureId,
}: RequestWithInfrastructure): string =>
  generateApiPath(InfrastructuresApiPathsEnum.GetInfrastructure, { id: String(infrastructureId) })

export const makeUpdateInfrastructureApiPath = ({
  infrastructureId,
}: RequestWithInfrastructure): string =>
  generateApiPath(InfrastructuresApiPathsEnum.UpdateInfrastructure, {
    id: String(infrastructureId),
  })

export const makeDeleteInfrastructureOrdersFormsWorkApiPath = ({
  infrastructureWorkId,
}: RequestWithInfrastructureWork): string =>
  generateApiPath(InfrastructuresApiPathsEnum.DeleteInfrastructureOrdersFormsWork, {
    id: String(infrastructureWorkId),
  })
