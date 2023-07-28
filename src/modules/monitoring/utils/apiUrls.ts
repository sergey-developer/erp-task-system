import { generatePath } from 'react-router-dom'

import { MonitoringApiEnum } from 'modules/monitoring/constants/api'

export const getTaskMonitoringUrl = (recordId: string): string =>
  generatePath(MonitoringApiEnum.GetTaskMonitoring, { recordId })
