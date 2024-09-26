import { generatePath } from 'react-router-dom'

import { InfrastructuresRoutesEnum } from 'modules/infrastructures/constants/routes'
import { InfrastructureRequestArgs } from 'modules/infrastructures/types/index'

export const makeChangeInfrastructurePageLink = ({
  infrastructureId,
}: InfrastructureRequestArgs): string =>
  generatePath(InfrastructuresRoutesEnum.DesktopChangeInfrastructure, {
    id: String(infrastructureId),
  })
