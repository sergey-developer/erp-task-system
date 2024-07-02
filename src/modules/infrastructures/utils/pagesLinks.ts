import { generatePath } from 'react-router-dom'

import { IdType } from 'shared/types/common'

import { InfrastructuresRoutesEnum } from '../constants/routes'

export const makeChangeInfrastructurePageLink = (infrastructureId: IdType): string =>
  generatePath(InfrastructuresRoutesEnum.DesktopChangeInfrastructure, {
    id: String(infrastructureId),
  })
