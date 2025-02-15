import { generatePath } from 'react-router-dom'

import { MonitoringApiPathsEnum } from '../constants'

export const makeTaskMonitoringApiPath = (recordId: string): string =>
  generatePath(MonitoringApiPathsEnum.GetTaskMonitoring, { recordId })
