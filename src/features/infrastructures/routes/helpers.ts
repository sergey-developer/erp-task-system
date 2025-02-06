import { InfrastructureRequestArgs } from 'features/infrastructures/types'
import { generatePath } from 'react-router-dom'

import { InfrastructuresRoutesEnum } from './routes'

export const makeChangeInfrastructureRoute = ({
  infrastructureId,
}: InfrastructureRequestArgs): string =>
  generatePath(InfrastructuresRoutesEnum.DesktopChangeInfrastructure, {
    id: String(infrastructureId),
  })
