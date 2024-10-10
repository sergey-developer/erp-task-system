import { InfrastructuresApiEnum } from 'modules/infrastructures/constants'
import {
  InfrastructureRequestArgs,
  InfrastructureWorkRequestArgs,
} from 'modules/infrastructures/types'

import { generateApiPath } from 'shared/utils/api'

export const makeGetInfrastructureUrl = ({ infrastructureId }: InfrastructureRequestArgs): string =>
  generateApiPath(InfrastructuresApiEnum.GetInfrastructure, { id: String(infrastructureId) })

export const makeUpdateInfrastructureUrl = ({
  infrastructureId,
}: InfrastructureRequestArgs): string =>
  generateApiPath(InfrastructuresApiEnum.UpdateInfrastructure, { id: String(infrastructureId) })

export const makeDeleteInfrastructureOrdersFormsWorkUrl = ({
  infrastructureWorkId,
}: InfrastructureWorkRequestArgs): string =>
  generateApiPath(InfrastructuresApiEnum.DeleteInfrastructureOrdersFormsWork, {
    id: String(infrastructureWorkId),
  })
