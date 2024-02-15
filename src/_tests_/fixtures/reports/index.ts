import * as amountEquipmentSpentReport from './amountEquipmentSpentReport'
import * as employeesActionsReport from './employeesActionsReport'
import * as historyNomenclatureOperationsReport from './historyNomenclatureOperationsReport'

const reportsFixtures = {
  ...employeesActionsReport,
  ...amountEquipmentSpentReport,
  ...historyNomenclatureOperationsReport,
} as const

export default reportsFixtures
