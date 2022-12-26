import { generatePath } from 'react-router-dom'

import { MonitoringEndpointEnum } from '../constants/api'

export const getTaskMonitoringUrl = (recordId: string): string =>
  generatePath(MonitoringEndpointEnum.GetTaskMonitoring, { recordId })
