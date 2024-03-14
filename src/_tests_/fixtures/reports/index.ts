import * as amountEquipmentSpentReport from './amountEquipmentSpentReport'
import * as employeesActionsReport from './employeesActionsReport'
import * as fiscalAccumulatorTasks from './fiscalAccumulatorTasks'
import * as historyNomenclatureOperationsReport from './historyNomenclatureOperationsReport'

const reportsFixtures = {
  ...employeesActionsReport,
  ...amountEquipmentSpentReport,
  ...historyNomenclatureOperationsReport,
  ...fiscalAccumulatorTasks,
} as const

export default reportsFixtures
