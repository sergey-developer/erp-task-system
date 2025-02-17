import * as equipmentCategories from './equipmentCategories'
import * as equipmentCategory from './equipmentCategory'
import * as equipmentDetail from './equipmentDetail'
import * as equipmentNomenclatures from './equipmentNomenclatures'
import * as equipmentRelocationHistory from './equipmentRelocationHistory'
import * as equipmentRelocationHistoryAttachment from './equipmentRelocationHistoryAttachment'
import * as equipments from './equipments'
import * as equipmentsCatalog from './equipmentsCatalog'
import * as importedEquipmentsByFile from './importedEquipmentsByFile'

const equipmentsFixtures = {
  ...equipmentDetail,
  ...equipments,
  ...importedEquipmentsByFile,
  ...equipmentRelocationHistory,
  ...equipmentRelocationHistoryAttachment,
  ...equipmentCategory,
  ...equipmentCategories,
  ...equipmentNomenclatures,
  ...equipmentsCatalog,
} as const

export default equipmentsFixtures
