import { generatePath } from 'react-router-dom'

import { InfrastructuresRoutesEnum } from 'features/infrastructures/constants/routes'
import { InfrastructureRequestArgs } from 'features/infrastructures/types'

export const makeChangeInfrastructurePageLink = ({
  infrastructureId,
}: InfrastructureRequestArgs): string =>
  generatePath(InfrastructuresRoutesEnum.DesktopChangeInfrastructure, {
    id: String(infrastructureId),
  })
