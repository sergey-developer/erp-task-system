import { generatePath } from 'react-router-dom'

import { MonitoringEndpointEnum } from 'modules/monitoring/constants/api'

export const getTaskMonitoringUrl = (recordId: string): string =>
  generatePath(MonitoringEndpointEnum.GetTaskMonitoring, { recordId })
