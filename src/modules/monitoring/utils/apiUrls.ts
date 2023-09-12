import { generatePath } from 'react-router-dom'

import { MonitoringApiEnum } from 'modules/monitoring/services/monitoringApiService'

export const getTaskMonitoringUrl = (recordId: string): string =>
  generatePath(MonitoringApiEnum.GetTaskMonitoring, { recordId })
