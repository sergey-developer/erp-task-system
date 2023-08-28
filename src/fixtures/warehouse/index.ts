import * as country from './country'
import * as countryList from './countryList'
import * as currency from './currency'
import * as customer from './customer'
import * as customerList from './customerList'
import * as equipment from './equipment'
import * as equipmentCategory from './equipmentCategory'
import * as equipmentList from './equipmentList'
import * as equipmentNomenclatureList from './equipmentNomenclatureList'
import * as legalEntityList from './legalEntityList'
import * as measurementUnit from './measurementUnit'
import * as measurementUnitList from './measurementUnitList'
import * as nomenclature from './nomenclature'
import * as nomenclatureGroup from './nomenclatureGroup'
import * as nomenclatureGroupList from './nomenclatureGroupList'
import * as nomenclatureList from './nomenclatureList'
import * as warehouse from './warehouse'
import * as warehouseList from './warehouseList'
import * as workType from './workType'

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

  ...country,

  ...currency,

  ...workType,

  ...countryList,

  ...equipmentCategory,

  ...equipment,
  ...equipmentList,

  ...equipmentNomenclatureList,
} as const

export default warehouseFixtures
