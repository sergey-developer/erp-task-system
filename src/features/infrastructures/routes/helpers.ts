import { RequestWithInfrastructure } from 'features/infrastructures/api/types'
import { generatePath } from 'react-router-dom'

import { InfrastructuresRoutesEnum } from './routes'

export const makeChangeInfrastructureRoute = ({
  infrastructureId,
}: RequestWithInfrastructure): string =>
  generatePath(InfrastructuresRoutesEnum.DesktopChangeInfrastructure, {
    id: String(infrastructureId),
  })
