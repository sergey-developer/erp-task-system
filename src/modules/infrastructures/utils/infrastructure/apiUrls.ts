import { InfrastructuresApiEnum } from 'modules/infrastructures/constants/index'
import { InfrastructureRequestArgs } from 'modules/infrastructures/types/index'

import { generateApiPath } from 'shared/utils/api'

export const makeGetInfrastructureUrl = ({ infrastructureId }: InfrastructureRequestArgs): string =>
  generateApiPath(InfrastructuresApiEnum.GetInfrastructure, { id: String(infrastructureId) })

export const makeUpdateInfrastructureUrl = ({
  infrastructureId,
}: InfrastructureRequestArgs): string =>
  generateApiPath(InfrastructuresApiEnum.UpdateInfrastructure, { id: String(infrastructureId) })
