import { generatePath } from 'react-router-dom'

import { MonitoringApiEnum } from 'features/monitoring/constants'

export const getTaskMonitoringUrl = (recordId: string): string =>
  generatePath(MonitoringApiEnum.GetTaskMonitoring, { recordId })
