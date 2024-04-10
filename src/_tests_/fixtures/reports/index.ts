import * as amountEquipmentSpentReport from './amountEquipmentSpentReport'
import * as employeesActionsReport from './employeesActionsReport'
import * as fiscalAccumulatorTasks from './fiscalAccumulatorTasks'
import * as historyNomenclatureOperationsReport from './historyNomenclatureOperationsReport'
import * as mtsrReport from './mtsrReport'

const reportsFixtures = {
  ...mtsrReport,
  ...employeesActionsReport,
  ...amountEquipmentSpentReport,
  ...historyNomenclatureOperationsReport,
  ...fiscalAccumulatorTasks,
} as const

export default reportsFixtures
