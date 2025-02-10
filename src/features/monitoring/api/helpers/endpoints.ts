import { generatePath } from 'react-router-dom'

import { MonitoringEndpointsEnum } from '../constants'

export const makeTaskMonitoringEndpoint = (recordId: string): string =>
  generatePath(MonitoringEndpointsEnum.GetTaskMonitoring, { recordId })
