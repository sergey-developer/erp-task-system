import * as employeesActionsReport from './employeesActionsReport'
import * as historyNomenclatureOperationsReport from './historyNomenclatureOperationsReport'

const reportsFixtures = {
  ...employeesActionsReport,
  ...historyNomenclatureOperationsReport,
} as const

export default reportsFixtures
