import * as customer from './customer'
import * as customerList from './customerList'
import * as equipment from './equipment'
import * as equipmentCategory from './equipmentCategory'
import * as equipmentCategoryList from './equipmentCategoryList'
import * as equipmentList from './equipmentList'
import * as equipmentNomenclatureList from './equipmentNomenclatureList'
import * as legalEntityList from './legalEntityList'
import * as measurementUnit from './measurementUnit'
import * as measurementUnitList from './measurementUnitList'
import * as nomenclature from './nomenclature'
import * as nomenclatureGroup from './nomenclatureGroup'
import * as nomenclatureGroupList from './nomenclatureGroupList'
import * as nomenclatureList from './nomenclatureList'
import * as relocationTaskList from './relocationTaskList'
import * as warehouse from './warehouse'
import * as warehouseList from './warehouseList'
import * as workType from './workType'
import * as workTypeList from './workTypeList'

const warehouseFixtures = {
  ...warehouse,
  ...warehouseList,

  ...legalEntityList,

  ...nomenclature,
  ...nomenclatureList,

  ...nomenclatureGroup,
  ...nomenclatureGroupList,

  ...measurementUnit,
  ...measurementUnitList,

  ...customer,
  ...customerList,

  ...workType,
  ...workTypeList,

  ...equipmentCategory,
  ...equipmentCategoryList,

  ...equipment,
  ...equipmentList,

  ...equipmentNomenclatureList,

  ...relocationTaskList,
} as const

export default warehouseFixtures
